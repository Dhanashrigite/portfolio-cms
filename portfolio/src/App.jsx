import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

function App() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);

  // CONTACT FORM
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          aboutRes,
          skillsRes,
          projectsRes,
          experienceRes,
          blogsRes,
          testimonialsRes,
          servicesRes,
        ] = await Promise.all([
          axios.get(`${API}/about/`),
          axios.get(`${API}/skills/`),
          axios.get(`${API}/projects/`),
          axios.get(`${API}/experience/`),
          axios.get(`${API}/blogs/`),
          axios.get(`${API}/testimonials/`),
          axios.get(`${API}/services/`),
        ]);

        setAbout(aboutRes.data[0] || null);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperience(experienceRes.data);
        setBlogs(blogsRes.data);
        setTestimonials(testimonialsRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        console.log("API Error:", error);
      }
    };

    fetchData();
  }, []);

  // CONTACT FORM SUBMIT
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setSending(true);

    try {
      await axios.post(`${API}/messages/`, contact);

      alert("Message sent successfully!");

      setContact({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log("Contact Error:", error);

      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <h2>{about?.name || "Dhanashri Gite"}</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#services">Services</a>
          <a href="#blogs">Blogs</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ================= HOME ================= */}

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="small-title">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1>
            Hi, I'm{" "}
            <span>
              {about?.name || "Dhanashri Gite"}
            </span>
          </h1>

          <h2>
            {about?.title ||
              "Computer Science Engineering Student"}
          </h2>

          <p>
            {about?.description ||
              "I am a passionate CSE student interested in Python, Web Development and Full Stack Development."}
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="primary-btn"
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="section">
        <h2>About Me</h2>

        {about ? (
          <div className="card">
            {about.profile_image && (
              <img
                src={`http://127.0.0.1:8000${about.profile_image}`}
                alt={about.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  margin: "0 auto 20px",
                }}
              />
            )}

            <h3>{about.name}</h3>

            <p>{about.description}</p>
          </div>
        ) : (
          <p>No About information available.</p>
        )}
      </section>

      {/* ================= SKILLS ================= */}

      <section id="skills" className="section">
        <h2>My Skills</h2>

        <div className="cards">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                className="card"
                key={skill.id}
              >
                <h3>{skill.name}</h3>

                <p>
                  Level: {skill.level}
                </p>
              </div>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section id="projects" className="section">
        <h2>My Projects</h2>

        <div className="cards">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                className="card"
                key={project.id}
              >
                {project.image && (
                  <img
                    src={`http://127.0.0.1:8000${project.image}`}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  />
                )}

                <h3>{project.title}</h3>

                <p>
                  {project.description}
                </p>

                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "15px",
                    }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No projects added yet.</p>
          )}
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section id="experience" className="section">
        <h2>Experience</h2>

        <div className="cards">
          {experience.length > 0 ? (
            experience.map((item) => (
              <div
                className="card"
                key={item.id}
              >
                <h3>{item.role}</h3>

                <h4>{item.company}</h4>

                <p>
                  {item.description}
                </p>

                <p>
                  {item.start_date} -{" "}
                  {item.current
                    ? "Present"
                    : item.end_date}
                </p>
              </div>
            ))
          ) : (
            <p>No experience added yet.</p>
          )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section id="services" className="section">
        <h2>Services</h2>

        <div className="cards">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                className="card"
                key={service.id}
              >
                <h3>
                  {service.icon}{" "}
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>
              </div>
            ))
          ) : (
            <p>No services added yet.</p>
          )}
        </div>
      </section>

      {/* ================= BLOGS ================= */}

      <section id="blogs" className="section">
        <h2>Blogs</h2>

        <div className="cards">
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.published)
              .map((blog) => (
                <div
                  className="card"
                  key={blog.id}
                >
                  {blog.image && (
                    <img
                      src={`http://127.0.0.1:8000${blog.image}`}
                      alt={blog.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    />
                  )}

                  <h3>{blog.title}</h3>

                  <p>
                    {blog.content}
                  </p>
                </div>
              ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="section">
        <h2>Testimonials</h2>

        <div className="cards">
          {testimonials.length > 0 ? (
            testimonials.map((item) => (
              <div
                className="card"
                key={item.id}
              >
                <h3>{item.name}</h3>

                <p>
                  {item.message}
                </p>

                <strong>
                  {item.role}
                </strong>
              </div>
            ))
          ) : (
            <p>
              No testimonials available.
            </p>
          )}
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="section contact"
      >
        <h2>Contact Me</h2>

        <p>
          Interested in working together or
          discussing a project?
        </p>

        <form
          onSubmit={handleContactSubmit}
          style={{
            maxWidth: "600px",
            margin: "30px auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {/* NAME */}

          <input
            type="text"
            placeholder="Your Name"
            value={contact.name}
            onChange={(e) =>
              setContact({
                ...contact,
                name: e.target.value,
              })
            }
            required
            style={{
              padding: "13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: "16px",
            }}
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={(e) =>
              setContact({
                ...contact,
                email: e.target.value,
              })
            }
            required
            style={{
              padding: "13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: "16px",
            }}
          />

          {/* SUBJECT */}

          <input
            type="text"
            placeholder="Subject"
            value={contact.subject}
            onChange={(e) =>
              setContact({
                ...contact,
                subject: e.target.value,
              })
            }
            style={{
              padding: "13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: "16px",
            }}
          />

          {/* MESSAGE */}

          <textarea
            placeholder="Your Message"
            rows="6"
            value={contact.message}
            onChange={(e) =>
              setContact({
                ...contact,
                message: e.target.value,
              })
            }
            required
            style={{
              padding: "13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={sending}
            style={{
              padding: "13px",
              border: "none",
              borderRadius: "7px",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: sending
                ? "not-allowed"
                : "pointer",
            }}
          >
            {sending
              ? "Sending..."
              : "Send Message"}
          </button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <p>
          © 2026 Dhanashri Gite. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
