import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // ✅ redirect to login page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Smart Issue Board</h1>

        <p style={styles.welcome}>
          Welcome, <strong>{user?.email}</strong>
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryButton}
            onClick={() => navigate("/create-issue")}
          >
            ➕ Create Issue
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/issues")}
          >
            📋 Issue List
          </button>

          <button
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 Inline Styles */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "380px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
  welcome: {
    marginBottom: "30px",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  primaryButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #667eea",
    background: "#fff",
    color: "#667eea",
    fontSize: "16px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#e74c3c",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};
