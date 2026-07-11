import MinimalHeader from '../../sections/frontend/MinimalHeader';
import FrontendExperience from '../../sections/frontend/FrontendExperience';
import FrontendProjects from '../../sections/frontend/FrontendProjects';
import FrontendEducation from '../../sections/frontend/FrontendEducation';
import FrontendSkills from '../../sections/frontend/FrontendSkills';

export default function FrontendHome() {
  return (
    <div className="flex flex-col">
      <MinimalHeader />
      <FrontendExperience />
      <FrontendProjects />
      <FrontendSkills />
      <FrontendEducation />
      
      <footer className="mt-20 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between text-[14px] text-black/50">
        <p>© {new Date().getFullYear()} Sanket Das. All rights reserved.</p>
        <p>Built with React & Tailwind</p>
      </footer>
    </div>
  );
}
