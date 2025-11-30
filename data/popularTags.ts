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
    iconType: 'Python',
    slug: 'python',
    title: 'Python',
    bgColor: 'bg-blue-600',
  },
  {
    href: '/tags/sql',
    iconType: 'SQL',
    slug: 'sql',
    title: 'SQL',
    bgColor: 'bg-blue-500',
  },
  {
    href: '/tags/matplotlib',
    iconType: 'Matplotlib',
    slug: 'matplotlib',
    title: 'matplotlib',
    bgColor: 'bg-blue-500',
  },
  {
    href: '/tags/numpy',
    iconType: 'NumPy',
    slug: 'numpy',
    title: 'NumPy',
    bgColor: 'bg-blue-700',
  },
  {
    href: '/tags/pandas',
    iconType: 'Pandas',
    slug: 'pandas',
    title: 'pandas',
    bgColor: 'bg-purple-700',
  },
  {
    href: '/tags/seaborn',
    iconType: 'Seaborn',
    slug: 'seaborn',
    title: 'Seaborn',
    bgColor: 'bg-blue-500',
  },
  {
    href: '/tags/plotly',
    iconType: 'Plotly',
    slug: 'plotly',
    title: 'Plotly',
    bgColor: 'bg-blue-700',
  },
  {
    href: '/tags/database',
    iconType: 'Mongodb',
    slug: 'database',
    title: 'Database',
    bgColor: 'bg-green-600',
  },
  {
    href: '/tags/devops',
    iconType: 'Docker',
    slug: 'devops',
    title: 'Devops',
    bgColor: 'bg-cyan-500',
  },
];

export default popularTags;
