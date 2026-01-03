import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "NSRawat.in",
    companyLogo: "/static/images/avatar.png",
    positions: [
      {
        id: "freelance-data-scientist",
        title: "Freelance Data Scientist & ML Engineer",
        employmentPeriod: {
          start: "04.2023",
        },
        employmentType: "Freelance",
        icon: "code",
        description: `- Building data dashboards to analyze KPIs and optimize marketing performance.
- Improved ROI by 25% using analytical insights and performance metrics.
- Conducting consumer and sales data analysis to support strategic decision-making.
- Developing machine learning models for predictive analytics.`,
        skills: [
          "Python",
          "SQL",
          "Pandas",
          "Scikit-learn",
          "TensorFlow",
          "Data Visualization",
          "Machine Learning",
          "Dashboard Development",
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
        description: `- Utilized data analytics to identify growth trends, increasing sales by 25%.
- Created custom Excel and Google Analytics dashboards for management reporting.`,
        skills: [
          "Data Analytics",
          "Google Analytics",
          "Excel",
          "Dashboard Reporting",
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
        icon: "design",
        description: `- Managed e-commerce analytics using Google Analytics for real-time data monitoring.
- Conducted user funnel and behavioral analysis to optimize customer acquisition.
- Achieved 6x ROI through data-driven advertising and budgeting.`,
        skills: [
          "Google Analytics",
          "E-commerce Analytics",
          "User Funnel Analysis",
          "Data-driven Marketing",
        ],
      },
    ],
  },
  {
    id: "digital-marketing-experience",
    companyName: "Multiple Roles",
    companyLogo: "",
    positions: [
      {
        id: "digital-marketing-exec",
        title: "Digital Marketing Executive / Intern",
        employmentPeriod: {
          start: "2017",
          end: "2021",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Managed SEO, PPC, and analytics-driven campaigns for various clients.
- Built reports and dashboards to track ROI, traffic, and engagement metrics.`,
        skills: [
          "SEO",
          "PPC",
          "Analytics",
          "Dashboard Development",
          "Reporting",
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
    ],
    isCurrentEmployer: true,
  },
];
