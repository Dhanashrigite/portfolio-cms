import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/projects/"
      );

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const saveProject = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please enter project title and description.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        title: title,
        description: description,
        project_url: projectUrl || null,
        github_url: githubUrl || null,
      };

      if (editingId) {
        await api.put(`projects/${editingId}/`, data);

        alert("Project updated successfully!");
      } else {
        await api.post("projects/", data);

        alert("Project added successfully!");
      }

      setTitle("");
      setDescription("");
      setProjectUrl("");
      setGithubUrl("");
      setEditingId(null);

      fetchProjects();

    } catch (error) {
      console.log(error);
      alert("Failed to save project.");
    }

    setLoading(false);
  };

  const editProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setProjectUrl(project.project_url || "");
    setGithubUrl(project.github_url || "");
    setEditingId(project.id);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await api.delete(`projects/${id}/`);

      alert("Project deleted successfully!");

      fetchProjects();

    } catch (error) {
      console.log(error);
      alert("Failed to delete project.");
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setProjectUrl("");
    setGithubUrl("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Projects</h1>

      <form onSubmit={saveProject} style={styles.form}>

        <label>Project Title</label>

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label>Description</label>

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <label>Project URL</label>

        <input
          type="url"
          placeholder="https://your-project-link.com"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          style={styles.input}
        />

        <label>GitHub URL</label>

        <input
          type="url"
          placeholder="https://github.com/username/project"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
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
            ? "Update Project"
            : "Add Project"}
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

      <h2>Projects List</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div>

          {projects.map((project) => (

            <div key={project.id} style={styles.card}>

              <div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                {project.project_url && (
                  <p>
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Project Link
                    </a>
                  </p>
                )}

                {project.github_url && (
                  <p>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </p>
                )}

              </div>

              <div>

                <button
                  onClick={() => editProject(project)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
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
    maxWidth: "700px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "vertical",
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
    alignItems: "flex-start",
    gap: "20px",
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

export default Projects;