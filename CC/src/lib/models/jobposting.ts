import { jobTypes, workArrangement } from '@/app/constants';
import mongoose, { Schema } from 'mongoose';

const JobPostingSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    companyFunding: {
      type: String,
    },
    companyIndustry: {
      type: String,
      required: true,
    },
    companyLinkedin: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetCompensation: {
      type: Number,
      required: true,
    },
    equity: {
      offered: {
        type: Boolean,
        required: true,
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
    equityHigh: {
      offered: {
        type: Boolean,
        required: true,
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
    bonus: {
      offered: {
        type: Boolean,
        required: true,
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
    },
    jobType: {
      type: String,
      enum: jobTypes,
      required: true,
    },
    workArrangement: {
      type: String,
      enum: workArrangement,
      required: true,
    },
    geoUrn: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^\["\d+"\]$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid geoUrn format! It should be a string in the format ["digits"].`,
      },
    },
    pastCompanies: { type: Array, default: [] },
    key1: {
      type: String,
      required: true,
    },
    key2: {
      type: String,
      required: true,
    },
    key3: {
      type: String,
      required: true,
    },
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referral',
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ['contacted', 'interviewing', 'successful', 'inactive'],
      default: 'contacted',
    },
    hiringManager: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientReferral',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const JobPosting =
  mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);

export default JobPosting;
