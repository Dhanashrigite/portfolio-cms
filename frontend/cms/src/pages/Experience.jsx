import { useEffect, useState } from "react";
import axios from "axios";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/experience/"
      );

      setExperiences(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const saveExperience = async (e) => {
    e.preventDefault();

    if (!company || !role || !description || !startDate) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        company: company,
        role: role,
        description: description,
        start_date: startDate,
        end_date: current ? null : endDate || null,
        current: current,
      };

      if (editingId) {
        await api.put(`experience/${editingId}/`, data);

        alert("Experience updated successfully!");
      } else {
        await api.post("experience/", data);

        alert("Experience added successfully!");
      }

      clearForm();
      fetchExperiences();

    } catch (error) {
      console.log(error);
      alert("Failed to save experience.");
    }

    setLoading(false);
  };

  const editExperience = (experience) => {
    setCompany(experience.company);
    setRole(experience.role);
    setDescription(experience.description);
    setStartDate(experience.start_date);
    setEndDate(experience.end_date || "");
    setCurrent(experience.current);
    setEditingId(experience.id);
  };

  const deleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      await api.delete(`experience/${id}/`);

      alert("Experience deleted successfully!");

      fetchExperiences();

    } catch (error) {
      console.log(error);
      alert("Failed to delete experience.");
    }
  };

  const clearForm = () => {
    setCompany("");
    setRole("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCurrent(false);
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Experience</h1>

      <form onSubmit={saveExperience} style={styles.form}>

        <label>Company *</label>

        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <label>Role *</label>

        <input
          type="text"
          placeholder="Your role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        <label>Description *</label>

        <textarea
          placeholder="Describe your experience"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <label>Start Date *</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />

        <label>End Date</label>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={current}
          style={styles.input}
        />

        <label style={styles.checkboxLabel}>

          <input
            type="checkbox"
            checked={current}
            onChange={(e) => setCurrent(e.target.checked)}
          />

          Currently working here

        </label>

        <br />

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Experience"
            : "Add Experience"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={clearForm}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        )}

      </form>

      <h2>Experience List</h2>

      {experiences.length === 0 ? (
        <p>No experience found.</p>
      ) : (
        <div>

          {experiences.map((experience) => (

            <div key={experience.id} style={styles.card}>

              <div>

                <h3>{experience.role}</h3>

                <h4>{experience.company}</h4>

                <p>{experience.description}</p>

                <p>
                  <strong>From:</strong>{" "}
                  {experience.start_date}
                </p>

                <p>
                  <strong>To:</strong>{" "}
                  {experience.current
                    ? "Present"
                    : experience.end_date || "Not specified"}
                </p>

              </div>

              <div>

                <button
                  onClick={() => editExperience(experience)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExperience(experience.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f5f7ff",
    fontFamily: "Arial, sans-serif",
  },

  form: {
    maxWidth: "700px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
  },

  checkboxLabel: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "15px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
    marginRight: "10px",
  },

  cancelButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#777",
    color: "white",
    cursor: "pointer",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    backgroundColor: "white",
    padding: "25px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
  },

  editButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    marginRight: "8px",
  },

  deleteButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#d32f2f",
    color: "white",
    cursor: "pointer",
  },
};

export default Experience;