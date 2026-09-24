// Content-as-data: each entry drives one page via ServiceDetail.jsx (/services/:slug).
// To add a new service, add an object here — no new component needed.

export const services = [
  {
    slug: 'web-development',
    title: 'Web development',
    tagline: 'Fast, scalable websites and web apps built for growth',
    problem:
      'Most business websites are slow, hard to update, and disconnected from the systems that run the company.',
    solution:
      'We build custom web platforms on modern frameworks with clean architecture, so content and features can grow without a rebuild.',
    features: [
      'Custom React / Next.js builds',
      'Headless CMS integration',
      'API and third-party integrations',
      'Performance and SEO optimization',
    ],
    industries: ['E-commerce', 'Healthcare', 'Real estate', 'Professional services'],
    stack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    process: ['Discovery', 'Architecture', 'Design', 'Build', 'Launch'],
  },
  {
    slug: 'app-development',
    title: 'App development',
    tagline: 'Native and cross-platform apps people actually use',
    problem:
      'A slow, buggy, or unfocused app costs trust fast — and most teams only get one shot at a first impression.',
    solution:
      'We design and build apps around a small number of core flows, tested with real usage patterns before launch.',
    features: [
      'iOS and Android (React Native / Flutter)',
      'Offline-first architecture',
      'Push notifications and analytics',
      'App store submission support',
    ],
    industries: ['Retail', 'Logistics', 'Fitness', 'Fintech'],
    stack: ['React Native', 'Flutter', 'Firebase', 'REST / GraphQL'],
    process: ['Discovery', 'Prototyping', 'Design', 'Build', 'Launch'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital marketing',
    tagline: 'Data-driven campaigns that turn traffic into revenue',
    problem:
      'Marketing spend without measurement is a guess — most businesses can\u2019t say which channel actually drives growth.',
    solution:
      'We build measurable, channel-specific strategies and report on what is actually moving the business forward.',
    features: [
      'SEO and content strategy',
      'Paid search and social campaigns',
      'Marketing automation',
      'Analytics and reporting dashboards',
    ],
    industries: ['D2C brands', 'SaaS', 'Hospitality', 'Education'],
    stack: ['Google Ads', 'Meta Ads', 'HubSpot', 'GA4'],
    process: ['Audit', 'Strategy', 'Launch', 'Optimize', 'Report'],
  },
  {
    slug: 'ar-vr',
    title: 'AR / VR',
    tagline: 'Immersive experiences for training, retail, and events',
    problem:
      'Static images and video can\u2019t communicate scale, spatial detail, or hands-on training the way a physical demo can.',
    solution:
      'We build lightweight, browser- and headset-based immersive experiences focused on one clear outcome per build.',
    features: [
      'WebAR product visualization',
      'VR training simulations',
      '3D product configurators',
      'Event and showroom experiences',
    ],
    industries: ['Real estate', 'Manufacturing', 'Retail', 'Events'],
    stack: ['Three.js', 'WebXR', 'Unity', 'Blender'],
    process: ['Concept', 'Asset creation', 'Build', 'Test', 'Deploy'],
  },
  {
    slug: '3d-modeling',
    title: '3D modeling',
    tagline: 'Product, architectural, and brand 3D assets',
    problem:
      'Photography alone can\u2019t show a product from every angle, in every configuration, before it exists.',
    solution:
      'We model and render assets optimized for both marketing and real-time use in web and AR experiences.',
    features: [
      'Product and architectural modeling',
      'Photorealistic rendering',
      'Real-time / game-ready optimization',
      'Animation and turntables',
    ],
    industries: ['Furniture', 'Real estate', 'Consumer products', 'Architecture'],
    stack: ['Blender', 'Three.js', 'Spline', 'Substance Painter'],
    process: ['Reference', 'Modeling', 'Texturing', 'Rendering', 'Delivery'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI / UX design',
    tagline: 'Interfaces that are clear, fast, and easy to trust',
    problem:
      'A confusing interface quietly loses customers at every step, long before anyone files a complaint.',
    solution:
      'We design around real user flows and test decisions early, so the interface earns trust instead of just looking polished.',
    features: [
      'User research and journey mapping',
      'Wireframing and prototyping',
      'Design systems',
      'Usability testing',
    ],
    industries: ['SaaS', 'Healthcare', 'Finance', 'E-commerce'],
    stack: ['Figma', 'Framer', 'Shadcn/UI', 'Design tokens'],
    process: ['Research', 'Wireframes', 'Prototype', 'Test', 'Handoff'],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
