const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.json(attendance);
};

exports.getAttendance = async (req, res) => {
  const data = await Attendance.find({ studentId: req.params.studentId });
  res.json(data);
};