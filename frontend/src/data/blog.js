// Sample content — architecture is CMS-ready (see brief section 21).
// Swap this file for a Strapi/Sanity/WordPress API call later without touching BlogIndex/Article.

export const blogPosts = [
  {
    slug: 'why-technology-partners-beat-vendors',
    title: 'Why a technology partner beats a software vendor',
    category: 'Strategy',
    tags: ['Digital transformation', 'Partnership'],
    excerpt: 'A vendor builds what you ask for. A partner asks why you\u2019re asking for it.',
    content:
      'Most businesses hire a software vendor to build a fixed spec. A technology partner instead starts with the business problem, challenges assumptions, and stays involved after launch. The difference shows up over years, not weeks — in whether the platform still fits the business as it grows.',
    featured: true,
  },
  {
    slug: 'signs-your-website-needs-a-rebuild',
    title: '5 signs your website needs more than a redesign',
    category: 'Web Development',
    tags: ['Web development', 'Performance'],
    excerpt: 'A fresh coat of paint won\u2019t fix a foundation problem.',
    content:
      'Slow load times, a CMS that fights every content update, no mobile strategy, disconnected analytics, and a design that can\u2019t represent new offerings — these are structural issues. A redesign covers the surface; a rebuild fixes the foundation underneath it.',
    featured: false,
  },
  {
    slug: 'business-health-checkup-explained',
    title: 'What a Business Health Checkup actually measures',
    category: 'Business',
    tags: ['Business Health Checkup', 'Growth'],
    excerpt: 'Before recommending a solution, we measure five specific areas.',
    content:
      'A Business Health Checkup looks at your digital presence, marketing effectiveness, technology stack, and operational bottlenecks — then maps findings to a prioritized action plan, not a generic proposal.',
    featured: false,
  },
]

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug)
