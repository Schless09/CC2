'use server';

import ActivityLog from '../models/activityLog';
import { ActivityType } from '../types';

export const createActivityLog = async (
  type: ActivityType,
  details: string
) => {
  try {
    const activityLog = await ActivityLog.create({ type, details });
    return JSON.parse(JSON.stringify(activityLog));
  } catch (error) {
    console.error(error);
  }
};

export const getActivityLogs = async () => {
  try {
    const activityLogs = await ActivityLog.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(activityLogs));
  } catch (error) {
    console.error(error);
  }
};
