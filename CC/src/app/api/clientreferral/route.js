import { NextResponse } from 'next/server';
import ClientReferral from '@/lib/models/clientreferral';
import User from '@/lib/models/user';
import connectToDB from '@/lib/mongodb/mongoose';
import { ActivityType } from '@/lib/types';
import client from '@sendgrid/mail';
import { createActivityLog } from '@/lib/actions/activityLog';

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

    const { firstName, lastName, company, email, introducedBy, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !introducedBy) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Connect to the MongoDB database
    await connectToDB();

    // Create a new client referral
    const newClientReferral = await ClientReferral.create({
      firstName,
      lastName,
      company,
      email,
      introducedBy,
    }).catch(e => {
      console.error('Error creating client referral:', e);
      return null;
    });

    if (!newClientReferral) {
      return NextResponse.json({ message: 'Failed to create client referral' }, { status: 500 });
    }

    // Update user by adding new client referral in user clientReferrals
    const user = await User.findByIdAndUpdate(introducedBy, {
      $push: { clientReferrals: newClientReferral._id },
    }).catch(e => {
      console.error('Error updating user:', e);
      return null;
    });

    if (!user) {
      return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }

    // Create activity log
    await createActivityLog(
      ActivityType.CLIENT_INTRODUCTION,
      `${user.firstName} ${user.lastName} introduced a new client referral.`
    ).catch(e => console.error('Error creating activity log:', e));

    // Prepare email
    const msg = {
      to: email,
      cc: user.email,
      bcc: process.env.SENDER_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: 'Introducing Coder Collective',
      html: `<p>${message}</p>`,
    };

    // Send email
    try {
      await client.send(msg);
    } catch (sendgridError) {
      console.error('SendGrid Error:', sendgridError.response?.body || sendgridError);
      // Optionally, you could return a partial success here
      return NextResponse.json({ 
        message: 'Client referral created but email failed to send',
        error: sendgridError.response?.body?.errors || sendgridError.message
      }, { status: 207 });  // 207 Multi-Status
    }

    return NextResponse.json({
      message: 'Client Referral created successfully',
      status: 201,
    });
  } catch (error) {
    console.error('Unexpected error in POST /api/clientreferral:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}