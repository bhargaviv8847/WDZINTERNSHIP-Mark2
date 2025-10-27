import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-card">
      <div className="avatar">{username.charAt(0).toUpperCase()}</div>

      <h2 className="dashboard-title">
        Welcome back, <span className="username">{username}</span> 👋
      </h2>
<Link to="/admin/courses" className="btn-manage">
  Manage Courses
</Link>

      <p className="dashboard-subtitle">
        Manage your learning, explore your courses, and track your growth.
      </p>

      <div className="dashboard-actions">
        <button className="btn view-btn" onClick={() => navigate("/courses")}>
          📚 View Courses
        </button>
        <button className="btn logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
