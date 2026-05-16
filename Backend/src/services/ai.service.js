const { GoogleGenerativeAI } = require("@google/generative-ai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
const interviewReportSchema = z
  .object({
    matchScore: z
      .number()
      .describe(
        "The match score between the candidate and the job role. The score is between 0 and 100."
      ),

    technicalQuestions: z
      .array(
        z.object({
          question: z.string().describe("The technical question to ask."),
          intention: z.string().describe("Why the interviewer asks this question."),
          answer: z.string().describe("How the candidate should answer."),
        })
      )
      .describe("Technical interview questions with intention and answers."),

    behavioralQuestions: z
      .array(
        z.object({
          question: z.string().describe("The behavioral question to ask."),
          intention: z.string().describe("Why the interviewer asks this question."),
          answer: z.string().describe("How the candidate should answer."),
        })
      )
      .describe("Behavioral interview questions with intention and answers."),

    skillGaps: z
      .array(
        z.object({
          skill: z.string().describe("Skill missing or weak in the candidate."),
          severity: z
            .enum(["Low", "Medium", "High"])
            .describe("Importance of this skill gap."),
        })
      )
      .describe("Candidate skill gaps."),

    preparationPlan: z
      .array(
        z.object({
          day: z.number().describe("Day number of the preparation plan."),
          focus: z.string().describe("Main focus for that day."),
          tasks: z.array(z.string()).describe("Tasks for that day."),
        })
      )
      .describe("Day-wise preparation plan."),
      
      title : z.string().describe("the title of the job the interview report is generated for")
  })
  .describe("Interview report for the candidate.");

async function generateInterviewReport(resume, selfDescription, jobDescription) {
const prompt = `
You are an expert interviewer.

Generate a structured interview report.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT explain anything
- Follow EXACT structure below
- DO NOT repeat keys
- DO NOT use flat arrays
- ALWAYS return objects inside arrays

FORMAT:

{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "Low | Medium | High"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": ["task1", "task2"]
    }
  ]
}

BAD EXAMPLE (DO NOT DO THIS):
["question", "answer", "intention"]

GOOD EXAMPLE:
[
  {
    "question": "Explain middleware",
    "intention": "Test backend knowledge",
    "answer": "Middleware are functions..."
  }
]

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const result = await model.generateContent(prompt);

const response = await result.response;
const text = response.text();

return JSON.parse(text);

}

module.exports = {
  generateInterviewReport,
};


