import connectToDB from '@/lib/mongodb/mongoose';
import CandidateScorecard from '@/lib/models/scorecard'; 
import { NextResponse } from 'next/server';

// Handler for POST request to create a new candidate scorecard
export async function POST(request) {
  try {
    // Extract data from the request body
    const scorecardData = await request.json();

    // Connect to the MongoDB database
    await connectToDB();

    // Create a new CandidateScorecard document with the provided data
    const newScorecard = await CandidateScorecard.create(scorecardData);

    // Send a success response with a 201 status code and the newly created scorecard
    return NextResponse.json(
      { message: 'Scorecard Created', newScorecard },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and send an error response with a 500 status code
    console.error('Error creating scorecard:', error);
    return NextResponse('ERROR IN CREATING SCORECARD: ' + error, { status: 500 });
  }
}
