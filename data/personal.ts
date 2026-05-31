import type { PersonalData } from "@/lib/types";

export const personalData: PersonalData = {
  name: "Nikesh Kumar T.K",
  tagline: "Engineer building serverless products on AWS.",
  bio: `I'm a software engineer working on in-flight entertainment and connectivity at Panasonic Avionics. I spend my time across the stack — Node.js and TypeScript on serverless backends (AWS Lambda, DynamoDB, CDK), and React on the front. I care about clean APIs, small bundles, and systems that quietly do their job.`,
  email: "nikeshkumartk2020@gmail.com",
  career: [
    {
      year: "2026",
      title: "SDE II",
      company: "Panasonic Avionics Corporation",
      description:
        "Working on in-flight entertainment and connectivity systems for commercial aviation. On-site in Pune.",
    },
    {
      year: "2024",
      title: "Software Engineer",
      company: "WebKorps",
      description:
        "Built and shipped client-facing web products end-to-end with Node.js, React, and TypeScript. Remote.",
    },
    {
      year: "2022",
      title: "Full Stack Engineer",
      company: "N-OMS",
      description:
        "Designed serverless backends on AWS Lambda and DynamoDB, paired with React front-ends. Owned features from API to UI for 2+ years.",
    },
    {
      year: "2021",
      title: "Full Stack Developer Intern",
      company: "N-OMS",
      description:
        "First professional role. Shipped features in React and Node.js across the product. Remote.",
    },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Nikeshkumar-tk",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nikesh-kumartk/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:nikeshkumartk2020@gmail.com",
      icon: "email",
    },
  ],
};
