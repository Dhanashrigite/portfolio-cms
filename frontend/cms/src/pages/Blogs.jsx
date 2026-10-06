import { useEffect, useState } from "react";
import axios from "axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("access_token");

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/blogs/"
      );

      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const saveBlog = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter blog title and content.");
      return;
    }

    try {
      const data = {
        title: title,
        content: content,
        published: published,
      };

      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/blogs/${editingId}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Blog updated successfully!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/blogs/",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Blog added successfully!");
      }

      clearForm();
      fetchBlogs();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to save blog.");
      }
    }
  };

  const editBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setPublished(blog.published);
    setEditingId(blog.id);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/blogs/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog deleted successfully!");

      fetchBlogs();

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Login session expired. Please login again.");
      } else {
        alert("Failed to delete blog.");
      }
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setPublished(false);
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1>Manage Blogs</h1>

      <form onSubmit={saveBlog} style={styles.form}>

        <label>Blog Title</label>

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label>Blog Content</label>

        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />

          Publish this blog
        </label>

        <div style={styles.buttonRow}>

          <button type="submit" style={styles.button}>
            {editingId ? "Update Blog" : "Add Blog"}
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

      <h2>Blogs List</h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} style={styles.card}>

            <div>

              <h3>{blog.title}</h3>

              <p>{blog.content}</p>

              <p>
                <strong>Status:</strong>{" "}
                {blog.published ? "Published" : "Draft"}
              </p>

            </div>

            <div>

              <button
                onClick={() => editBlog(blog)}
                style={styles.editButton}
              >
                Edit
              </button>

              <button
                onClick={() => deleteBlog(blog.id)}
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
    minHeight: "180px",
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
    marginBottom: "20px",
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

export default Blogs;