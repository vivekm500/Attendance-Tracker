const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/:studentId", getAttendance);

module.exports = router;