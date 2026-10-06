import { useEffect, useState } from "react";
import axios from "axios";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/testimonials/"
      );

      setTestimonials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const saveTestimonial = async (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Please enter name and message.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name: name,
        message: message,
        role: role,
      };

      if (editingId) {
        await api.put(`testimonials/${editingId}/`, data);

        alert("Testimonial updated successfully!");
      } else {
        await api.post("testimonials/", data);

        alert("Testimonial added successfully!");
      }

      clearForm();
      fetchTestimonials();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to save testimonial.");
      }
    }

    setLoading(false);
  };

  const editTestimonial = (testimonial) => {
    setName(testimonial.name);
    setMessage(testimonial.message);
    setRole(testimonial.role || "");
    setEditingId(testimonial.id);
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      await api.delete(`testimonials/${id}/`);

      alert("Testimonial deleted successfully!");

      fetchTestimonials();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to delete testimonial.");
      }
    }
  };

  const clearForm = () => {
    setName("");
    setMessage("");
    setRole("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Testimonials</h1>

      <form onSubmit={saveTestimonial} style={styles.form}>

        <label>Name *</label>

        <input
          type="text"
          placeholder="Person's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label>Role</label>

        <input
          type="text"
          placeholder="e.g. Student, Developer, Client"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        <label>Message *</label>

        <textarea
          placeholder="Write testimonial message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.buttonRow}>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Testimonial"
              : "Add Testimonial"}
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

        </div>

      </form>

      <h2>Testimonials List</h2>

      {testimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        testimonials.map((testimonial) => (

          <div key={testimonial.id} style={styles.card}>

            <div>

              <h3>{testimonial.name}</h3>

              {testimonial.role && (
                <p style={styles.role}>
                  {testimonial.role}
                </p>
              )}

              <p>{testimonial.message}</p>

            </div>

            <div>

              <button
                onClick={() => editTestimonial(testimonial)}
                style={styles.editButton}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>

            </div>

          </div>

        ))
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
    minHeight: "150px",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
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

  role: {
    color: "#666",
    fontStyle: "italic",
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

export default Testimonials;