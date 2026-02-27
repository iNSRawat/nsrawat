import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "recipe-site-traffic-prediction",
    title: "Recipe Site Traffic Prediction",
    period: {
      start: "2026",
    },
    repoUrl: "https://github.com/iNSRawat/recipe-site-traffic-prediction",
    demoUrl: "https://recipe-site-traffic-prediction.streamlit.app/",
    skills: [
      "Data Science",
      "Python",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "Streamlit",
    ],
    description: `Problem: A recipe site needed to predict which recipes would drive high traffic to optimize homepage content placement.
- Approach: Built classification models (Logistic Regression, Random Forest, XGBoost) on recipe attributes like category, servings, and nutritional data
- Result: Achieved 81% precision on high-traffic predictions, exceeding the 80% business target. Live interactive demo on Streamlit`,
    logo: "/static/images/projects/recipe-site-traffic.png",
    isExpanded: true,
  },
  {
    id: "customer-behavior-prediction",
    title: "Customer Behavior Prediction - E-commerce Dataset Churn Predictor",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/customer-behavior-prediction",
    demoUrl: "https://customer-behavior-prediction.streamlit.app/",
    skills: [
      "Data Science",
      "Python",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "Data Analysis",
    ],
    description: `Problem: E-commerce businesses lose revenue from customer churn, but lack early identification of at-risk users.
- Approach: End-to-end ML pipeline with EDA, feature engineering (RFM analysis, behavioral signals), and model comparison across Logistic Regression, Decision Tree, and Random Forest
- Result: Built a churn predictor that helps segment high-risk customers for targeted retention campaigns. Live demo on Streamlit`,
    logo: "/static/images/projects/customer-behavior.png",
  },
  {
    id: "data-cleaning-visualization",
    title:
      "Data Cleaning & Visualization, ETL Pipeline for Google Analytics Data",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/data-cleaning-visualization",
    demoUrl:
      "https://huggingface.co/spaces/nsrawat/data-cleaning-visualization",
    skills: [
      "Data Science",
      "Python",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
    ],
    description: `Problem: Raw Google Analytics exports contain missing values, inconsistent formats, and noisy data — making analysis unreliable.
- Approach: Built a full ETL pipeline handling null imputation, type casting, outlier detection, and automated visual reporting with Matplotlib and Seaborn
- Result: Transformed messy GA data into clean, analysis-ready datasets with 15+ automated visualizations. Deployed on Hugging Face Spaces`,
    logo: "/static/images/projects/data-cleaning.png",
  },
  {
    id: "marketing-analytics-dashboard",
    title: "Marketing Analytics Dashboard - Automated KPI Tracking",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/marketing-analytics-dashboard",
    demoUrl: "https://marketing-analytics-dashboard.streamlit.app/",
    skills: [
      "Data Science",
      "Python",
      "SQL",
      "Analytics",
      "Business Intelligence",
      "Dashboard",
    ],
    description: `Problem: Marketing teams manually track campaign KPIs across spreadsheets, leading to delayed reporting and missed optimization opportunities.
- Approach: Built an interactive Streamlit dashboard with SQL-powered data aggregation, real-time filtering by campaign/channel, and automated ROI calculations
- Result: Dashboard consolidates key marketing metrics (CTR, CPA, ROAS) into a single view, reducing manual reporting time. Live demo available`,
    logo: "/static/images/projects/marketing-analytics.png",
  },
  {
    id: "supermarket-loyalty-prediction",
    title: "Supermarket Loyalty Prediction",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/supermarket-loyalty-prediction",
    demoUrl:
      "https://github.com/iNSRawat/supermarket-loyalty-prediction/blob/main/workspace/notebook.ipynb",
    skills: [
      "Data Science",
      "Python",
      "Pandas",
      "Scikit-learn",
      "Feature Engineering",
      "DataCamp",
    ],
    description: `Problem: Supermarket loyalty programs lack data-driven spending predictions to personalize customer offers effectively.
- Approach: DataCamp Associate Practical Exam project — applied advanced feature engineering on retail transaction data, compared multiple regression models
- Result: Delivered a predictive model for customer spending patterns with actionable insights for loyalty program optimization`,
    logo: "/static/images/projects/supermarket-loyalty.png",
  },
  {
    id: "house-price-prediction",
    title: "House Sale Price Prediction",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/predicting-house-sale-prices",
    demoUrl:
      "https://github.com/iNSRawat/predicting-house-sale-prices/blob/main/workspace/notebook.ipynb",
    skills: [
      "Data Science",
      "Python",
      "Pandas",
      "Scikit-learn",
      "Regression Models",
      "Data Analysis",
    ],
    description: `Problem: Real estate teams rely on intuition for pricing, often leading to overpriced or undervalued listings.
- Approach: Explored 80+ features from residential property data, performed correlation analysis and feature selection, then trained Ridge and Lasso regression models
- Result: Built a price prediction model that helps agents set data-informed listing prices, reducing pricing guesswork`,
    logo: "/static/images/projects/house-price-prediction.png",
  },
  {
    id: "mathematics-formulas",
    title: "Mathematics for Data Science",
    period: {
      start: "2025",
    },
    repoUrl:
      "https://github.com/iNSRawat/Mathematics-Formulas-for-Data-Science-Machine-Learning",
    demoUrl:
      "https://insrawat.github.io/Mathematics-Formulas-for-Data-Science-Machine-Learning/",
    skills: [
      "Mathematics",
      "Data Science",
      "Machine Learning",
      "Educational",
      "Reference",
    ],
    description: `Problem: Data science learners often struggle to find a single, organized reference for the math behind ML algorithms.
- Approach: Curated and organized essential formulas across linear algebra, calculus, probability, and statistics with clear explanations and Python implementations
- Result: Open-source reference guide with 50+ formulas, deployed as a searchable static site on GitHub Pages`,
    logo: "/static/images/projects/mathematics-formulas.png",
  },
  {
    id: "portfolio-blog",
    title: "Personal Portfolio & Blog",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/nsrawat",
    demoUrl: "https://nsrawat.in",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel", "MDX"],
    description: `A developer portfolio and blog built with Next.js 16, Tailwind CSS v4, and shadcn/ui.
- Features: Dark mode, MDX blog with syntax highlighting, component registry, GitHub contribution graph, SEO optimization, and analytics
- Deployed on Vercel with perfect Lighthouse scores in performance and accessibility`,
    logo: "/static/images/projects/NSRawat-blog.png",
  },
  {
    id: "zenith-ai",
    title: "Zenith - AI Meditation & Chat",
    period: {
      start: "2025",
    },
    repoUrl: "https://github.com/iNSRawat/Zenith---AI-Meditation-Chat",
    skills: ["React", "TypeScript", "AI/LLM", "Chat API", "Full Stack"],
    description: `Problem: Most meditation apps lack personalized, conversational guidance that adapts to user mood and preferences.
- Approach: Built a full-stack React + TypeScript app integrating LLM-powered chat for real-time, context-aware meditation coaching
- Result: Delivers personalized meditation sessions with natural conversation flow and real-time AI responses`,
    logo: "/static/images/projects/zenith-ai.png",
  },
];
