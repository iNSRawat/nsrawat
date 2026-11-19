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
    skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Keras", "OpenCV"],
  },
  {
    title: "Data Analysis",
    skills: ["Pandas", "NumPy", "SciPy", "Jupyter Notebook"],
  },
  {
    title: "Data Visualization",
    skills: [
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Tableau",
      "Power BI",
      "Streamlit",
    ],
  },
  {
    title: "ML Platforms",
    skills: ["MLflow", "Hugging Face", "Kaggle"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "GitHub", "Poetry", "Mamba"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Snowflake"],
  },
];
