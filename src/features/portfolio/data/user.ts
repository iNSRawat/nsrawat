import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "N S",
  lastName: "Rawat",
  displayName: "N S Rawat",
  username: "iNSRawat",
  gender: "male",
  pronouns: "he/him",
  bio: "Data Scientist | Ex-Digital Marketer | Turning marketing data into business decisions.",
  flipSentences: [
    "Data Scientist | Ex-Digital Marketer",
    "Turning marketing data into business decisions",
    "Building ML models & Data Pipelines",
    "Passionate about predictive modeling",
  ],
  address: "Delhi NCR, India",
  phoneNumber: "", // Not provided
  email: "ZGlnaXRhbEBuc3Jhd2F0Lmlu", // base64 encoded: digital@nsrawat.in
  website: "https://www.nsrawat.in",
  jobTitle: "Data Scientist | Ex-Digital Marketer",
  jobs: [
    {
      title: "Freelance Data Scientist",
      company: "NSRawat.in",
      website: "https://www.nsrawat.in",
    },
  ],
  about: `
I'm Nagendra Singh Rawat, a **Data Scientist | Ex-Digital Marketer**. After spending 5 years in Digital Marketing optimizing campaigns by gut + spreadsheets, I transitioned to building data-driven solutions. Now I use machine learning to do it properly. I work with **Python**, **SQL**, **TensorFlow**, **PyTorch**, and **Scikit-learn** to build [predictive models](https://github.com/iNSRawat/recipe-site-traffic-prediction), [data pipelines](https://github.com/iNSRawat/customer-behavior-prediction), and [interactive dashboards](https://github.com/iNSRawat/marketing-analytics-dashboard). With [8+ certifications](/certifications) from DataCamp, Google, and IBM, I'm passionate about turning complex datasets into actionable business decisions.
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
