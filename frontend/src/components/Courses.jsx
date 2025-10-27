import React, { useEffect, useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ get token from localStorage

    if (!token) {
      setError("Unauthorized. Please login first.");
      setLoading(false);
      return;
    }

    // ✅ Fetch courses with Authorization header
    fetch("http://127.0.0.1:8000/api/courses/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // ✅ attach token
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        }
        if (!res.ok) {
          throw new Error("Failed to fetch courses.");
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="courses-wrapper">
      <h1 className="page-title">🎓 Trending Online Courses</h1>

      {/* ✅ Show loading or error messages */}
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            courses.map((course, index) => (
              <div
                className={`course-box box-${(index % 10) + 1}`}
                key={course.id}
                onClick={() =>
                  navigate(`/courses/${course.id}`, { state: { course } })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="course-rank">{index + 1}</div>
                <h3>{course.title}</h3>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
