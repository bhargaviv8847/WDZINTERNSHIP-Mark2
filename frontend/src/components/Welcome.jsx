import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome 🌱</h1>
        <p>Focus. Learn. Grow. Let's start your journey.</p>

        <div className="welcome-buttons">
          <Link to="/register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
