import siteMetadata from '@/data/siteMetadata';
import Twemoji from '@/components/ui/Twemoji';

import { Briefcase, MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';

const ProfileCardInfo = () => {
  return (
    <div className="p-3">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{siteMetadata.fullName}</h3>
      <h5 className="text-gray-700 dark:text-gray-400">Learner | Builder</h5>
      <div className="mb-2 mt-2 space-y-3">
        <div className="flex items-center">
          <Briefcase size={20} strokeWidth={1} />
          <p className="px-2 text-sm text-gray-700 dark:text-gray-300">Data Scientist & ML Enthusiast</p>
        </div>
        <div className="flex items-center">
          <MapPin name="map-pin" size={20} strokeWidth={1} />
          <p className="px-2 text-sm text-gray-700 dark:text-gray-300">
            Delhi NCR, <Twemoji emoji="india-india-flag" />
          </p>
        </div>
        <div className="flex items-center">
          <Mail size={20} strokeWidth={1} />
          <p className="px-2">
            <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            target="_blank"
            href={siteMetadata.github}
            rel="noreferrer"
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-github"
          >
            <Github size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.github}</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.linkedin}
            rel="noreferrer"
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-linkedin"
          >
            <Linkedin size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.linkedin}</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.twitter}
            rel="noreferrer"
            className="flex items-center text-sm hover:underline"
            data-umami-event="profile-card-twitter"
          >
            <Twitter size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.x}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardInfo;
