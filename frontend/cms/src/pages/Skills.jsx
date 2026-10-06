import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/skills/"
      );

      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const saveSkill = async (e) => {
    e.preventDefault();

    if (!name || !level) {
      alert("Please enter skill name and level.");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        await api.put(`skills/${editingId}/`, {
          name: name,
          level: level,
        });

        alert("Skill updated successfully!");
      } else {
        await api.post("skills/", {
          name: name,
          level: level,
        });

        alert("Skill added successfully!");
      }

      setName("");
      setLevel("");
      setEditingId(null);

      fetchSkills();

    } catch (error) {
      console.log(error);
      alert("Operation failed.");
    }

    setLoading(false);
  };

  const editSkill = (skill) => {
    setName(skill.name);
    setLevel(skill.level);
    setEditingId(skill.id);
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      await api.delete(`skills/${id}/`);

      alert("Skill deleted successfully!");

      fetchSkills();

    } catch (error) {
      console.log(error);
      alert("Failed to delete skill.");
    }
  };

  const cancelEdit = () => {
    setName("");
    setLevel("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Skills</h1>

      <form onSubmit={saveSkill} style={styles.form}>

        <input
          type="text"
          placeholder="Skill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Skill level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Skill"
            : "Add Skill"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        )}

      </form>

      <h2>Skills List</h2>

      {skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div>

          {skills.map((skill) => (

            <div key={skill.id} style={styles.card}>

              <div>
                <h3>{skill.name}</h3>
                <p>Level: {skill.level}</p>
              </div>

              <div>

                <button
                  onClick={() => editSkill(skill)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSkill(skill.id)}
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
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },

  form: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "white",
    cursor: "pointer",
    marginRight: "10px",
  },

  cancelButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#777",
    color: "white",
    cursor: "pointer",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  editButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    marginRight: "10px",
  },

  deleteButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#d32f2f",
    color: "white",
    cursor: "pointer",
  },
};

export default Skills;