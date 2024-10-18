import mongoose, { Schema } from 'mongoose';

const ClientReferralSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String, required: false },
    status: {
      type: String,
      enum: [
        'Contacted',
        'Engaged',
        'Interviewing CoA Candidates',
        'Hired CoA Candidate',
        'Referral Paid Out',
        'Search Closed - Unsuccessful',
      ],
      default: 'Contacted',
    },

    introducedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fileUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ClientReferral =
  mongoose.models.ClientReferral ||
  mongoose.model('ClientReferral', ClientReferralSchema);

export default ClientReferral;
