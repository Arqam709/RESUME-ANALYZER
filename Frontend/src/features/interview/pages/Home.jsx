import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useinterview.js";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const {
    loading,
    generateReport,
    reports,
    getAllReports,
  } = useInterview();

  const {handleLogout} = useAuth()

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUserLogout = async () => {
  await handleLogout();
  navigate("/login");
};

  useEffect(() => {
    getAllReports();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const resumeFile = resumeInputRef.current.files[0];

      if (!resumeFile) {
        alert("Please upload your resume PDF.");
        return;
      }

      if (!jobDescription || !selfDescription) {
        alert("Please fill job description and self description.");
        return;
      }

      const data = await generateReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      console.log("Generated data:", data);

      if (!data?.interviewReport?._id) {
        alert("Report was not generated correctly. Check console/backend.");
        return;
      }

      // refresh recent reports list after generating
      await getAllReports();

      navigate(`/interview/${data.interviewReport._id}`);
    } catch (err) {
      console.log("Generate report error:", err);
      alert("Failed to generate report.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] px-4 py-10 relative">
      <div className="w-full max-w-5xl mx-auto flex justify-end mb-6">
    <button
      onClick={handleUserLogout}
      className="bg-[#e6005c] hover:bg-[#c90050] text-white font-semibold px-5 py-2 rounded-xl transition cursor-pointer"
    >
      Logout
    </button>
  </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Your Custom{" "}
            <span className="text-rose-500">Interview Plan</span>
          </h1>

          <p className="text-slate-400 mt-2">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        <div className="w-full max-w-5xl bg-[#151922] border border-slate-700 rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Target Job Description
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                id="jobDescription"
                placeholder="Write the full job description here..."
                className="w-full h-80 resize-none rounded-xl bg-[#20242e] border border-slate-700 text-white placeholder-slate-400 p-4 outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Right side */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Your Profile
              </label>

              <div className="mb-5">
                <p className="text-slate-300 text-sm mb-2">Upload Resume</p>

                <input
                  ref={resumeInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  className="block w-full text-sm text-slate-300
                  file:mr-4 file:rounded-lg file:border-0
                  file:bg-rose-600 file:px-4 file:py-2
                  file:text-white file:font-medium
                  hover:file:bg-rose-700
                  bg-[#20242e] border border-slate-700 rounded-xl p-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Quick Self Description
                </label>

                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                  className="w-full h-40 resize-none rounded-xl bg-[#20242e] border border-slate-700 text-white placeholder-slate-400 p-4 outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="mt-5 bg-blue-950/40 border border-blue-800 text-blue-200 text-sm rounded-lg p-3">
                Resume, job description, and self description are required to
                generate a personalized plan.
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t border-slate-700 pt-5">
            <button
              onClick={handleGenerateReport}
              disabled={loading}
              type="button"
              className="bg-[#e6005c] hover:bg-[#c90050] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-lg cursor-pointer"
            >
              {loading ? "Generating..." : "Generate My Interview Strategy"}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">
            My Recent Interview Plans
          </h2>

          <span className="text-slate-400 text-sm">
            Total Reports: {reports.length}
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="bg-[#151922] border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">
              No interview reports generated yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="bg-[#151922] border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-rose-500 transition"
              >
                <h3 className="text-white font-bold text-base line-clamp-2">
                  {report.title || "AI Interview Report"}
                </h3>

                <p className="text-slate-400 text-xs mt-2">
                  Generated on{" "}
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </p>

                <p className="text-rose-500 text-xs font-semibold mt-2">
                  Match Score: {report.matchScore || 0}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
