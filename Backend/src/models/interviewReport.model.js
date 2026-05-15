const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    severity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
  },
  { _id: false }
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: [{ type: String, required: true }],
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String, // ✅ fixed typo: tyepe → type
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    selfDescription: {
      type: String,
      required: true,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],

    behavioralQuestions: [behavioralQuestionSchema],

    skillGaps: [skillGapSchema],

    preparationPlan: [preparationPlanSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title : {
      type : String,
      required : true
      
    }
  },
  { timestamps: true }
);

const InterviewReportModel = mongoose.model("InterviewReport", interviewSchema);

module.exports = InterviewReportModel;


