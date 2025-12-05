import type { Project } from '@/types/data';

const projectsData: Project[] = [
  {
    type: 'work',
    title: 'Customer Behavior Prediction',
    description: 'Real-world data science project featuring customer behavior prediction with advanced machine learning algorithms. Complete dataset and implementation with end-to-end analysis pipeline.',
    imgSrc: '/static/images/projects/customer-behavior.png',
    url: 'https://github.com/iNSRawat/data-science-analytics-projects',
    builtWith: ['Python', 'Pandas', 'Scikit-learn', 'Data Analysis', 'ML'],
  },
  {
    type: 'work',
    title: 'Data Cleaning & Visualization',
    description: 'Comprehensive data cleaning and visualization project demonstrating ETL pipelines, data quality assessment, and stunning visual insights. Perfect for understanding data preparation workflows.',
    imgSrc: '/static/images/projects/data-cleaning.png',
    url: 'https://github.com/iNSRawat/data-science-analytics-projects',
    builtWith: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Visualization'],
  },
  {
    type: 'work',
    title: 'Marketing Analytics Dashboard',
    description: 'Interactive marketing analytics dashboard showcasing campaign performance, ROI analysis, and customer insights. Complete with real-world datasets and implementation examples.',
    imgSrc: '/static/images/projects/marketing-analytics.png',
    url: 'https://github.com/iNSRawat/data-science-analytics-projects',
    builtWith: ['Python', 'SQL', 'Analytics', 'Business Intelligence', 'Dashboard'],
  },
  {
    type: 'self',
    title: 'Zenith - AI Meditation & Chat',
    description: 'Full-stack web application combining AI-powered meditation guidance with intelligent chat capabilities. Built with modern web technologies for seamless user experience and real-time interactions.',
    imgSrc: '/static/images/projects/zenith-ai.png',
    url: 'https://github.com/iNSRawat/Zenith---AI-Meditation-Chat',
    builtWith: ['React', 'TypeScript', 'AI/LLM', 'Chat API', 'Meditation Tech'],
  },
  {
    type: 'self',
    title: 'Mathematics Formulas for Data Science',
    description: 'Comprehensive collection of essential mathematics formulas for data science and machine learning. Complete reference guide with implementations and practical examples for every concept.',
    imgSrc: '/static/images/projects/mathematics-formulas.png',
    url: 'https://github.com/iNSRawat/Mathematics-Formulas-for-Data-Science-Machine-Learning',
    builtWith: ['Mathematics', 'Data Science', 'Machine Learning', 'Educational', 'Reference'],
  },
    {
    type: 'self',
    title: 'Supermarket Loyalty Prediction',
    description: 'DataCamp Data Scientist Associate Practical Exam project predicting customer spending in supermarket loyalty programs. Advanced feature engineering and predictive modeling with real-world retail data.',
    imgSrc: '/static/images/projects/supermarket-loyalty.png',
    url: 'https://github.com/iNSRawat/supermarket-loyalty-prediction',
    builtWith: ['Python', 'Pandas', 'Scikit-learn', 'Feature Engineering', 'DataCamp'],
  }
];

export default projectsData;
