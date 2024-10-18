import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { NextResponse } from 'next/server';

// Handler for POST request to process Clerk webhooks
export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers from the request
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Error occurred -- no svix headers' },
      {
        status: 400,
      }
    );
  }

  // Get the JSON body from the request
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json(
      { error: 'Error occurred' },
      {
        status: 400,
      }
    );
  }

  // Handle the event based on its type
  const eventType = evt?.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses } = evt?.data;

    try {
      // Create or update the user in your application using the provided data
      await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        eventType === 'user.updated'
      );

      return NextResponse.json(
        { message: 'User is created or updated' },
        {
          status: 200,
        }
      );
    } catch (err) {
      console.error('Error creating or updating user:', err);
      return NextResponse.json(
        { error: 'Error occurred' },
        {
          status: 500,
        }
      );
    }
  }

  if (eventType === 'user.deleted') {
    try {
      const { id } = evt?.data;
      // Delete the user in your application based on the provided user ID
      await deleteUser(id);

      return NextResponse.json(
        { message: 'User is deleted' },
        {
          status: 200,
        }
      );
    } catch (err) {
      console.error('Error deleting user:', err);
      return NextResponse.json(
        { error: 'Error occurred' },
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.json(
    { message: 'Event received but not handled' },
    {
      status: 200,
    }
  );
}
