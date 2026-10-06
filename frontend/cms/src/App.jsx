import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Blogs from "./pages/Blogs";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Media from "./pages/Media";
import Messages from "./pages/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/skills"
          element={<Skills />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/experience"
          element={<Experience />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/testimonials"
          element={<Testimonials />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/media"
          element={<Media />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;