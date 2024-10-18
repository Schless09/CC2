import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    jobPostings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        default: [],
      },
    ],
    clientReferrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientReferral',
        default: [],
      },
    ],
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referral',
        default: [],
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
