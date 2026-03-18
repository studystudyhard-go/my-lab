export const siteConfig = {
  name: 'Dora',
  footerName: 'Dora',
  language: 'zh-CN',
  site: 'https://studystudyhard-go.github.io',
  base: '/my-lab',
  title: 'Dora',
  description: 'A quiet place for selected works, lab notes, books, and a short introduction.',
  heroTitle: 'Selected works, notes, and reading traces.',
  heroIntro:
    'A minimal personal space for projects, experiments, books, and a few words about the person behind them.',
  profile: {
    location: 'Based in China',
    email: 'hello@example.com',
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
    title: 'Selected Work',
    description: 'Projects, commissions, and pieces worth keeping close.',
  },
  lab: {
    label: '实验室',
    title: 'Lab Notes',
    description: 'Short experiments, prototypes, and ongoing explorations.',
  },
  books: {
    label: '书籍',
    title: 'Bookshelf',
    description: 'Books that shaped ideas, methods, and small shifts in perspective.',
  },
  about: {
    label: '关于',
    title: 'About',
    description: 'A brief note about the person, practice, and pace behind the site.',
  },
};
