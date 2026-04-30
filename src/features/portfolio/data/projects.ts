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
    duration: "4 Weeks",
    role: "Data Scientist",
    teamSize: "Solo",
    category: "Machine Learning",
    overview: `This project was developed for a recipe website that wanted to predict which recipes would be highly popular, so they could feature them prominently on their homepage. 

The dataset contained thousands of recipes with nutritional facts (calories, protein, sugar, etc.), category labels (e.g. Beverages, Breakfast, Meat), and servings. The goal was to build a classification model to predict whether a recipe would lead to high traffic, exceeding an 80% precision target.`,
    keyFeatures: `- **Exploratory Data Analysis**: Deep dive into nutritional correlations with traffic.
- **Data Preprocessing**: Handling missing values, encoding categorical variables, and scaling numerical features.
- **Model Training**: Evaluated Logistic Regression, Decision Trees, and Random Forest classifiers.
- **Hyperparameter Tuning**: Used GridSearchCV to optimize the Random Forest model.
- **Interactive Dashboard**: Deployed the model via a Streamlit web app for real-time predictions.`,
    keyChallenges: `- **Imbalanced Data**: The dataset had class imbalances that required careful threshold tuning.
- **Missing Nutritional Data**: Imputed missing values using median strategies based on recipe categories to prevent data leakage.`,
    keyLearnings: `- Advanced feature engineering techniques for tabular data.
- Deploying machine learning models via Streamlit for non-technical stakeholders.
- Optimizing precision over recall to meet specific business KPIs.`,
    status: "Completed",
    whyIBuiltThis: `I wanted a robust end-to-end machine learning project that went beyond the notebook. This allowed me to explore advanced feature engineering while giving stakeholders a real tool to interact with via Streamlit.`,
  },
  {
    id: "customer-behavior-prediction",
    title: "Customer Behavior Prediction - E-commerce Dataset Churn Predictor",
    period: { start: "2025" },
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
    duration: "3 Weeks",
    role: "Data Scientist",
    teamSize: "Solo",
    category: "Machine Learning",
    overview: `This project tackles customer churn in e-commerce by predicting which users are at risk of leaving the platform. Identifying these users early allows businesses to launch targeted retention campaigns and save revenue. The project explores customer transaction data and behavioral signals to build a predictive model.`,
    keyFeatures: `- **RFM Analysis**: Engineered Recency, Frequency, and Monetary metrics from raw transaction data.
- **Behavioral Signals**: Extracted features based on user interaction patterns.
- **Model Pipeline**: Compared Logistic Regression, Decision Trees, and Random Forests.
- **Interactive App**: Deployed a Streamlit interface for live churn prediction.`,
    keyChallenges: `- **Feature Engineering**: Creating meaningful metrics from raw event data.
- **Imbalanced Classes**: Handling the natural imbalance between retained and churned users.`,
    keyLearnings: `- Deriving business value from raw transaction logs using RFM analysis.
- The importance of interpretable models when advising marketing teams on retention strategies.`,
    status: "Completed",
    whyIBuiltThis: `I wanted to build a project with direct business impact. Churn prediction is a classic and highly valuable industry problem, allowing me to focus heavily on feature engineering rather than just model building.`,
  },
  {
    id: "data-cleaning-visualization",
    title:
      "Data Cleaning & Visualization, ETL Pipeline for Google Analytics Data",
    period: { start: "2025" },
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
    duration: "2 Weeks",
    role: "Data Engineer / Analyst",
    teamSize: "Solo",
    category: "Data Engineering",
    overview: `A robust ETL (Extract, Transform, Load) pipeline designed to process raw, messy Google Analytics exports. It automatically handles null values, corrects data types, removes outliers, and generates comprehensive visual reports to make the data analysis-ready.`,
    keyFeatures: `- **Automated Cleaning**: Scripts to impute missing values and cast inconsistent data types.
- **Outlier Detection**: Statistical methods to identify and handle anomalies in traffic data.
- **Visual Reporting**: Generates 15+ automated visualizations using Matplotlib and Seaborn.
- **Cloud Deployment**: Accessible via Hugging Face Spaces.`,
    keyChallenges: `- **Data Inconsistency**: Handling the unpredictable format variations in raw GA exports.
- **Automation**: Designing a pipeline robust enough to run without human intervention on new data.`,
    keyLearnings: `- Mastering Pandas for complex data wrangling and ETL workflows.
- Building automated visualization pipelines that tell a consistent story regardless of the input data shape.`,
    status: "Completed",
    whyIBuiltThis: `Data cleaning is often 80% of a data scientist's job. I built this tool to automate the most tedious parts of web analytics preprocessing, turning a manual chore into a streamlined pipeline.`,
  },
  {
    id: "marketing-analytics-dashboard",
    title: "Marketing Analytics Dashboard - Automated KPI Tracking",
    period: { start: "2025" },
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
    duration: "3 Weeks",
    role: "BI Developer",
    teamSize: "Solo",
    category: "Business Intelligence",
    overview: `An interactive Business Intelligence dashboard designed to eliminate manual spreadsheet reporting for marketing teams. It aggregates campaign data via SQL, calculates critical metrics like ROAS and CPA, and provides real-time filtering to uncover optimization opportunities.`,
    keyFeatures: `- **SQL Integration**: Direct data aggregation from underlying databases.
- **Real-Time Filtering**: Slice data by campaign, channel, and date range dynamically.
- **Automated KPIs**: Instant calculation of Click-Through Rate (CTR), Cost Per Acquisition (CPA), and Return on Ad Spend (ROAS).
- **Interactive UI**: Built with Streamlit for seamless stakeholder usage.`,
    keyChallenges: `- **Complex Aggregations**: Writing efficient SQL queries to calculate accurate ROAS across multiple channels.
- **UI Responsiveness**: Ensuring the Streamlit dashboard updates instantly when filtering large datasets.`,
    keyLearnings: `- Bridging the gap between raw SQL data and interactive frontend visualization.
- Designing BI tools focused on actionable business metrics rather than just data exploration.`,
    status: "Completed",
    whyIBuiltThis: `I wanted to create a practical Business Intelligence solution that solves a real-world problem: reporting fatigue. This project showcases my ability to connect database querying with stakeholder-facing dashboards.`,
  },
  {
    id: "supermarket-loyalty-prediction",
    title: "Supermarket Loyalty Prediction",
    period: { start: "2025" },
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
    duration: "2 Weeks",
    role: "Data Scientist",
    teamSize: "Solo",
    category: "Machine Learning",
    overview: `Developed as part of the DataCamp Associate Practical Exam, this project focuses on predicting customer spending behavior for a supermarket loyalty program. By accurately forecasting future spending, supermarkets can tailor personalized offers to maximize retention and revenue.`,
    keyFeatures: `- **Transaction Analysis**: Deep EDA on retail transaction histories.
- **Advanced Feature Engineering**: Created temporal and categorical features from raw purchase logs.
- **Regression Modeling**: Trained and compared multiple regression models to predict continuous spending values.
- **Actionable Insights**: Provided data-driven recommendations for loyalty program structure.`,
    keyChallenges: `- **Noisy Transaction Data**: Handling returns, missing values, and seasonal anomalies.
- **Model Selection**: Choosing the right regression metric to minimize the financial impact of prediction errors.`,
    keyLearnings: `- Working with strict practical exam constraints to deliver end-to-end data science value.
- Translating continuous regression outputs into concrete business recommendations.`,
    status: "Completed",
    whyIBuiltThis: `This was my practical exam for DataCamp certification. It required demonstrating full-stack data science skills—from data wrangling to machine learning—under a realistic business scenario.`,
  },
  {
    id: "t20-world-cup-2026-predictor",
    title: "T20 World Cup 2026 Match Predictor",
    period: { start: "2026" },
    repoUrl: "https://github.com/iNSRawat/T20-World-Cup-2026-Predictor",
    demoUrl: "https://t20-world-cup-2026-predictors.streamlit.app",
    skills: [
      "Data Science",
      "Python",
      "XGBoost",
      "LightGBM",
      "Machine Learning",
      "Streamlit",
    ],
    description: `Problem: Predict T20 World Cup 2026 match outcomes given two teams, venue, toss result, and recent form — simulating a production-grade analytics tool for broadcasters and fantasy platforms.
- Approach: Built an end-to-end ML pipeline with multi-source data ingestion (ESPN, Cricbuzz, ICC), feature engineering (team strength, venue profiles, toss and form metrics), and model comparison across Logistic Regression, Random Forest, XGBoost, and LightGBM
- Result: Delivered win probability predictions with a premium dark-mode Streamlit dashboard showing match predictor, key drivers, venue insights, tournament standings, and top performers`,
    logo: "/static/images/projects/t20-predictor.png",
    duration: "6 Weeks",
    role: "Lead Data Scientist",
    teamSize: "Solo",
    category: "Machine Learning",
    overview: `A production-grade sports analytics tool designed to predict T20 World Cup match outcomes. It simulates the kind of win-probability models used by major sports broadcasters, taking into account complex variables like venue history, toss decisions, and recent team form.`,
    keyFeatures: `- **Multi-source Data**: Ingested and merged data from ESPN, Cricbuzz, and the ICC.
- **Advanced ML Models**: Utilized gradient boosting frameworks (XGBoost, LightGBM) for high accuracy.
- **Win Probability**: Outputs continuous probabilities rather than just binary win/loss predictions.
- **Premium Dashboard**: A dark-mode Streamlit interface featuring venue insights and tournament standings.`,
    keyChallenges: `- **Data Integration**: Standardizing team and player names across different data sources.
- **Dynamic Features**: Calculating 'recent form' metrics that update correctly based on match chronologies.`,
    keyLearnings: `- Deploying advanced gradient boosting models in a production-like environment.
- Building visually compelling, consumer-facing data dashboards that rival commercial sports apps.`,
    status: "Completed",
    whyIBuiltThis: `I am passionate about sports analytics. I wanted to build a predictive engine that didn't just guess winners, but provided the same level of statistical rigor and UI polish seen on live sports broadcasts.`,
  },
  {
    id: "house-price-prediction",
    title: "House Sale Price Prediction",
    period: { start: "2025" },
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
    duration: "3 Weeks",
    role: "Data Scientist",
    teamSize: "Solo",
    category: "Machine Learning",
    overview: `This project aims to remove intuition from real estate pricing. By analyzing over 80 features of residential properties—from square footage to neighborhood characteristics—the model provides data-informed price estimates to help agents price homes competitively and accurately.`,
    keyFeatures: `- **High-Dimensional EDA**: Analyzed correlations across 80+ disparate property features.
- **Feature Selection**: Identified the most statistically significant predictors of house value.
- **Regularized Regression**: Applied Ridge and Lasso regression to prevent overfitting on the large feature space.
- **Pricing Tool**: A robust notebook pipeline that outputs estimated valuations.`,
    keyChallenges: `- **Multicollinearity**: Handling highly correlated features (e.g., garage area and garage capacity).
- **Categorical Encoding**: Managing dozens of categorical variables with high cardinality.`,
    keyLearnings: `- The power of L1 (Lasso) regularization for automatic feature selection.
- Deep intuition into real estate economics and the non-linear impact of property features.`,
    status: "Completed",
    whyIBuiltThis: `House pricing is the classic regression problem, but I wanted to take it further by exploring the complexities of a massive feature space and applying strict regularization techniques.`,
  },
  {
    id: "mathematics-formulas",
    title: "Mathematics for Data Science",
    period: { start: "2025" },
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
    duration: "Ongoing",
    role: "Author / Educator",
    teamSize: "Solo",
    category: "Educational",
    overview: `An open-source reference guide designed to demystify the mathematics behind Machine Learning. It serves as a centralized hub for learners to find formulas, intuitive explanations, and corresponding Python code snippets for linear algebra, calculus, and statistics.`,
    keyFeatures: `- **Comprehensive Coverage**: 50+ formulas spanning multiple mathematical domains.
- **Python Implementations**: Code snippets showing how to implement formulas using NumPy/SciPy.
- **Searchable Interface**: Deployed as a static site for quick, distraction-free reference.
- **Open Source**: Available for community contributions and peer review.`,
    keyChallenges: `- **Formatting Math**: Rendering complex LaTeX equations cleanly on the web.
- **Simplicity**: Breaking down dense academic concepts into intuitive, digestible explanations.`,
    keyLearnings: `- Solidified my own foundational understanding of ML mathematics by teaching it.
- Learned the intricacies of static site generators and technical documentation formatting.`,
    status: "Active",
    whyIBuiltThis: `I realized I was constantly looking up the same statistical formulas across different textbooks. I built this to serve as my own 'second brain' for data science math, and published it to help others.`,
  },
  {
    id: "portfolio-blog",
    title: "Personal Portfolio & Blog",
    period: { start: "2025" },
    repoUrl: "https://github.com/iNSRawat/nsrawat",
    demoUrl: "https://nsrawat.in",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel", "MDX"],
    description: `A developer portfolio and blog built with Next.js 16, Tailwind CSS v4, and shadcn/ui.
- Features: Dark mode, MDX blog with syntax highlighting, component registry, GitHub contribution graph, SEO optimization, and analytics
- Deployed on Vercel with perfect Lighthouse scores in performance and accessibility`,
    logo: "/static/images/projects/NSRawat-blog.png",
    duration: "Continuous",
    role: "Full Stack Developer",
    teamSize: "Solo",
    category: "Web Development",
    overview: `My personal corner of the internet. This site is a high-performance, statically generated web application serving as my portfolio, technical blog, and a custom UI component registry. It represents my standard for modern frontend development.`,
    keyFeatures: `- **MDX Blog Engine**: Write content in markdown with embedded React components.
- **Custom Component Registry**: A bespoke shadcn/ui-style registry for sharing code snippets.
- **Dynamic Theming**: Seamless dark/light mode with CSS variables.
- **Optimized Performance**: Achieves 100/100 across Lighthouse metrics.`,
    keyChallenges: `- **App Router Nuances**: Navigating the complexities of Next.js 15+ Server Components.
- **Registry Architecture**: Building a CLI-compatible component registry system from scratch.`,
    keyLearnings: `- Deep understanding of Tailwind CSS v4 and modern CSS architecture.
- Advanced TypeScript patterns for strongly typed markdown content.`,
    status: "Active",
    whyIBuiltThis: `I needed a platform to showcase my work, write about my learnings, and host my UI components. Relying on templates wasn't enough; I wanted to build a bespoke application from the ground up.`,
  },
  {
    id: "zenith-ai",
    title: "Zenith - AI Meditation & Chat",
    period: { start: "2025" },
    repoUrl: "https://github.com/iNSRawat/Zenith---AI-Meditation-Chat",
    skills: ["React", "TypeScript", "AI/LLM", "Chat API", "Full Stack"],
    description: `Problem: Most meditation apps lack personalized, conversational guidance that adapts to user mood and preferences.
- Approach: Built a full-stack React + TypeScript app integrating LLM-powered chat for real-time, context-aware meditation coaching
- Result: Delivers personalized meditation sessions with natural conversation flow and real-time AI responses`,
    logo: "/static/images/projects/zenith-ai.png",
    duration: "4 Weeks",
    role: "Full Stack AI Developer",
    teamSize: "Solo",
    category: "AI Application",
    overview: `Zenith rethinks digital mindfulness by replacing static audio tracks with an interactive, AI-driven meditation coach. The application uses LLMs to converse with users, understand their current emotional state, and generate highly personalized meditation guidance in real-time.`,
    keyFeatures: `- **Conversational AI**: Integrates advanced LLM APIs for natural, empathetic chat.
- **Mood Adaptation**: Dynamically adjusts meditation advice based on user inputs.
- **Modern React Architecture**: Fast, responsive frontend built with TypeScript.
- **State Management**: Robust handling of chat history and user preferences.`,
    keyChallenges: `- **Prompt Engineering**: Crafting system prompts that keep the AI in a calm, coaching persona without hallucinating.
- **Latency**: Managing API response times to keep the conversation feeling natural and uninterrupted.`,
    keyLearnings: `- Integrating and streaming LLM responses in a React application.
- Designing user interfaces that evoke a sense of calm and focus.`,
    status: "Completed",
    whyIBuiltThis: `I was frustrated by the rigid nature of traditional meditation apps. I wanted to explore how generative AI could provide a more fluid, customized mindfulness experience tailored to the individual's exact moment.`,
  },
  {
    id: "ai-exposure-indian-tech-market",
    title: "AI Exposure of the Indian Tech Job Market",
    period: { start: "2026" },
    repoUrl: "https://github.com/iNSRawat/jobs-Indian-Tech-Market",
    demoUrl: "https://insrawat.github.io/jobs-Indian-Tech-Market",
    skills: [
      "Data Science",
      "Python",
      "AI/ML",
      "Data Visualization",
      "Labour Economics",
      "Gemini AI",
    ],
    description: `Problem: India lacks a centralized, data-driven view of how AI and automation are impacting tech and data science occupations — unlike the US BLS system.
- Approach: Modeled 22 core Tech & Data Science roles using NASSCOM 2025-26 workforce estimates, aggregated salary data from AmbitionBox, Glassdoor India, and Payscale, and scored AI exposure (0-10) using Gemini Flash reasoning. Visualized as an interactive treemap where area = employment and color = AI exposure
- Result: Open-source analysis exposing which Indian tech roles are most vulnerable to AI displacement, deployed as an interactive site on GitHub Pages`,
    logo: "/static/images/projects/ai-exposure-indian-tech.png",
    duration: "5 Weeks",
    role: "Data Scientist",
    teamSize: "Solo",
    category: "Data Analysis",
    overview: `A comprehensive socio-economic data analysis project that maps the vulnerability of Indian technology jobs to AI automation. By scraping and aggregating workforce data and leveraging Gemini AI for exposure scoring, it provides a unique, interactive visualization of the future job market.`,
    keyFeatures: `- **Data Aggregation**: Consolidated salary and employment metrics from multiple fragmented sources.
- **AI-Driven Scoring**: Used Gemini Flash to systematically score the automation exposure of 22 distinct job roles based on required tasks.
- **Interactive Visualization**: Deployed a complex, interactive D3-style treemap visualizing employment volume vs. AI exposure.
- **Open Source Data**: Published the compiled dataset for public use and academic research.`,
    keyChallenges: `- **Data Scarcity**: Overcoming the lack of standardized labor statistics in the Indian tech sector.
- **Objective Scoring**: Designing a prompt architecture that produced consistent, unbiased AI exposure scores from the LLM.`,
    keyLearnings: `- Applying LLMs as data processing and scoring engines within an analytical pipeline.
- Communicating complex labor economics data through intuitive web visualizations.`,
    status: "Completed",
    whyIBuiltThis: `I saw a massive gap in data regarding how AI will specifically impact the Indian tech sector. I wanted to build a resource that helps professionals make data-informed career decisions in the era of generative AI.`,
  },
];
