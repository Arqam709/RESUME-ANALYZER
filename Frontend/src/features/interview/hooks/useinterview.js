import {
  generateInterviewReport,
  getInterviewReportbyId,
  getAllInterviews,
} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    interviewReport,
    setInterviewReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      
      setInterviewReport(response.interviewReport);

      return response;
    } catch (err) {
      console.log("generateReport error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReportbyId = async (interviewId) => {
    setLoading(true);

    try {
      const response = await getInterviewReportbyId(interviewId);

      setInterviewReport(response.interviewReport);

      return response;
    } catch (err) {
      console.log("getReportbyId error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllReports = async () => {
    setLoading(true);

    try {
      const response = await getAllInterviews();

      setReports(response.interviewReports);

      return response;
    } catch (err) {
      console.log("getAllReports error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    interviewReport,
    reports,
    generateReport,
    getReportbyId,
    getAllReports,
  };
};
