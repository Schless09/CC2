//src/lib/actions/user.ts
'use server';
import mongoose from 'mongoose';
import Referral from '../../lib/models/referral';
import connectToDB from '../../lib/mongodb/mongoose';
import User from '../models/user';
import { ActivityType, UpdateReferralProps } from '../types';
import { createActivityLog } from './activityLog';
import { getUser } from './user';

export const updateReferral = async ({
  referralId,
  email,
  data,
  isUpdated,
}: UpdateReferralProps) => {
  try {
    await connectToDB();
    const filter = referralId ? { _id: referralId } : { email };
    const referral = await Referral.findOneAndUpdate(
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
        ActivityType.REFERRAL_UPDATED,
        `Referral for ${referral.firstName} ${referral.lastName} has been updated.`
      );
    } else {
      await createActivityLog(
        ActivityType.REFERRAL_STATUS_CHANGED,
        `${referral.firstName} ${referral.lastName} status changed to '${referral.status}'.`
      );
    }
    return JSON.parse(JSON.stringify(referral));
  } catch (error) {
    console.error(error);
  }
};

export const createReferral = async (data: any) => {
  try {
    const { introducedBy, ...referralData } = data;
    const introducedById = new mongoose.Types.ObjectId(data.introducedBy);
    const referral = await Referral.create({
      ...referralData,
      introducedBy: introducedById,
    });
    await User.findByIdAndUpdate(introducedById, {
      $push: { referrals: referral._id },
    });
    const populatedReferral = await Referral.findById(referral._id).populate({
      path: 'introducedBy',
      model: User,
      select: '_id firstName lastName email',
    });
    await createActivityLog(
      ActivityType.NEW_REFERRAL,
      `${populatedReferral.introducedBy.firstName} ${populatedReferral.introducedBy.lastName} introduced a new referral.`
    );
    return JSON.parse(JSON.stringify(populatedReferral));
  } catch (error) {
    console.error(error);
  }
};

export const getReferral = async (id: string) => {
  try {
    await connectToDB();
    const referral = await Referral.findById(id);
    if (!referral) {
      throw new Error('Referral not found');
    }
    return JSON.parse(JSON.stringify(referral));
  } catch (error) {
    console.error(error);
  }
};

export const checkReferralExists = async (
  email?: string,
  introducedBy?: string
) => {
  try {
    await connectToDB();
    const referral = await Referral.findOne({ email, introducedBy }).populate({
      path: 'introducedBy',
      model: User,
      select: '_id firstName lastName email',
    });
    if (!referral) {
      return null;
    }
    return JSON.parse(JSON.stringify(referral));
  } catch (error) {
    console.error(error);
  }
};

export const getReferrals = async (userId: string) => {
  try {
    await connectToDB();
    const user = await getUser({ id: userId });
    const referrals = await Referral.find({
      introducedBy: user._id,
      status: { $nin: ['Inactive'] },
    }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(referrals));
  } catch (error) {
    console.error(error);
  }
};
