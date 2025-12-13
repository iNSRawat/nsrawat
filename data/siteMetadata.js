const siteMetadata = {
  title: 'N S Rawat - Data Science & Machine Learning Portfolio',
  author: 'N S Rawat',
  fullName: 'Nagendra Singh Rawat',
  headerTitle: 'Data Science Journey with N S Rawat',
  description:
    'Data Scientist specializing in Machine Learning, Deep Learning, Statistical Analysis, and Data Visualization. Transforming complex data into actionable insights using Python, TensorFlow, Scikit-learn, and modern analytics tools. Passionate about predictive modeling, business intelligence, and creating data-driven solutions.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://www.nsrawat.in',
  analyticsURL: 'https://nsrawat.in/share/7INnZc4Dv9KbGumx',
  siteRepo: 'https://github.com/iNSRawat/nsrawat_portfolio',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/projects/NSRawat-blog.png',
  email: 'digital@nsrawat.in',
  github: 'https://github.com/iNSRawat',
  x: 'https://twitter.com/iNSRawat',
  twitter: 'https://twitter.com/iNSRawat',
  facebook: 'https://www.facebook.com/insrawat',
  linkedin: 'https://www.linkedin.com/in/insrawat',
  youtube: 'https://www.youtube.com/@nsrawat',
  instagram: 'https://www.instagram.com/insrawat',
  kaggle: 'https://www.kaggle.com/nsrawat',
  locale: 'en-US',
  stickyNav: false,
  socialAccounts: {
    github: 'iNSRawat',
    linkedin: 'insrawat',
    x: 'iNSRawat',
  },
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.UMAMI_WEBSITE_ID,
      umamiScriptSrc: 'https://cloud.umami.is/script.js',
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'title',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
      inputPosition: 'bottom',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};
module.exports = siteMetadata;
