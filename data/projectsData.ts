import type { Project } from '@/types/data';

const projectsData: Project[] = [
  {
    type: 'work',
    title: 'Customer Churn Prediction - Telecom Industry',
    description:
      'Built a machine learning model to predict customer churn with 89% accuracy using Random Forest and XGBoost algorithms. Analyzed 50K+ customer records to identify key factors driving churn.',
    imgSrc: '/static/images/projects/customer-churn.png',
    url: 'https://github.com/iNSRawat/customer-churn-prediction',
    builtWith: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'XGBoost'],
  },
  {
    type: 'work',
    title: 'Sales Forecasting Dashboard - Power BI',
    description:
      'Created an interactive Power BI dashboard for sales forecasting using time series analysis. Implemented ARIMA and Prophet models to predict quarterly sales trends with 92% accuracy.',
    imgSrc: '/static/images/projects/sales-dashboard.png',
    url: 'https://github.com/iNSRawat/sales-forecasting-dashboard',
    builtWith: ['Power BI', 'Python', 'SQL', 'DAX', 'Time Series'],
  },
  {
    type: 'work',
    title: 'Sentiment Analysis - Social Media Data',
    description:
      'Developed a natural language processing model to analyze customer sentiment from social media posts. Processed 100K+ tweets using BERT and achieved 87% accuracy in sentiment classification.',
    imgSrc: '/static/images/projects/sentiment-analysis.png',
    url: 'https://github.com/iNSRawat/sentiment-analysis',
    builtWith: ['Python', 'BERT', 'NLP', 'TensorFlow', 'Twitter API'],
  },
  {
    type: 'self',
    title: 'Credit Risk Assessment Model',
    description:
      'Built a comprehensive credit scoring model using logistic regression and neural networks. Implemented feature engineering techniques to improve model performance by 15%.',
    imgSrc: '/static/images/projects/credit-risk.png',
    url: 'https://github.com/iNSRawat/credit-risk-assessment',
    builtWith: ['Python', 'Scikit-learn', 'Keras', 'Pandas', 'NumPy'],
  },
  {
    type: 'self',
    title: 'E-commerce Recommendation System',
    description:
      'Designed and implemented a collaborative filtering recommendation engine for an e-commerce platform. Increased user engagement by 25% and average order value by 18%.',
    imgSrc: '/static/images/projects/recommendation-system.png',
    url: 'https://github.com/iNSRawat/recommendation-engine',
    builtWith: ['Python', 'Surprise', 'Collaborative Filtering', 'Flask', 'SQL'],
  },
  {
    type: 'self',
    title: 'Image Classification - Deep Learning',
    description:
      'Trained a convolutional neural network (CNN) for multi-class image classification achieving 94% accuracy. Used transfer learning with ResNet50 and data augmentation techniques.',
    imgSrc: '/static/images/projects/image-classification.png',
    url: 'https://github.com/iNSRawat/image-classification-cnn',
    builtWith: ['Python', 'TensorFlow', 'Keras', 'CNN', 'ResNet50'],
  },
];

export default projectsData;
