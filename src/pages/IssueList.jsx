import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const q = query(
          collection(db, "issues"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIssues(data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "All" || issue.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  if (loading) return <p style={{ padding: 40 }}>Loading issues...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Issue List</h2>

        {/* Filters */}
        <div style={styles.filters}>
          <div>
            <label>Status</label>
            <select
              style={styles.select}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select
              style={styles.select}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredIssues.length === 0 ? (
          <p style={{ textAlign: "center" }}>No issues found</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Created By</th>
                  <th>Created Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.status}</td>
                    <td>{issue.assignedTo}</td>
                    <td>{issue.createdBy}</td>
                    <td>
                      {issue.createdAt?.toDate().toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  select: {
    marginLeft: "10px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
