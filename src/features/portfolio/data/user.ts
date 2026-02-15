import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "N S",
  lastName: "Rawat",
  displayName: "N S Rawat",
  username: "iNSRawat",
  gender: "male",
  pronouns: "he/him",
  bio: "Data Scientist & ML Enthusiast. Transforming data into insights.",
  flipSentences: [
    "Data Scientist & ML Enthusiast",
    "Transforming data into insights",
    "Building ML models & Data Pipelines",
    "Passionate about predictive modeling",
  ],
  address: "Delhi NCR, India",
  phoneNumber: "", // Not provided
  email: "ZGlnaXRhbEBuc3Jhd2F0Lmlu", // base64 encoded: digital@nsrawat.in
  website: "https://www.nsrawat.in",
  jobTitle: "Data Scientist & ML Enthusiast",
  jobs: [
    {
      title: "Freelance Data Scientist",
      company: "NSRawat.in",
      website: "https://www.nsrawat.in",
    },
  ],
  about: `
- I'm Nagendra Singh Rawat - a dedicated **Data Scientist & ML Enthusiast** with a passion for transforming complex data into actionable insights.
- After 5 years in Digital Marketing, I began my Data Science journey in Sep 2025 to shift my career.
- Skilled in **Python**, **SQL**, **TensorFlow**, **PyTorch**, **Scikit-learn**, and modern data science tools.
- Building **predictive models**, **data pipelines**, and **interactive dashboards** with Tableau & Power BI.
- Currently building skills in Python, machine learning, and data analysis for my new path.
- Creator of data science projects on [GitHub](https://github.com/iNSRawat).
- Earned [8+ Certifications](/certifications) from DataCamp, Google, and IBM.
- I have a passion for exploratory data analysis and finding patterns in data.
`,
  avatar: "/static/images/avatar.png",
  ogImage: "/static/images/og-image.png",
  namePronunciationUrl: "/audio/pronunciation.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "nsrawat",
    "n s rawat",
    "nagendra singh rawat",
    "iNSRawat",
    "data scientist",
    "machine learning",
    "python",
    "data science",
    "ml enthusiast",
    "delhi ncr",
  ],
  dateCreated: "2025-09-01", // YYYY-MM-DD
} satisfies User;
