import React, { useEffect, useState } from 'react';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

const FEATURED_REPOS = [
  'gammarips-mcp',
  'gammarips-engine',
  // Fallbacks if those don't exist yet or to fill the grid
  'evanparra-portfolio',
  'agent-toolkit' 
];

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/eraphaelparra/repos?per_page=100&sort=updated');
        if (!res.ok) throw new Error('Failed to fetch from GitHub');
        
        const data: GitHubRepo[] = await res.json();
        
        // Filter for featured repos first, then fill with others if needed
        let displayRepos = data.filter(repo => FEATURED_REPOS.includes(repo.name));
        
        // If we don't have enough featured repos, add the most recent ones
        if (displayRepos.length < 4) {
          const others = data
            .filter(repo => !FEATURED_REPOS.includes(repo.name))
            .slice(0, 4 - displayRepos.length);
          displayRepos = [...displayRepos, ...others];
        }

        setRepos(displayRepos);
      } catch (err) {
        console.error(err);
        setError('Could not load projects from GitHub.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
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

  if (error) {
    return <div className="text-center text-slate-500 py-10">{error}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {repos.map((repo) => (
        <a 
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
              {repo.name}
            </h3>
            <span className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              <svg className="w-3 h-3 mr-1 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {repo.stargazers_count}
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
            {repo.description || 'No description provided.'}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500">
              {repo.language}
            </span>
            <div className="flex gap-2">
              {repo.topics.slice(0, 3).map((topic) => (
                <span key={topic} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium uppercase tracking-wide">
                  {topic}
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
