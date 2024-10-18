// api/referral/route.js

import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb/mongoose';
import Referral from '@/lib/models/referral';
import User from '@/lib/models/user';
import client from '@sendgrid/mail';
import { createActivityLog } from '@/lib/actions/activityLog';
import { ActivityType } from '@/lib/types';

client.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json().catch(e => {
      console.error('Error parsing request body:', e);
      return null;
    });

    if (!body) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const { firstName, lastName, linkedinURL, email, introducedBy, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !introducedBy) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectToDB();

    const newReferral = await Referral.create({
      linkedinURL,
      firstName,
      lastName,
      email,
      introducedBy,
    }).catch(e => {
      console.error('Error creating referral:', e);
      return null;
    });

    if (!newReferral) {
      return NextResponse.json({ message: 'Failed to create referral' }, { status: 500 });
    }

    const user = await User.findByIdAndUpdate(introducedBy, {
      $push: { referrals: newReferral._id },
    }).catch(e => {
      console.error('Error updating user:', e);
      return null;
    });

    if (!user) {
      return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }

    await createActivityLog(
      ActivityType.NEW_REFERRAL,
      `${user.firstName} ${user.lastName} introduced a new referral.`
    ).catch(e => console.error('Error creating activity log:', e));

    const msg = {
      to: email,
      cc: user.email,
      bcc: process.env.SENDER_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: 'Introducing Coder Collective',
      html: `<p>${message}</p>`,
    };

    try {
      await client.send(msg);
    } catch (sendgridError) {
      console.error('SendGrid Error:', sendgridError.response?.body || sendgridError);
      // Optionally, you could return a partial success here
      return NextResponse.json({ 
        message: 'Referral created but email failed to send',
        error: sendgridError.response?.body?.errors || sendgridError.message
      }, { status: 207 });  // 207 Multi-Status
    }

    return NextResponse.json({
      message: 'Referral Created',
      status: 201,
    });
  } catch (error) {
    console.error('Unexpected error in POST /api/referral:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const referrals = await Referral.find().exec();
    return NextResponse.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}