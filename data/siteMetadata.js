const siteMetadata = {
  title: "N S Rawat - Data Science Portfolio",
  author: 'N S Rawat',
  fullName: 'Nagendra Singh Rawat',
  headerTitle: "NSRawat's Data Science Journey",
  description: 'Passionate data scientist exploring insights through machine learning, analytics, and visualization. Building intelligent solutions with Python, ML frameworks, and modern data tools.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://nsrawat.vercel.app',
  analyticsURL: 'https://analytics.nsrawat.vercel.app/share/Z3eSINRnbzyd1gK/nsrawat.vercel.app',
  siteRepo: 'https://github.com/iNSRawat/nsrawat_portfolio',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.jpg',
  socialBanner: '/static/images/projects/nsrawat-datascience.png',
  email: 'digital@nsrawat.in',
  github: 'https://github.com/iNSRawat',
  x: 'https://twitter.com/iNSRawat',
  twitter: 'https://twitter.com/iNSRawat',
  facebook: 'https://www.facebook.com/nsrawat',
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
}

module.exports = siteMetadata
