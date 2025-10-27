import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  if (!course) {
    return (
      <div className="course-detail-wrapper">
        <h2>Course not found</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-bg">
      <div className="course-detail-card">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-desc">{course.description}</p>

        <div className="course-info">
          <div className="info-box">
            <span className="icon">📅</span> Duration: {course.duration}
          </div>
          <div className="info-box">
            <span className="icon">📘</span> Level: {course.level}
          </div>
          <div className="info-box">
            <span className="icon">⭐</span> Rating: {course.rating}
          </div>
        </div>

        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
}
