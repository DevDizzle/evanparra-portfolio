import React from 'react';
import type { Project } from '../lib/firestore';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <a 
          key={project.id}
          href={project.githubUrl || project.liveUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-slate-50 rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <i className="fa-brands fa-github text-2xl text-slate-400 group-hover:text-slate-900 transition-colors"></i>
          </div>
          
          <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-white text-slate-600 text-sm font-medium rounded-full border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
