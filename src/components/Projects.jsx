import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import client from "../sanityClient"; // Make sure this uses `createClient`

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="projects"
      className="w-full bg-white text-gray-900 px-6 py-20"
    >
      <h2 className="text-3xl font-bold text-center text-medcsblue mb-12">
        Projects
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-medcsblue mb-2">
              {project.title}
            </h3>
            <p className="text-gray-800 mb-3">{project.description}</p>

            <ul className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
              {project.tags?.map((tag, i) => (
                <li
                  key={i}
                  className="bg-medcsblue text-white px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-medcsblue hover:text-blue-700 transition"
                aria-label="View Project"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
