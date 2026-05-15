const express = require("express");

const { authuser } = require("../middlewares/auth.middleware");

const interviewRouter = express.Router();

const interviewController = require("../controllers/interview.controller");

const upload = require("../middlewares/file.middelware");

// Generate report - protected
interviewRouter.post(
  "/",
  authuser,
  upload.single("resume"),
  interviewController.generateInterviewReportController
);

// Get one report - protected
interviewRouter.get(
  "/report/:interviewId",
  authuser,
  interviewController.getInterviewReportController
);

// Get all reports of logged-in user - protected
interviewRouter.get(
  "/",
  authuser,
  interviewController.getAllInterviewsController
);

module.exports = interviewRouter;