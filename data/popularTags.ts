import { BrandIconType } from '@/components/ui/BrandIcon';

type PopularTag = {
  href: string;
  iconType: BrandIconType; // Must match your available icon keys
  slug: string;
  title: string;
};

const popularTags: PopularTag[] = [
  {
    href: '/tags/python',
    iconType: 'Python', // Make sure 'Python' icon exists!
    slug: 'python',
    title: 'Python',
  },
  {
    href: '/tags/sql',
    iconType: 'SQL', // Ensure an 'SQL' icon exists
    slug: 'sql',
    title: 'SQL',
  },
  {
    href: '/tags/matplotlib',
    iconType: 'Matplotlib', // Ensure an 'Matplotlib' icon exists
    slug: 'matplotlib',
    title: 'matplotlib',
  },
  {
    href: '/tags/numpy',
    iconType: 'NumPy', // Use lowercase 'numpy' for slug
    slug: 'numpy',
    title: 'NumPy',
  },
  {
    href: '/tags/database',
    iconType: 'Mongodb', // Already included and matches your icon set
    slug: 'database',
    title: 'Database',
  },
  {
    href: '/tags/devops',
    iconType: 'Docker',
    slug: 'devops',
    title: 'Devops',
  },
];

export default popularTags;
