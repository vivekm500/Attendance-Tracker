const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  date: {
    type: String
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);