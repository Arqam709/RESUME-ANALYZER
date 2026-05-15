import React, { useEffect, useState } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate,useParams } from "react-router-dom";

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(0);

  const {interviewId} = useParams()

  const {
    loading,
    interviewReport,
    getReportbyId,
  } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportbyId(interviewId);
    }
  }, [interviewId]);

  const handleNavClick = (navName) => {
    setActiveNav(navName);
    setOpenQuestion(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Loading report...</h1>
      </div>
    );
  }

  if (!interviewReport) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">
          No interview report found.
        </h1>
      </div>
    );
  }

  const technicalQuestions = interviewReport.technicalQuestions || [];
  const behavioralQuestions = interviewReport.behavioralQuestions || [];

  const roadmapDays =
  interviewReport.preparationPlan ||
  interviewReport.roadmapDays ||
  interviewReport.roadmap ||
  interviewReport.preparationRoadmap ||
  [];

  const skillGaps = interviewReport.skillGaps || [];

  const matchScore =
    interviewReport.matchScore ||
    interviewReport.overallScore ||
    interviewReport.score ||
    0;

  const questions =
    activeNav === "technical" ? technicalQuestions : behavioralQuestions;

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans flex items-stretch p-6 box-border">
      <div className="flex w-full max-w-[1280px] mx-auto bg-[#161b22] border border-[#2a3348] rounded-2xl justify-between overflow-hidden">
        {/* Left Nav */}
        <nav className="w-[220px] shrink-0 px-4 py-7 flex flex-col justify-between gap-1">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#7d8590] px-3 mb-2">
              Sections
            </p>

            <button
              onClick={() => handleNavClick("technical")}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 border-none rounded-lg font-sans text-sm cursor-pointer text-left transition-colors duration-150 ${
                activeNav === "technical"
                  ? "bg-[#ff2d78]/10 text-[#ff2d78]"
                  : "bg-transparent text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]"
              }`}
            >
              Technical Questions
            </button>

            <button
              onClick={() => handleNavClick("behavioral")}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 border-none rounded-lg font-sans text-sm cursor-pointer text-left transition-colors duration-150 ${
                activeNav === "behavioral"
                  ? "bg-[#ff2d78]/10 text-[#ff2d78]"
                  : "bg-transparent text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]"
              }`}
            >
              Behavioral Questions
            </button>

            <button
              onClick={() => handleNavClick("roadmap")}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 border-none rounded-lg font-sans text-sm cursor-pointer text-left transition-colors duration-150 ${
                activeNav === "roadmap"
                  ? "bg-[#ff2d78]/10 text-[#ff2d78]"
                  : "bg-transparent text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]"
              }`}
            >
              Road Map
            </button>
          </div>

          <button className="w-full px-4 py-2.5 rounded-lg bg-[#ff2d78] text-white text-sm font-semibold hover:bg-[#e0266b] transition-colors duration-150">
            Download Report
          </button>
        </nav>

        <div className="w-px bg-[#2a3348] shrink-0" />

        {/* Center Content */}
        <main className="flex-1 px-8 py-7 overflow-y-auto max-h-[calc(100vh-3rem)] pb-20 items-start [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {activeNav !== "roadmap" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                <h2 className="text-[1.1rem] font-bold text-[#e6edf3] m-0">
                  {activeNav === "technical"
                    ? "Technical Questions"
                    : "Behavioral Questions"}
                </h2>

                <span className="text-[0.8rem] text-[#7d8590] bg-[#1c2230] px-2.5 py-1 rounded-full border border-[#2a3348]">
                  {questions.length} questions
                </span>
              </div>

              {questions.length === 0 ? (
                <p className="text-[#7d8590]">
                  No questions found for this section.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {questions.map((item, index) => (
                    <div
                      className="bg-[#1c2230] border border-[#2a3348] rounded-[0.6rem] overflow-hidden transition-colors duration-200 hover:border-[#36415a]"
                      key={index}
                    >
                      <div
                        className="flex items-start gap-3 px-4 py-3.5 cursor-pointer select-none"
                        onClick={() =>
                          setOpenQuestion(openQuestion === index ? null : index)
                        }
                      >
                        <span className="shrink-0 text-[0.7rem] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/20 rounded px-1.5 py-0.5 mt-0.5">
                          Q{index + 1}
                        </span>

                        <p className="flex-1 m-0 text-[0.9rem] font-medium text-[#e6edf3] leading-6">
                          {item.question}
                        </p>

                        <span
                          className={`shrink-0 text-[#7d8590] transition-transform duration-200 mt-0.5 ${
                            openQuestion === index
                              ? "rotate-180 text-[#ff2d78]"
                              : ""
                          }`}
                        >
                          ▼
                        </span>
                      </div>

                      {openQuestion === index && (
                        <div className="px-4 pb-4 pt-3 flex flex-col gap-3 border-t border-[#2a3348]">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] px-2 py-1 rounded w-fit text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20">
                              Intention
                            </span>

                            <p className="m-0 text-[0.835rem] text-[#a0a8b3] leading-6">
                              {item.intention || "No intention provided."}
                            </p>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <span className="text-[0.68rem] font-bold uppercase tracking-[0.06em] px-2 py-1 rounded w-fit text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20">
                              Model Answer
                            </span>

                            <p className="m-0 text-[0.835rem] text-[#a0a8b3] leading-6">
                              {item.answer || "No answer provided."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeNav === "roadmap" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                <h2 className="text-[1.1rem] font-bold text-[#e6edf3] m-0">
                  Preparation Road Map
                </h2>

                <span className="text-[0.8rem] text-[#7d8590] bg-[#1c2230] px-2.5 py-1 rounded-full border border-[#2a3348]">
                  {roadmapDays.length} days
                </span>
              </div>

              {roadmapDays.length === 0 ? (
                <p className="text-[#7d8590]">
                  No roadmap found in this report.
                </p>
              ) : (
                <div className="flex flex-col gap-0 relative before:content-[''] before:absolute before:left-[28px] before:top-0 before:bottom-0 before:w-[2px] before:bg-[linear-gradient(to_bottom,#ff2d78,rgba(255,45,120,0.1))] before:rounded">
                  {roadmapDays.map((day, index) => (
                    <div
                      className="flex flex-col gap-2 py-3 pl-14 relative before:content-[''] before:absolute before:left-[21px] before:top-[1.05rem] before:w-[14px] before:h-[14px] before:rounded-full before:bg-[#161b22] before:border-2 before:border-[#ff2d78]"
                      key={index}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[0.7rem] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/25 px-2 py-0.5 rounded-full">
                          Day {day.day || index + 1}
                        </span>

                        <h3 className="m-0 text-[0.95rem] font-semibold text-[#e6edf3]">
                          {day.focus || day.title || "Preparation Focus"}
                        </h3>
                      </div>

                      <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
                        {(day.tasks || []).map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="flex items-start gap-2 text-[0.845rem] text-[#9aa3ad] leading-6"
                          >
                            <span className="shrink-0 w-[5px] h-[5px] rounded-full bg-[#7d8590] mt-2" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        <div className="w-px bg-[#2a3348] shrink-0" />

        {/* Right Sidebar */}
        <aside className="w-[240px] shrink-0 px-5 py-7 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7d8590] m-0 self-start">
              Match Score
            </p>

            <div className="w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center border-4 border-[#3fb950]">
              <span className="text-[1.6rem] font-extrabold text-[#e6edf3] leading-none">
                {matchScore}
              </span>
              <span className="text-xs text-[#7d8590] -mt-0.5">%</span>
            </div>

            <p className="m-0 text-xs text-[#3fb950] text-center">
              {matchScore >= 80
                ? "Strong match for this role"
                : matchScore >= 50
                ? "Moderate match for this role"
                : "Needs preparation for this role"}
            </p>
          </div>

          <div className="h-px bg-[#2a3348]" />

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7d8590] m-0">
              Skill Gaps
            </p>

            {skillGaps.length === 0 ? (
              <p className="text-[0.8rem] text-[#7d8590]">
                No skill gaps found.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skillGaps.map((gap, index) => {
                  const skillName =
                    typeof gap === "string" ? gap : gap.skill || gap.name;

                  const severity =
                    typeof gap === "string" ? "Medium" : gap.severity;

                  const severityClass =
                    severity === "High"
                      ? "text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25"
                      : severity === "Low"
                      ? "text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25"
                      : "text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25";

                  return (
                    <span
                      key={index}
                      className={`text-[0.775rem] font-medium px-3 py-1.5 rounded-md border cursor-default ${severityClass}`}
                    >
                      {skillName}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;