'use server';

import ClientReferral from '@/lib/models/clientreferral';
import User from '@/lib/models/user';
import connectToDB from '@/lib/mongodb/mongoose';
import mongoose from 'mongoose';
import { ActivityType, UpdateReferralProps } from '../types';
import { createActivityLog } from './activityLog';
import { getUser } from './user';

export const updateClientReferral = async ({
  referralId,
  email,
  data,
  isUpdated,
}: UpdateReferralProps) => {
  try {
    await connectToDB();
    const filter = referralId ? { _id: referralId } : { email };
    const clientReferral = await ClientReferral.findOneAndUpdate(
      filter,
      { $set: data },
      { upsert: true, new: true }
    ).populate({
      path: 'introducedBy',
      model: User,
      select: '_id firstName lastName email',
    });
    if (isUpdated) {
      await createActivityLog(
        ActivityType.CLIENT_REFERRAL_UPDATED,
        `${clientReferral.firstName} ${clientReferral.lastName} has been updated.`
      );
    } else {
      await createActivityLog(
        ActivityType.CLIENT_REFERRAL_STATUS_CHANGED,
        `${clientReferral.firstName} ${clientReferral.lastName} status changed to '${clientReferral.status}'.`
      );
    }
    return JSON.parse(JSON.stringify(clientReferral));
  } catch (error) {
    console.error(error);
  }
};

export const createClientReferral = async (data: any) => {
  try {
    const { introducedBy, ...clientReferralData } = data;
    const introducedById = new mongoose.Types.ObjectId(data.introducedBy);
    const clientReferral = await ClientReferral.create({
      ...clientReferralData,
      introducedBy: introducedById,
    });
    await User.findByIdAndUpdate(introducedById, {
      $push: { clientReferrals: clientReferral._id },
    });
    const populatedClientReferral = await ClientReferral.findById(
      clientReferral._id
    ).populate({
      path: 'introducedBy',
      model: User,
      select: '_id firstName lastName email',
    });
    await createActivityLog(
      ActivityType.CLIENT_INTRODUCTION,
      `${populatedClientReferral.introducedBy.firstName} ${populatedClientReferral.introducedBy.lastName} introduced a new client referral.`
    );
    return JSON.parse(JSON.stringify(populatedClientReferral));
  } catch (error) {
    console.error(error);
  }
};

export const checkClientReferralExists = async (
  email?: string,
  introducedBy?: string
) => {
  try {
    await connectToDB();
    const clientReferral = await ClientReferral.findOne({
      email,
      introducedBy,
    });
    if (!clientReferral) {
      return null;
    }
    return JSON.parse(JSON.stringify(clientReferral));
  } catch (error) {
    console.error(error);
  }
};

export const getClientReferrals = async (userId: string) => {
  try {
    await connectToDB();
    const user = await getUser({ id: userId });
    const clientReferrals = await ClientReferral.find({
      introducedBy: user._id,
    }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(clientReferrals));
  } catch (error) {
    console.error(error);
  }
};
