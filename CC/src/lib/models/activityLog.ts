import mongoose, { Schema } from 'mongoose';

const ActivityLogoSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'New User Created',
        'User Deleted',
        'Referral Status Changed',
        'Client Referral Status Changed',
        'New Job Opening',
        'New Referral',
        'Client Introduction',
        'Job Posting Status Changed',
        'Referral Updated',
        'Client Referral Updated',
      ],
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model('ActivityLog', ActivityLogoSchema);

export default ActivityLog;
