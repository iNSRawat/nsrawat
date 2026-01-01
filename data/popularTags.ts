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
    bgColor: 'bg-orange-600',
  },
  {
    href: '/tags/matplotlib',
    iconType: 'Matplotlib',
    slug: 'matplotlib',
    title: 'matplotlib',
    bgColor: 'bg-indigo-600',
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
    href: '/tags/scikit-learn',
    iconType: 'ScikitLearn',
    slug: 'scikit-learn',
    title: 'Scikit-learn',
    bgColor: 'bg-green-600',
  },
];

export default popularTags;
