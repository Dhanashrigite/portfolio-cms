import { useEffect, useState } from "react";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
     const token = localStorage.getItem("access_token");

      console.log("Access token exists:", !!token);

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/messages/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Messages:", response.data);

      setMessages(response.data);
    } catch (error) {
      console.log("Messages Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }

      alert("Unable to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          color: "#1e293b",
        }}
      >
        Contact Messages
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Messages received from your portfolio contact form.
      </p>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div
          style={{
            background: "#f8fafc",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3>No messages yet</h3>

          <p style={{ color: "#64748b" }}>
            Contact form messages will appear here.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.05)",
              }}
            >
              <h2
                style={{
                  marginBottom: "10px",
                  color: "#2563eb",
                }}
              >
                {message.subject || "No Subject"}
              </h2>

              <p>
                <strong>Name:</strong>{" "}
                {message.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {message.email}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <p
                style={{
                  color: "#475569",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.message}
              </p>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  marginTop: "15px",
                }}
              >
                Received:{" "}
                {new Date(
                  message.created_at
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;