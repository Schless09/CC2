import mongoose, { Schema } from 'mongoose';

const ReferralSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    linkedinURL: {
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
    resumeUrl: {
      type: String,
      required: false,
    },
    jobPosting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting',
    },
    introducedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    status: {
      type: String,
      enum: [
        'Contacted',
        'Active',
        'Interviewing',
        'Hired',
        'Referral Paid Out',
        'Inactive',
      ],
      default: 'Contacted',
    },
  },
  { timestamps: true }
);

const Referral =
  mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);

export default Referral;
