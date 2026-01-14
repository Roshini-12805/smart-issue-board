import { useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreateIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in");
      return;
    }

    if (!title || !description || !assignedTo) {
      alert("All fields are required");
      return;
    }

    // 🚫 STATUS RULE
    if (status === "Done") {
      alert(
        "An issue cannot move directly from Open to Done.\nPlease select 'In Progress' first."
      );
      return;
    }

    try {
      setLoading(true);

      const normalizedTitle = title.toLowerCase().trim();
      const normalizedDescription = description.toLowerCase().trim();

      const snapshot = await getDocs(collection(db, "issues"));
      let similarFound = false;

      snapshot.forEach((doc) => {
        const issue = doc.data();
        if (
          issue.title?.toLowerCase().trim() === normalizedTitle &&
          issue.description?.toLowerCase().trim() === normalizedDescription
        ) {
          similarFound = true;
        }
      });

      if (similarFound) {
        const confirmCreate = window.confirm(
          "⚠️ A similar issue already exists.\n\nDo you want to create it anyway?"
        );
        if (!confirmCreate) {
          setLoading(false);
          return;
        }
      }

      await addDoc(collection(db, "issues"), {
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        assignedTo,
        createdAt: Timestamp.now(),
        createdBy: user.email,
      });

      alert("Issue created successfully");
      navigate("/issues");
    } catch (error) {
      console.error("Error creating issue:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Issue</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label style={styles.label}>Priority</label>
          <select
            style={styles.input}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label style={styles.label}>Status</label>
          <select
            style={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <label style={styles.label}>Assigned To</label>
          <input
            style={styles.input}
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />

          <label style={styles.label}>Created By</label>
          <input
            style={{ ...styles.input, background: "#f3f3f3" }}
            type="text"
            value={user?.email || ""}
            disabled
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Issue"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🎨 Styles */
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
    padding: "35px",
    width: "420px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical",
  },
  button: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};
