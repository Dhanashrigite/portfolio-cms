import { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [about, setAbout] = useState(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchAbout = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/about/"
      );

      if (response.data.length > 0) {
        const data = response.data[0];

        setAbout(data);
        setName(data.name);
        setTitle(data.title);
        setDescription(data.description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const saveAbout = async (e) => {
    e.preventDefault();

    if (!name || !title || !description) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      if (about) {
        await api.put(`about/${about.id}/`, {
          name: name,
          title: title,
          description: description,
        });

        alert("About information updated successfully!");
      } else {
        await api.post("about/", {
          name: name,
          title: title,
          description: description,
        });

        alert("About information added successfully!");
      }

      fetchAbout();

    } catch (error) {
      console.log(error);
      alert("Failed to save About information.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h1>Manage About</h1>

      <form onSubmit={saveAbout} style={styles.form}>

        <label>Name</label>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label>Title</label>

        <input
          type="text"
          placeholder="Your professional title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label>Description</label>

        <textarea
          placeholder="Write about yourself"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : about
            ? "Update About"
            : "Add About"}
        </button>

      </form>

      {about && (
        <div style={styles.card}>

          <h2>{about.name}</h2>

          <h3>{about.title}</h3>

          <p>{about.description}</p>

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
    maxWidth: "600px",
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
    minHeight: "150px",
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
  },

  card: {
    maxWidth: "600px",
    marginTop: "30px",
    padding: "25px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
};

export default About;