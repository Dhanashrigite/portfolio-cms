import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#1e293b",
            marginBottom: "10px",
          }}
        >
          Portfolio CMS Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Manage your portfolio content from one place.
        </p>
      </div>

      {/* DASHBOARD CARDS */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {/* ABOUT */}

        <Link
          to="/about"
          style={cardStyle}
        >
          <div style={iconStyle}>👤</div>

          <h2 style={titleStyle}>
            About
          </h2>

          <p style={descriptionStyle}>
            Manage your portfolio introduction and profile information.
          </p>
        </Link>

        {/* SKILLS */}

        <Link
          to="/skills"
          style={cardStyle}
        >
          <div style={iconStyle}>💻</div>

          <h2 style={titleStyle}>
            Skills
          </h2>

          <p style={descriptionStyle}>
            Add and manage your technical skills.
          </p>
        </Link>

        {/* PROJECTS */}

        <Link
          to="/projects"
          style={cardStyle}
        >
          <div style={iconStyle}>📁</div>

          <h2 style={titleStyle}>
            Projects
          </h2>

          <p style={descriptionStyle}>
            Manage your projects and GitHub links.
          </p>
        </Link>

        {/* EXPERIENCE */}

        <Link
          to="/experience"
          style={cardStyle}
        >
          <div style={iconStyle}>💼</div>

          <h2 style={titleStyle}>
            Experience
          </h2>

          <p style={descriptionStyle}>
            Manage your work and internship experience.
          </p>
        </Link>

        {/* BLOGS */}

        <Link
          to="/blogs"
          style={cardStyle}
        >
          <div style={iconStyle}>📝</div>

          <h2 style={titleStyle}>
            Blogs
          </h2>

          <p style={descriptionStyle}>
            Create and manage your portfolio blogs.
          </p>
        </Link>

        {/* TESTIMONIALS */}

        <Link
          to="/testimonials"
          style={cardStyle}
        >
          <div style={iconStyle}>⭐</div>

          <h2 style={titleStyle}>
            Testimonials
          </h2>

          <p style={descriptionStyle}>
            Manage testimonials from clients and colleagues.
          </p>
        </Link>

        {/* SERVICES */}

        <Link
          to="/services"
          style={cardStyle}
        >
          <div style={iconStyle}>🛠️</div>

          <h2 style={titleStyle}>
            Services
          </h2>

          <p style={descriptionStyle}>
            Manage the services displayed on your portfolio.
          </p>
        </Link>

        {/* MEDIA */}

        <Link
          to="/media"
          style={cardStyle}
        >
          <div style={iconStyle}>🖼️</div>

          <h2 style={titleStyle}>
            Media
          </h2>

          <p style={descriptionStyle}>
            Upload and manage portfolio images.
          </p>
        </Link>

        {/* MESSAGES */}

        <Link
          to="/messages"
          style={{
            ...cardStyle,
            border: "2px solid #2563eb",
          }}
        >
          <div style={iconStyle}>📩</div>

          <h2 style={titleStyle}>
            Messages
          </h2>

          <p style={descriptionStyle}>
            View messages received from your portfolio contact form.
          </p>
        </Link>
      </div>

      {/* FOOTER */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "50px auto 0",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        <p>
          © 2026 Dhanashri Gite — Portfolio CMS
        </p>
      </div>
    </div>
  );
}

/* CARD STYLE */

const cardStyle = {
  display: "block",
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  textDecoration: "none",
  color: "#1e293b",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  transition: "0.2s",
};

/* ICON STYLE */

const iconStyle = {
  fontSize: "35px",
  marginBottom: "15px",
};

/* TITLE STYLE */

const titleStyle = {
  margin: "0 0 10px",
  color: "#2563eb",
};

/* DESCRIPTION STYLE */

const descriptionStyle = {
  margin: 0,
  color: "#64748b",
  lineHeight: "1.6",
};

export default Dashboard;