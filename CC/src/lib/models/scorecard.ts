import mongoose from 'mongoose';

const scorecardSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  submittedBy: { type: String, required: true },
  sections: [
    {
      title: String,
      description: String,
      rating: Number,
      notes: String,
    },
  ],
  decision: { type: String, enum: ['Hire', 'Advance to Next Round', 'Reject', 'Hold'], required: true },
  additionalFeedback: String,
  overallNotes: String,
}, { timestamps: true });

const CandidateScorecard = mongoose.models.CandidateScorecard || mongoose.model('CandidateScorecard', scorecardSchema);

export default CandidateScorecard;
