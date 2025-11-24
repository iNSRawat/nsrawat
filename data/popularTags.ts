import { BrandIconType } from '@/components/ui/BrandIcon';

type PopularTag = {
  href: string;
  iconType: BrandIconType; // Must match your available icon keys
  slug: string;
  title: string;
    bgColor: string;
};

const popularTags: PopularTag[] = [
  {
    href: '/tags/python',
    iconType: 'Python', // Make sure 'Python' icon exists!
    slug: 'python',
    title: 'Python',    bgColor: 'bg-yellow-500'
  },
  {
    href: '/tags/sql',
    iconType: 'SQL', // Ensure an 'SQL' icon exists
    slug: 'sql',
    title: 'SQL',,
    bgColor: 'bg-blue-500'
  },
  {
    href: '/tags/matplotlib',
    iconType: 'Matplotlib', // Ensure an 'Matplotlib' icon exists
    slug: 'matplotlib',
    title: 'matplotlib',,
    bgColor: 'bg-purple-500'
  },
  {
    href: '/tags/numpy',
    iconType: 'NumPy', // Use lowercase 'numpy' for slug
    slug: 'numpy',
    title: 'NumPy',,
    bgColor: 'bg-gray-600'
  },
  {
    href: '/tags/database',
    iconType: 'Mongodb', // Already included and matches your icon set
    slug: 'database',
    title: 'Database',,
    bgColor: 'bg-green-600'
  },
  {
    href: '/tags/devops',
    iconType: 'Docker',
    slug: 'devops',
    title: 'Devops',,
    bgColor: 'bg-cyan-500'
  },
];

export default popularTags;
