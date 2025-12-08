import { genPageMetadata } from 'app/seo';

import projectsData from '@/data/projectsData';
import { fetchRepoData } from '@/servers/github.server';
import ProjectCard from '@/components/project/ProjectCard';

export const metadata = genPageMetadata({ title: 'Projects' });

export default async function Projects() {
  await Promise.all(
    projectsData.map(async (p) => {
      if (p.repo && typeof p.repo === 'string') {
        p.repo = await fetchRepoData(p.repo as string);
      }
    })
  );

  const description = 'My open-source side projects and stuff that I built with my colleagues at work';

  const workProjects = projectsData.filter(({ type }) => type === 'work');
  const sideProjects = projectsData.filter(({ type }) => type === 'self');

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header Section */}
      <div className="space-y-2 px-2 pb-8 pt-6 sm:px-0 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-tight lg:text-6xl">
          Projects
        </h1>
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">{description}</p>
      </div>

      {/* Work Projects Section */}
      <div className="py-8 sm:py-12">
        <h3 className="mb-6 px-2 text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:px-0 sm:text-2xl md:text-3xl">
          Work Projects
        </h3>
        <div className="-mx-2 flex flex-wrap sm:-mx-4">
          {workProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      {/* Side Projects Section */}
      <div className="py-8 sm:py-12">
        <h3 className="mb-6 px-2 text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:px-0 sm:text-2xl md:text-3xl">
          Side Projects
        </h3>
        <div className="-mx-2 flex flex-wrap sm:-mx-4">
          {sideProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
