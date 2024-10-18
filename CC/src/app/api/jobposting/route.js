import { createActivityLog } from '@/lib/actions/activityLog';
import JobPosting from '@/lib/models/jobposting';
import connectToDB from '@/lib/mongodb/mongoose';
import { ActivityType } from '@/lib/types';
import { NextResponse } from 'next/server';

import User from '@/lib/models/user';

// Handler for POST request to create a new job posting
export async function POST(request) {
  try {
    // Extract data from the request body
    const jobData = await request.json();
    // Connect to the MongoDB database
    await connectToDB();

    // Create a new JobPosting document with the provided data
    const newJobPosting = await JobPosting.create(jobData);

    // Update user by adding new job in user jobPostings
    if (newJobPosting) {
      const userId = jobData.createdBy;
      await User.findByIdAndUpdate(userId, {
        $push: { jobPostings: newJobPosting._id },
      });
      await createActivityLog(
        ActivityType.NEW_JOB_OPENING,
        `New job posting '${newJobPosting.title}' created.`
      );
    }

    // Send a success response with a 201 status code and the newly created job posting
    return NextResponse.json(
      { message: 'Job Posting Created', newJobPosting },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and send an error response with a 500 status code
    console.error('Error creating job posting:', error);
    return NextResponse('ERROR IN CREATING JOB POST ' + error, { status: 500 });
  }
}
