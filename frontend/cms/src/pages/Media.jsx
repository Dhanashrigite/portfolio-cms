import { useEffect, useState } from "react";
import axios from "axios";

function Media() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState([]);

  const token = localStorage.getItem("access_token");

  const fetchMedia = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/media/"
      );

      setMedia(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/upload/image/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Image uploaded successfully!");

      setFile(null);
      document.getElementById("mediaFile").value = "";

      fetchMedia();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Image upload failed.");
      }
    }
  };

  return (
    <div style={styles.container}>

      <h1>Media Management</h1>

      <form onSubmit={uploadImage} style={styles.form}>

        <label>Select Image</label>

        <input
          id="mediaFile"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Upload Image
        </button>

      </form>

      <h2>Uploaded Images</h2>

      {media.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div style={styles.grid}>

          {media.map((item) => (
            <div key={item.id} style={styles.card}>

              <img
                src={`http://127.0.0.1:8000${item.file}`}
                alt="Uploaded"
                style={styles.image}
              />

              <p>Image ID: {item.id}</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  form: {
    padding: "25px",
    background: "#f5f5f5",
    borderRadius: "10px",
    marginBottom: "30px",
  },

  input: {
    display: "block",
    margin: "15px 0",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default Media;