const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};