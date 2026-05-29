import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function Dashboard() {
  const [students, setStudents] = useState([]);

  const [percentages, setPercentages] = useState({});

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    className: "",
  });

  const fetchPercentages = async (studentsData) => {
    let temp = {};

    for (let student of studentsData) {
      const res = await axios.get(`${API}/attendance/${student._id}`);

      const records = res.data;

      const total = records.length;

      const present = records.filter((r) => r.status === "Present").length;

      temp[student._id] =
        total === 0 ? 0 : ((present / total) * 100).toFixed(1);
    }

    setPercentages(temp);
  };

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students`);

    setStudents(res.data);

    fetchPercentages(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!form.name || !form.rollNo) return;

    await axios.post(`${API}/students`, form);

    setForm({
      name: "",
      rollNo: "",
      className: "",
    });

    fetchStudents();
  };

  const markAttendance = async (id, status) => {
    await axios.post(`${API}/attendance`, {
      studentId: id,
      date: new Date().toLocaleDateString(),
      status,
    });

    alert(`Marked ${status}`);

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/students/${id}`);

    fetchStudents();
  };

  return (
    <div className="container">
      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Reg No"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        />

        <input
          placeholder="Branch"
          value={form.className}
          onChange={(e) => setForm({ ...form, className: e.target.value })}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="student-list">
        {students.map((student) => (
          <div key={student._id} className="card">
            <h3>{student.name}</h3>

            <p>Reg No: {student.rollNo}</p>

            <p>Branch: {student.className}</p>

            <p>Attendance: {percentages[student._id] || 0}%</p>

            <div className="buttons">
              <button onClick={() => markAttendance(student._id, "Present")}>
                Present
              </button>

              <button onClick={() => markAttendance(student._id, "Absent")}>
                Absent
              </button>

              <button onClick={() => deleteStudent(student._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
