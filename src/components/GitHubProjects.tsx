import React, { useEffect, useState } from 'react';
import { getFeaturedProjects, type Project } from '../lib/firestore';

const GitHubProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects from Firestore:", err);
        setError('Could not load projects. System might be syncing.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-xl border border-slate-200"></div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
        <p className="text-slate-500 font-mono text-sm">
          [System] Portfolio cache empty. Waiting for next sync cycle...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-slate-500 py-10">{error}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <a 
          key={project.id}
          href={project.githubUrl || project.liveUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            {/* Optional: Add star count if available in Project interface */}
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
            {project.description || 'No description provided.'}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <div className="flex gap-2 flex-wrap">
              {project.technologies?.slice(0, 3).map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium uppercase tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GitHubProjects;