export const siteConfig = {
  name: "Dora's Blog",
  footerName: "Dora's Blog",
  language: 'zh-CN',
  site: 'https://studystudyhard-go.github.io',
  base: '/my-lab',
  title: "Dora's Blog",
  description: '一个安静的空间，收录精选作品、实验笔记、书籍，以及关于我的一些片段。',
  heroTitle: '精选作品、笔记与阅读痕迹',
  heroIntro:
    '这是一个简洁的个人空间，记录项目、实验、书籍，以及写给创作过程的几句话。',
  profile: {
    location: '中国',
    email: 'dora.lyu.2026@gmail.com',
  },
  worksDisplay: {
    bannerLimit: 5,
    bannerHeight: 32,
    cardGap: 0.9,
    cardMinHeight: 25,
    detailMinHeight: 30,
  },
};

export const navigation = [
  { href: '/', label: '作品展' },
  { href: '/lab', label: '实验室' },
  { href: '/books', label: '书籍' },
  { href: '/about', label: '关于' },
];

export const sectionConfig = {
  works: {
    label: '作品展',
    title: '精选作品',
    description: '项目、委托，以及值得留在这里的作品。',
  },
  lab: {
    label: '实验室',
    title: '实验笔记',
    description: '简短实验、原型和持续进行的探索。',
  },
  books: {
    label: '书籍',
    title: '读书札记',
    description: '那些影响了想法、方法和视角的书。',
  },
  about: {
    label: '关于',
    title: '关于',
    description: '关于这个站点背后的人、实践与节奏的一点说明。',
  },
};
