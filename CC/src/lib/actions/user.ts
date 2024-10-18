//src/lib/actions/user.ts
'use server';
import ClientReferral from '../../lib/models/clientreferral';
import Referral from '../../lib/models/referral';
import User from '../../lib/models/user';
import connectToDB from '../../lib/mongodb/mongoose';
import { ActivityType } from '../types';
import { createActivityLog } from './activityLog';

export const createOrUpdateUser = async (
  id: any,
  first_name: any,
  last_name: any,
  image_url: any,
  email_addresses: { email_address: any }[],
  isUserUpdated: boolean
) => {
  try {
    await connectToDB();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true }
    );

    await user.save();
    if (!isUserUpdated) {
      await createActivityLog(
        ActivityType.NEW_USER_CREATED,
        `User ${first_name} ${last_name} was created.`
      );
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: any) => {
  try {
    await connectToDB();
    const deletedUser = await User.findOneAndDelete({ clerkId: id });
    if (deletedUser) {
      await createActivityLog(
        ActivityType.NEW_USER_CREATED,
        `User ${deletedUser.firstName} ${deletedUser.lastName} was deleted.`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find({})
      .populate({
        path: 'referrals',
        model: Referral,
        select: '_id firstName lastName email createdAt status',
      })
      .populate({
        path: 'clientReferrals',
        model: ClientReferral,
        select: '_id firstName lastName status email company createdAt',
      })
      .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async ({
  id,
  clerkId,
}: {
  id?: string;
  clerkId?: string;
}) => {
  try {
    await connectToDB();
    const query = clerkId ? { clerkId } : id ? { _id: id } : {};
    const user = await User.findOne(query)
      .populate({
        path: 'referrals',
        model: Referral,
        select: '_id firstName lastName email createdAt status updatedAt',
      })
      .populate({
        path: 'clientReferrals',
        model: ClientReferral,
        select:
          '_id firstName lastName email company createdAt status updatedAt',
      });
    if (!user) {
      throw new Error('User not found');
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};
