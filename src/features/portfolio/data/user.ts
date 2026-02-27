import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "N S",
  lastName: "Rawat",
  displayName: "N S Rawat",
  username: "iNSRawat",
  gender: "male",
  pronouns: "he/him",
  bio: "Data Scientist | Specializing in Marketing Analytics. Transforming data into insights.",
  flipSentences: [
    "Data Scientist | Specializing in Marketing Analytics",
    "Transforming data into insights",
    "Building ML models & Data Pipelines",
    "Passionate about predictive modeling",
  ],
  address: "Delhi NCR, India",
  phoneNumber: "", // Not provided
  email: "ZGlnaXRhbEBuc3Jhd2F0Lmlu", // base64 encoded: digital@nsrawat.in
  website: "https://www.nsrawat.in",
  jobTitle: "Data Scientist | Specializing in Marketing Analytics",
  jobs: [
    {
      title: "Freelance Data Scientist",
      company: "NSRawat.in",
      website: "https://www.nsrawat.in",
    },
  ],
  about: `
I'm Nagendra Singh Rawat, a **Data Scientist | Specializing in Marketing Analytics** who transitioned from 5 years in Digital Marketing to building data-driven solutions. I work with **Python**, **SQL**, **TensorFlow**, **PyTorch**, and **Scikit-learn** to build [predictive models](https://github.com/iNSRawat/recipe-site-traffic-prediction), [data pipelines](https://github.com/iNSRawat/customer-behavior-prediction), and [interactive dashboards](https://github.com/iNSRawat/marketing-analytics-dashboard). With [8+ certifications](/certifications) from DataCamp, Google, and IBM, I'm passionate about turning complex datasets into actionable insights.
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
