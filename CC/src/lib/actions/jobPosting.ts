// /app/api/jobposting/[jobId]/route.js
'use server';
import JobPosting from '@/lib/models/jobposting';
import connectToDB from '@/lib/mongodb/mongoose';
import User from '../models/user';
import { ActivityType } from '../types';
import { createActivityLog } from './activityLog';

interface IParams {
  jobId: string;
}

export const getJobPosting = async (params: IParams) => {
  try {
    await connectToDB();
    const { jobId } = params;
    if (!jobId) {
      throw new Error('Job Id not found');
    }
    const job = await JobPosting.findById(jobId).populate({
      path: 'createdBy',
      model: User,
    });

    if (!job) {
      throw new Error('Job not found');
    }

    return JSON.parse(JSON.stringify(job));
  } catch (error) {
    console.error('Error fetching job details:', error);
  }
};

export const getJobPostings = async () => {
  try {
    await connectToDB();
    const jobPostings = await JobPosting.find({
      status: { $nin: ['inactive', 'successful'] },
    }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(jobPostings));
  } catch (error) {
    console.error('Error fetching job details:', error);
  }
};

export const updateJobPosting = async (
  jobPostingId: string,
  newStatus: string
) => {
  try {
    await connectToDB();
    const updatedJobPosting = await JobPosting.findByIdAndUpdate(
      jobPostingId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedJobPosting) {
      throw new Error(`Job posting with ID ${jobPostingId} not found`);
    }
    await createActivityLog(
      ActivityType.JOB_POSTING_STATUS_CHANGED,
      `Job posting '${updatedJobPosting.title}' status updated to '${newStatus}'`
    );

    return JSON.parse(JSON.stringify(updatedJobPosting));
  } catch (error) {
    console.error('Error updating job details:', error);
    throw error;
  }
};
