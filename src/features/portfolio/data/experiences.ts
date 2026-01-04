import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "Freelancer",
    companyLogo: "/static/images/avatar.png",
    positions: [
      {
        id: "freelance-data-analyst",
        title: "Freelance Data Analyst & Marketing Specialist",
        employmentPeriod: {
          start: "04.2023",
        },
        employmentType: "Freelance",
        icon: "code",
        description: `- Built automated looker studio dashboards analyzing 15+ KPIs across channels, improving decisions and increasing client ROI by **25%** through statistical analysis.
- Developed Python automation scripts for ETL processes, reducing manual data collection by **35%** and improving data quality through validation workflows.
- Conducted consumer behavior analysis using EDA on 50,000+ records, identifying key purchase patterns and churn indicators.
- Implemented A/B testing framework with hypothesis testing (p-values, confidence intervals) resulting in **18%** conversion improvement.`,
        skills: [
          "Python",
          "SQL",
          "Looker Studio",
          "ETL",
          "Hypothesis Testing",
          "EDA",
          "Statistical Analysis",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "careager",
    companyName: "CarEager (VMG)",
    companyLogo: "",
    positions: [
      {
        id: "careager-marketing",
        title: "Digital Marketing Associate",
        employmentPeriod: {
          start: "03.2023",
          end: "06.2023",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Analyzed sales funnel data using data-driven strategies resulting in **25% sales increase** through predictive modeling and segmentation.
- Designed custom Excel dashboards with advanced formulas and pivot tables for management reporting, integrating Google Analytics for real-time KPI tracking.
- Performed cohort analysis on customer acquisition, calculating retention rates and lifetime value metrics.`,
        skills: [
          "Predictive Modeling",
          "Google Analytics",
          "Excel",
          "Cohort Analysis",
          "Funnel Analysis",
        ],
      },
    ],
  },
  {
    id: "plants-kharido",
    companyName: "Plants Kharido Pvt. Ltd.",
    companyLogo: "",
    positions: [
      {
        id: "plants-kharido-manager",
        title: "Digital Marketing Manager",
        employmentPeriod: {
          start: "03.2022",
          end: "03.2023",
        },
        employmentType: "Full-time",
        icon: "business",
        description: `- Achieved **6x ROI** through data-driven budget optimization using statistical analysis to allocate Rs.5L+ monthly spend across channels (Google Ads, Facebook, Instagram).
- Managed comprehensive e-commerce analytics using Google Analytics/SQL, implementing real-time dashboards tracking 20+ metrics.
- Conducted funnel analysis identifying 3 critical drop-off points, implementing A/B tested solutions improving checkout completion by **22%**.
- Performed customer segmentation using RFM analysis and clustering, identifying 4 personas enabling personalized campaigns with **30% higher engagement**.`,
        skills: [
          "Budget Optimization",
          "SQL",
          "A/B Testing",
          "RFM Analysis",
          "Clustering",
          "E-commerce Analytics",
        ],
      },
    ],
  },
  {
    id: "digital-marketing-experience",
    companyName: "Multiple Organizations",
    companyLogo: "",
    positions: [
      {
        id: "digital-marketing-exec-intern",
        title: "Digital Marketing Executive/Intern",
        employmentPeriod: {
          start: "2020",
          end: "2021",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Managed multi-channel campaigns for 5+ clients, analyzing performance data using Google Analytics/Excel to optimize SEO, PPC, social strategies.
- Developed comprehensive ROI dashboards tracking 10+ metrics using pivot tables for client presentations.
- Improved data validation processes, implementing systematic workflows reducing errors by **40%**.`,
        skills: [
          "SEO",
          "PPC",
          "Google Analytics",
          "Data Validation",
          "ROI Analysis",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    companyLogo: "",
    positions: [
      {
        id: "data-science-learning",
        title: "Data Science & ML Learning Journey",
        employmentPeriod: {
          start: "09.2025",
        },
        icon: "education",
        description: `- Currently building skills in Python, Machine Learning, and Data Analysis.
- Completed DataCamp Data Scientist Associate certification.
- Focus areas: Predictive Modeling, Statistical Analysis, Deep Learning.`,
        skills: [
          "Python",
          "Machine Learning",
          "Data Analysis",
          "Statistical Analysis",
          "Deep Learning",
          "DataCamp Certification",
        ],
      },
      {
        id: "bachelor-science",
        title: "Bachelor of Science",
        employmentPeriod: {
          start: "2017",
          end: "2017",
        },
        icon: "education",
        description: `**H.N.B. Garhwal University**
Dehradun, India`,
        skills: ["Science", "Research"],
      },
    ],
    isCurrentEmployer: true,
  },
];
