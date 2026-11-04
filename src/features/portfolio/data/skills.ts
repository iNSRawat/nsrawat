export interface SkillCategory {
  title: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL"],
  },
  {
    title: "Machine Learning",
    skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Keras"],
  },
  {
    title: "Data Analysis",
    skills: ["Pandas", "NumPy", "SciPy"],
  },
  {
    title: "Data Visualization",
    skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI"],
  },
  {
    title: "ML Platforms",
    skills: ["MLflow", "Hugging Face", "Kaggle"],
  },
  {
    title: "DevOps / MLOps",
    skills: ["Docker", "Git & GitHub", "MLflow"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Snowflake"],
  },
];
