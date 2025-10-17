import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username || "User"} 👋</h1>
      <p>Your space to focus, learn, and grow efficiently.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "25px",
          padding: "10px 25px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(90deg, #6b9dfc, #8ac5ff)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
