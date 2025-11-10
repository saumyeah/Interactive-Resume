import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./ResumePage.css";

const resumeData = {
  personalInfo: {
    name: "Saumya Singh",
    location: "Dehradun, Uttarakhand",
    email: "saumya2802003@gmail.com",
    phone: "+91-8303458084",
    linkedin: "saumyasingh28022003",
    github: "saumyeah"
  },
  education: [
    {
      institution: "Dehradun Institute of Technology",
      degree: "B.Tech in Computer Science and Engineering",
      duration: "2022–2026",
      additional: "CGPA: 7.77/10"
    },
    {
      institution: "City Montessori School, Lucknow, Uttar Pradesh",
      degree: "Class XII",
      duration: "2018-2020",
      additional: "Percentage: 91.75"
    },
    {
      institution: "City Montessori School, Lucknow, Uttar Pradesh",
      degree: "Class X",
      duration: "2016-2018",
      additional: "Percentage: 93.6"
    }
  ],
  achievements: [
    "Strengthened algorithmic problem-solving and optimization skills by successfully solving over 400 coding challenges across various online platforms."
  ],
  relevantCoursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Database Management System"
  ],
  projects: [
    {
      title: "Sentiment-Stock Analysis",
      repo: "Github repository",
      repoLink: "https://github.com/saumyeah/sentiment-stock-analysis",
      description: [
        "Engineered an automated data pipeline in Python to ingest and process real-time news and stock data from 2 live APIs (NewsAPI, Alpha Vantage), handling over 100 articles daily.",
        "Applied a pre-trained Natural Language Processing (NLP) model (VADER) to perform real-time sentiment analysis on news headlines, converting unstructured text into a quantifiable sentiment score from -1.0 to +1.0.",
        "Developed and deployed a data visualization dashboard using Streamlit and Plotly to analyze the correlation between 2 time-series datasets (stock price vs. sentiment), providing actionable insights."
      ],
      techStack: [
        "VS Code", "Python", "Pandas", "VADER",
        "Plotly", "Streamlit", "Streamlit Community Cloud",
        "Git", "Github", "External APIs"
      ]
    },
    {
      title: "Study Application",
      repo: "Github repository",
      repoLink: "https://github.com/saumyeah/study-application",
      description: [
        "Engineered a multi-feature productivity dashboard using vanilla JavaScript to manipulate the DOM, manage application state, and implement the Local Storage API for persistent user tasks and notes across browser sessions.",
        "Created a responsive, retro-themed user experience (UX) using pure CSS Grid, featuring an interactive digital pet that provides positive reinforcement based on user productivity to enhance motivation."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Google Fonts", "VS Code", "Web Browser(Chrome)"]
    },
    {
      title: "Database Query Cache Simulator",
      repo: "Github repository",
      repoLink: "https://github.com/saumyeah/database-query-cache-simulator",
      description: [
        "Devised a high-performance LRU (Least Recently Used) Cache from scratch in Java, combining a HashMap and a Doubly Linked List to achieve optimal O(1) time complexity for all data access and eviction operations.",
        "Designed and implemented a caching layer that demonstrated a >99% reduction in query response time for cached data by serving results from memory, effectively simulating how to mitigate slow database performance."
      ],
      techStack: ["JDK", "Git", "Github", "VS Code", "Command Line"]
    }
  ],
  technicalSkills: {
    Languages: ["Java", "Python", "R", "SQL", "JavaScript"],
    Frameworks_Libraries: ["React.js", "Pandas", "Scikit-Learn", "NLTK (VADER)", "Streamlit"],
    DeveloperTools: ["Git", "GitHub", "VS Code", "MySQL"],
    Cloud_Deployment: ["Streamlit Community Cloud"]
  }
};

function ResumePage() {
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allSkills = useMemo(() => {
    let skillsSet = new Set();
    resumeData.projects.forEach(p => {
      p.techStack.forEach(s => skillsSet.add(s));
    });
    return Array.from(skillsSet).sort();
  }, []);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(proj => {
      const skillMatch = selectedSkills.length === 0 || proj.techStack.some(s => selectedSkills.includes(s));
      const query = searchQuery.toLowerCase();
      const searchMatch =
        proj.title.toLowerCase().includes(query) ||
        proj.description.some(d => d.toLowerCase().includes(query)) ||
        proj.techStack.some(s => s.toLowerCase().includes(query));
      return skillMatch && searchMatch;
    });
  }, [selectedSkills, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleDownload = () => {
    const element = document.getElementById("resume-content");
    if (element) {
      const options = {
        margin: 0.3,
        filename: `${resumeData.personalInfo.name}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };
      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div className="resume-container">
      <header className="resume-header">
        <div className="resume-header-info">
          <h1>{resumeData.personalInfo.name}</h1>
          <p>
            {resumeData.personalInfo.location} |{" "}
            <a href={`mailto:${resumeData.personalInfo.email}`} target="_blank" rel="noopener noreferrer">
              {resumeData.personalInfo.email}
            </a>{" "}
            | {resumeData.personalInfo.phone}
          </p>
          <p>
            LinkedIn:{" "}
            <a href={`https://www.linkedin.com/in/${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
              {resumeData.personalInfo.linkedin}
            </a>{" "}
            | Github:{" "}
            <a href={`https://github.com/${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer">
              {resumeData.personalInfo.github}
            </a>
          </p>
        </div>
        <div className="button-group">
          <button onClick={handleDownload} className="download-button">
            Download 
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log out
          </button>
        </div>
      </header>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search projects by title, description, skills..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="skill-filters">
          {allSkills.map(skill => (
            <button
              key={skill}
              className={`skill-chip ${selectedSkills.includes(skill) ? "selected" : ""}`}
              onClick={() => toggleSkill(skill)}
              type="button"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <main id="resume-content" className="resume-main">

        <section className="resume-section">
          <h3>Education</h3>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="education-item">
              <h4>{edu.institution}</h4>
              <p>{edu.degree} ({edu.duration})</p>
              <p>{edu.additional}</p>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h3>Achievements</h3>
          <ul>
            {resumeData.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h3>Relevant Coursework</h3>
          <ul>
            {resumeData.relevantCoursework.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h3>Projects</h3>
          {filteredProjects.map((proj, i) => (
            <div key={i} className="project-item">
              <h4>
                {proj.title}{" "}
                <a href={proj.repoLink} target="_blank" rel="noopener noreferrer" className="repo-link">{proj.repo}</a>
              </h4>
              <ul>
                {proj.description.map((desc, j) => (
                  <li key={j}>{desc}</li>
                ))}
              </ul>
              <p><b>Tech Stack:</b> {proj.techStack.join(", ")}</p>
            </div>
          ))}
          {filteredProjects.length === 0 && <p>No matching projects found.</p>}
        </section>

        <section className="resume-section">
          <h3>Technical Skills</h3>
          <ul>
            <li><b>Languages:</b> {resumeData.technicalSkills.Languages.join(", ")}</li>
            <li><b>Frameworks and Libraries:</b> {resumeData.technicalSkills.Frameworks_Libraries.join(", ")}</li>
            <li><b>Developer Tools:</b> {resumeData.technicalSkills.DeveloperTools.join(", ")}</li>
            <li><b>Cloud & Deployment:</b> {resumeData.technicalSkills.Cloud_Deployment.join(", ")}</li>
          </ul>
        </section>

      </main>
    </div>
  );
}

export default ResumePage;
