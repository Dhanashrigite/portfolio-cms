import { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("access_token");

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/services/"
      );

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const saveService = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description.");
      return;
    }

    try {
      const data = {
        title: title,
        description: description,
        icon: icon,
      };

      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/services/${editingId}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Service updated successfully!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/services/",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Service added successfully!");
      }

      clearForm();
      fetchServices();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to save service.");
      }
    }
  };

  const editService = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon || "");
    setEditingId(service.id);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/services/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service deleted successfully!");
      fetchServices();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to delete service.");
      }
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setIcon("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Services</h1>

      <form onSubmit={saveService} style={styles.form}>

        <label>Service Title</label>

        <input
          type="text"
          placeholder="Enter service title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label>Service Description</label>

        <textarea
          placeholder="Enter service description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <label>Icon</label>

        <input
          type="text"
          placeholder="Example: 💻"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          style={styles.input}
        />

        <div style={styles.buttonRow}>

          <button type="submit" style={styles.button}>
            {editingId ? "Update Service" : "Add Service"}
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

      <h2>Services List</h2>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        services.map((service) => (

          <div key={service.id} style={styles.card}>

            <div>

              <h3>
                {service.icon} {service.title}
              </h3>

              <p>{service.description}</p>

            </div>

            <div>

              <button
                onClick={() => editService(service)}
                style={styles.editButton}
              >
                Edit
              </button>

              <button
                onClick={() => deleteService(service.id)}
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
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f5f5",
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  textarea: {
    padding: "12px",
    minHeight: "100px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  cancelButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#777",
    color: "white",
    cursor: "pointer",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    background: "#f8fafc",
    border: "1px solid #ddd",
  },

  editButton: {
    padding: "8px 14px",
    marginRight: "8px",
    border: "none",
    borderRadius: "5px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
  },
};

export default Services;