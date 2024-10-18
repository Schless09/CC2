import { type PastCompaniesIdsMapType, PastCompany } from '@/lib/types';

export const workArrangement = ['Remote', 'Onsite', 'Hybrid'];

export const jobTypes = ['Full-time', 'Contract-To-Hire', 'Contract'];

export const geos = [
  { label: 'SF Bay Area', value: '90000084' },
  { label: 'Chicago', value: '90000014' },
  { label: 'SLC', value: '90000716' },
  { label: 'Houston', value: '90000042' },
  { label: 'Atlanta', value: '90000052' },
  { label: 'Boston', value: '90000007' },
  { label: 'NYC', value: '90000070' },
  { label: 'Washington DC', value: '90000097' },
  { label: 'San Diego', value: '90010472' },
];

export const industries = [
  'Aerospace and Aviation',
  'Agriculture',
  'Artificial Intelligence (AI)',
  'Automated Technology',
  'Automotive',
  'Banking',
  'Biotechnology',
  'Blockchain and Cryptocurrency',
  'Chemical Manufacturing',
  'Civil Engineering',
  'Clothing and Textile Manufacturing',
  'Construction',
  'Consulting',
  'Consumer Goods Manufacturing',
  'Culinary and Food Services',
  'Cybersecurity',
  'Data Analytics',
  'Education',
  'Electronics Manufacturing',
  'Energy',
  'Entertainment and Media',
  'Environmental Services',
  'Fashion and Apparel',
  'Financial Services',
  'Financial Technology (FinTech)',
  'Food and Beverage Manufacturing',
  'Forestry and Logging',
  'Government',
  'Healthcare',
  'Heavy Machinery Manufacturing',
  'Hospitality',
  'Information Technology',
  'Insurance',
  'Internet and Software',
  'Legal',
  'Manufacturing',
  'Marketing and Advertising',
  'Medical Devices',
  'Metal Manufacturing',
  'Mining and Extraction',
  'Music and Performing Arts',
  'Nanotechnology',
  'Nonprofit and Social Services',
  'Oil and Gas',
  'Paper and Packaging Manufacturing',
  'Pharmaceuticals',
  'Plastics Manufacturing',
  'Real Estate',
  'Renewable Energy',
  'Retail',
  'Robotics',
  'Sports and Recreation',
  'Telecommunications',
  'Textile Manufacturing',
  'Transportation and Logistics',
  'Venture Capital & Private Equity',
  'Virtual and Augmented Reality',
];

export const states = [
  'Alabama (AL)',
  'Alaska (AK)',
  'Arizona (AZ)',
  'Arkansas (AR)',
  'California (CA)',
  'Colorado (CO)',
  'Connecticut (CT)',
  'Delaware (DE)',
  'Florida (FL)',
  'Georgia (GA)',
  'Hawaii (HI)',
  'Idaho (ID)',
  'Illinois (IL)',
  'Indiana (IN)',
  'Iowa (IA)',
  'Kansas (KS)',
  'Kentucky (KY)',
  'Louisiana (LA)',
  'Maine (ME)',
  'Maryland (MD)',
  'Massachusetts (MA)',
  'Michigan (MI)',
  'Minnesota (MN)',
  'Mississippi (MS)',
  'Missouri (MO)',
  'Montana (MT)',
  'Nebraska (NE)',
  'Nevada (NV)',
  'New Hampshire (NH)',
  'New Jersey (NJ)',
  'New Mexico (NM)',
  'New York (NY)',
  'North Carolina (NC)',
  'North Dakota (ND)',
  'Ohio (OH)',
  'Oklahoma (OK)',
  'Oregon (OR)',
  'Pennsylvania (PA)',
  'Rhode Island (RI)',
  'South Carolina (SC)',
  'South Dakota (SD)',
  'Tennessee (TN)',
  'Texas (TX)',
  'Utah (UT)',
  'Vermont (VT)',
  'Virginia (VA)',
  'Washington (WA)',
  'West Virginia (WV)',
  'Wisconsin (WI)',
  'Wyoming (WY)',
];

export const pastCompanies: PastCompany[] = [
  { label: 'KPMG', checked: false },
  { label: 'EY', checked: false },
  { label: 'Deloitte', checked: false },
  { label: 'PwC', checked: false },
];

export const pastCompaniesIdsMap: PastCompaniesIdsMapType = {
  KPMG: '2525300',
  EY: '1073',
  Deloitte: '1038',
  PwC: '1044',
};

// content/resumeTipsContent.ts

export const resumeTipsSWE = {
  email: 'andrew@thecodercollective.com',
  templateLink: 'https://docs.google.com/document/d/1tMUEAY2gI1CA3DIG1oRuHMHI6ZgY8V4yh93V0hZmzrg/edit?usp=sharing',
  title: 'Resume Tips for Software Engineering Candidates',
  sections: [
    {
      title: 'Key Areas to Highlight for Software Engineering',
      items: [
        {
          subtitle: '1. Technical Skills',
          points: [
            "List programming languages, frameworks, and tools you're proficient in",
            'Highlight experience with relevant technologies (e.g., cloud platforms, databases, version control)',
            'Showcase familiarity with software development methodologies (e.g., Agile, Scrum)',
          ],
        },
        {
          subtitle: '2. Project Experience',
          points: [
            'Describe significant projects, emphasizing your role and technologies used',
            'Highlight problem-solving skills and innovative solutions implemented',
            'Quantify impact of your work (e.g., performance improvements, user adoption)',
          ],
        },
        {
          subtitle: '3. Software Development Lifecycle',
          points: [
            'Demonstrate experience in various phases (design, development, testing, deployment)',
            'Highlight proficiency in code review, debugging, and optimization',
            'Showcase experience with CI/CD pipelines and DevOps practices',
          ],
        },
        {
          subtitle: '4. Collaboration and Communication',
          points: [
            'Emphasize experience working in cross-functional teams',
            'Highlight ability to explain technical concepts to non-technical stakeholders',
            'Showcase any mentoring or leadership experience',
          ],
        },
      ],
    },
    {
      title: 'Sample Resume Bullets',
      items: [
        {
          subtitle: 'Development Experience',
          points: [
            'Developed and maintained scalable microservices using Java and Spring Boot, serving 1M+ daily API requests',
            'Implemented responsive front-end interfaces using React.js, improving user engagement by 25%',
            'Optimized database queries, reducing average response time by 40% for high-traffic endpoints',
            'Designed and implemented RESTful APIs, facilitating seamless integration with mobile and web applications',
          ],
        },
        {
          subtitle: 'DevOps and Infrastructure',
          points: [
            'Containerized applications using Docker and orchestrated deployments with Kubernetes',
            'Implemented CI/CD pipelines using Jenkins, reducing deployment time by 60%',
            'Managed cloud infrastructure on AWS, utilizing services such as EC2, S3, and RDS',
            'Implemented automated testing strategies, achieving 90% code coverage across critical modules',
          ],
        },
      ],
    },
    {
      title: 'Additional Resume Enhancement Tips',
      items: [
        {
          subtitle: '',
          points: [
            'Tailor your resume to the specific job description',
            'Use action verbs to begin each bullet point',
            'Focus on achievements and impact rather than just responsibilities',
            'Include relevant certifications (e.g., AWS, Azure, Google Cloud)',
            'Highlight contributions to open-source projects or personal coding projects',
            'Ensure your GitHub profile or portfolio website is up-to-date and linked',
            'Use a clean, professional format with consistent styling',
            'Proofread carefully to eliminate errors and typos',
          ],
        },
      ],
    },
  ],
};

export const ResumeTipsProduct = {
  email: 'andrew@thecodercollective.com',
  templateLink: 'https://docs.google.com/document/d/1tMUEAY2gI1CA3DIG1oRuHMHI6ZgY8V4yh93V0hZmzrg/edit?usp=sharing',
  title: 'Resume Tips for Product Managers in Tech',
  sections: [
    {
      title: 'Key Areas to Highlight for Product Management',
      items: [
        {
          subtitle: '1. Product Strategy',
          points: [
            'Showcase experience in developing product vision and strategy',
            'Highlight ability to align product roadmap with business objectives',
            'Demonstrate experience in market research and competitive analysis',
          ],
        },
        {
          subtitle: '2. User-Centric Approach',
          points: [
            'Emphasize experience in user research and gathering customer insights',
            'Showcase ability to translate user needs into product features',
            'Highlight experience with user testing and iterative design processes',
          ],
        },
        {
          subtitle: '3. Technical Acumen',
          points: [
            'Demonstrate understanding of relevant technologies and development processes',
            'Highlight experience working with engineering teams',
            'Showcase ability to communicate technical concepts to non-technical stakeholders',
          ],
        },
        {
          subtitle: '4. Data-Driven Decision Making',
          points: [
            'Emphasize experience in using data analytics to inform product decisions',
            'Showcase proficiency in defining and tracking key metrics',
            'Highlight experience with A/B testing and feature experimentation',
          ],
        },
      ],
    },
    {
      title: 'Sample Resume Bullets',
      items: [
        {
          subtitle: 'Product Strategy and Development',
          points: [
            'Led the development and launch of a new SaaS product, resulting in $2M ARR within the first year',
            'Defined and prioritized product backlog, increasing team velocity by 30% and reducing time-to-market',
            'Conducted market research and competitive analysis, identifying key differentiators that led to 25% market share growth',
          ],
        },
        {
          subtitle: 'User Experience and Research',
          points: [
            'Implemented user research program, increasing user satisfaction scores by 40% over 6 months',
            'Led cross-functional team in redesigning core product features, resulting in 50% increase in user engagement',
            'Developed and maintained user personas and journey maps, aligning team efforts with user needs',
          ],
        },
        {
          subtitle: 'Stakeholder Management',
          points: [
            'Collaborated with C-level executives to align product strategy with company vision and goals',
            'Managed relationships with key clients, incorporating feedback to drive product improvements',
            'Facilitated communication between engineering, design, and marketing teams, ensuring cohesive product development',
          ],
        },
        {
          subtitle: 'Data Analysis and Metrics',
          points: [
            'Implemented data analytics framework, providing actionable insights that drove 20% increase in user retention',
            'Conducted A/B tests on key features, resulting in 15% improvement in conversion rates',
            'Developed KPI dashboard for executive team, improving visibility into product performance and user behavior',
          ],
        },
      ],
    },
    {
      title: 'Additional Resume Enhancement Tips',
      items: [
        {
          subtitle: '',
          points: [
            'Tailor your resume to the specific product management role and company',
            'Use action verbs to begin each bullet point',
            'Quantify your achievements with specific metrics and results',
            'Highlight any technical skills or certifications relevant to product management',
            'Showcase experience with product management tools (e.g., JIRA, Trello, Aha!)',
            "Include any notable products or features you've successfully launched",
            'Demonstrate your ability to balance user needs with business objectives',
            'Highlight any experience with emerging technologies or trends in your industry',
          ],
        },
      ],
    },
  ],
};


// Constants
export const areasOfExpertise = [
  { name: 'Frontend Development' },
  { name: 'Backend Development' },
  { name: 'DevOps' },
  { name: 'AI/ML' },
  { name: 'Product Management' },
  { name: 'Mobile Development' },
  { name: 'Data Engineering' },
  { name: 'UI/UX Design' },
];


export const keyMarkets = [
  'San Francisco Bay',
  'Chicago',
  'New York City',
  'Houston',
  'Boston',
  'Phoenix',
  'Philadelphia',
  'San Diego',
  'Dallas',
  'Salt Lake City',
  'Washington DC',
  'Atlanta',
];

export const reasonsToChoose = [
  {
    title: 'Local Expertise, Nationwide Reach',
    description:
      'We leverage deep local insights combined with a broad national network to identify and attract the best talent for your needs.',
  },
  {
    title: 'Specialized Focus',
    description:
      'Our dedicated approach targets specific sectors, allowing us to understand and address the unique demands and nuances of your industry.',
  },
  {
    title: 'Comprehensive Support',
    description:
      'We provide seamless, end-to-end recruitment support, guiding you from the initial search through to the final hiring decision for a hassle-free experience.',
  },
  {
    title: 'Industry Insights',
    description:
      'With extensive accounting industry experience, we offer valuable insights and expert guidance, ensuring informed evaluations and selections of candidates.',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Essential Tips to Elevate Your Software Engineering Resume',
    excerpt:
      'A comprehensive guide to refining your public accounting (audit) resume and making a lasting impression on potential employers.',
    date: 'October 7, 2024',
    readTime: '5 min read',
    image: '/images/resume.jpg',
    link: '/blog/ResumeTipsSWE',
  },
  {
    id: 2,
    title: 'Transform Your Product Manager Resume for Success',
    excerpt:
      'Discover essential tips and strategies to elevate your corporate accounting resume and stand out in a competitive job market.',
    date: 'October 7, 2024',
    readTime: '6 min read',
    image: '/images/interview.jpg',
    link: '/blog/ResumeTipsProduct',
  },
  {
    id: 3,
    title: 'Maximize Your Income: The Top Side-Hustle for SWE & Tech Talent',
    excerpt:
      'Fill Up Your Piggy Bank w/ $6k Referral Rewards from Coder Collective',
    date: 'October 7, 2024',
    readTime: '6 min read',
    image: '/images/piggy.jpg',
    link: '/businessModel',
  },
];
