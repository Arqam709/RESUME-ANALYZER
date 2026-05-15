
const pdfParse = require("pdf-parse");
const InterviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/ai.service");

async function generateInterviewReportController(req, res) {
  try {

    
    const resumeFile = req.file; //getting the uploaded file from the request object, which is added by the multer middleware when we use upload.single("resume") in our route. The uploaded file will be available in req.file and we can access its properties like buffer, originalname, mimetype etc. to process the file as needed.

    if (!resumeFile) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "selfDescription and jobDescription are required",
      });
    }

    //read the text from the uploded resume
    /*
The file is stored in memory as a buffer:

resumeFile.buffer

Then you convert it:

Uint8Array.from(resumeFile.buffer)

Then pdf-parse extracts the text.

Finally:

const resumeText = resumeContext.text;

Now you have the resume text as normal string.

Example:

Ahsan Ahmed
Software Engineering Student
Skills: Node.js, Express, MongoDB...
    */
    const resumeContext = await new pdfParse.PDFParse(
      Uint8Array.from(resumeFile.buffer) //the file is stored in the memory as buffer
    ).getText();

    const resumeText = resumeContext.text;

    //here we are giving 3 things to the ai model, the resume text, the self description and the job description and asking it to generate the interview report for us based on these 3 inputs. The ai model will analyze the resume text, self description and job description and generate a report which will include the strengths and weaknesses of the candidate based on the resume and self description, and also how well the candidate is fit for the job based on the job description. The ai model will return an object which will include all these information and we will save that object in our database for future reference.
    const interviewReportByAi = await generateInterviewReport(
  resumeText,
  selfDescription,
  jobDescription
);

    //save the interview report in the database
    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
  ...interviewReportByAi,
  title: interviewReportByAi.title || "AI Interview Report",
  resumeText,
  selfDescription,
  jobDescription,
});

    res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }

}

async function getInterviewReportController(req, res) {

  const { interviewId } = req.params;
    const interviewReport = await InterviewReportModel.findOne({ _id: interviewId });

    if(!interviewReport){
        return res.status(404).json({
            message : "Interview report not found"
        })
    }
    res.status(200).json({
        message : "Interview report fetched successfully",
        interviewReport
    })


};

async function getAllInterviewsController(req, res) {
  try {
    const interviewReports = await InterviewReportModel.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .select(
        "-resumeText -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
      );

    res.status(200).json({
      message: "All interview reports fetched successfully",
      interviewReports,
    });
  } catch (err) {
    console.log("getAllInterviewsController error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
}


module.exports = {
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewsController,
};
