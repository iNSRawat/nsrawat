type BrandIconType =
  | 'Bash'
  | 'Git'
  | 'GitHub'
  | 'Javascript'
  | 'Typescript'
  | 'React'
  | 'NextJS'
  | 'Node'
  | 'Vercel'
  | 'Railway'
  | 'Spotify'
  | 'Docker'
  | 'Postgres'
  | 'Mongodb'
  | 'Python'
  | 'SQL'
  | 'Matplotlib'
  | 'NumPy'
  | 'Pandas'
  | 'Seaborn'
  | 'Plotly'
  | 'ScikitLearn'
  | 'TensorFlow'
  | 'PyTorch'
  | 'PowerBI'
  | 'Jupyter'
  | 'Tableau'
  | 'Anaconda'
  | 'PyCharm'
  | 'Remix'
  | 'Umami'
  | 'Markdown'
  | 'NestJS'
  | 'TailwindCSS';

const BrandIcon = (props: { type: BrandIconType; className?: string }) => {
  const { type, className } = props;

  const iconPath = `/static/icons/${type.toLowerCase()}.svg`;

  return (
    <img
      src={iconPath}
      alt={`${type} icon`}
      className={className || 'h-16 w-16 lg:h-14 lg:w-14 xl:h-20 xl:w-20'}
      style={{ fill: 'currentColor' }}
    />
  );
};

export default BrandIcon;
