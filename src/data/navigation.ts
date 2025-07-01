import {
  FaBolt,
  FaCheckCircle,
  FaCode,
  FaCogs,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaLock,
  FaNetworkWired,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaTools,
} from "react-icons/fa";
import { SiGraphql, SiMysql } from "react-icons/si";

export const chapters = [
  {
    href: "/fund-introduction-to-back-end",
    title: "Introduction to Back-end",
    description:
      "Server-side programming, architecture, and environment setup.",
    bgColor: "primary",
    icon: FaServer,
    ctaText: "Start Here",
  },
  {
    href: "/fund-back-end-architecture",
    title: "Back-end Architecture",
    description:
      "Understanding client-server communication and back-end responsibilities.",
    bgColor: "secondary",
    icon: FaCogs,
    ctaText: "Learn Architecture",
  },
  {
    href: "/db-data-storage/caching-strategies",
    title: "Caching Strategies",
    description:
      "Implementing caching mechanisms to improve performance and scalability.",
    bgColor: "tertiary",
    icon: FaBolt,
    ctaText: "Explore Caching",
  },
  {
    href: "/fund-foundation/API-design",
    title: "API Design",
    description:
      "Designing RESTful APIs, understanding HTTP methods, and best practices.",
    bgColor: "primary",
    icon: FaNetworkWired,
    ctaText: "Learn API Design",
  },
  {
    href: "/fund-foundation/http-protocol",
    title: "HTTP Protocol",
    description:
      "Deep dive into HTTP protocol, status codes, and request/response lifecycle.",
    bgColor: "secondary",
    icon: FaCode,
    ctaText: "Understand HTTP",
  },
  {
    href: "/fund-foundation/web-server-basics",
    title: "Web Server Basics",
    description:
      "Setting up and configuring web servers, understanding server-side rendering.",
    bgColor: "tertiary",
    icon: FaServer,
    ctaText: "Web Server Setup",
  },
  {
    href: "/fund-foundation/RESTful-services",
    title: "RESTful Services",
    description:
      "Building RESTful services, understanding resource representation and statelessness.",
    bgColor: "primary",
    icon: FaRocket,
    ctaText: "Build RESTful APIs",
  },
  {
    href: "/db-getting-started-with-database-design/fundamentals",
    title: "Database Design Fundamentals",
    description:
      "Getting started with database design, normalization, and relationships.",
    bgColor: "secondary",
    icon: FaDatabase,
    ctaText: "Learn Database Design",
  },
  {
    href: "/db-getting-started-with-database-design/normalization-and-relationships",
    title: "Normalization and Relationships",
    description:
      "Understanding normalization, relationships, and schema design principles.",
    bgColor: "tertiary",
    icon: FaDatabase,
    ctaText: "Explore Normalization",
  },
  {
    href: "/db-getting-started-with-database-design/schema-design",
    title: "Schema Design",
    description:
      "Creating efficient database schemas, indexing, and query optimization.",
    bgColor: "primary",
    icon: SiMysql,
    ctaText: "Design Database Schemas",
  },
  {
    href: "/db-getting-started-with-database-design/schema-migration",
    title: "Schema Migration",
    description:
      "Managing schema changes, migrations, and version control for databases.",
    bgColor: "secondary",
    icon: FaTools,
    ctaText: "Manage Database Migrations",
  },
  {
    href: "/db-relational-databases",
    title: "Relational Databases",
    description:
      "Exploring relational databases, SQL, and data integrity constraints.",
    bgColor: "tertiary",
    icon: FaDatabase,
    ctaText: "Learn about Relational Databases",
  },
  {
    href: "/db-non-relational-databases",
    title: "Non-Relational Databases",
    description:
      "Understanding NoSQL databases, document stores, and key-value stores.",
    bgColor: "primary",
    icon: SiGraphql,
    ctaText: "Explore NoSQL Databases",
  },
  {
    href: "/db-object-relational-mappers-fundamentals",
    title: "Object Relational Mappers (ORMs)",
    description: "Introduction to ORMs, benefits, and popular ORM frameworks.",
    bgColor: "secondary",
    icon: FaCode,
    ctaText: "Learn about ORMs",
  },
  {
    href: "/db-transaction-models/introduction-to-ACID-and-BASE",
    title: "ACID and BASE Consistency Models",
    description:
      "Understanding ACID properties, BASE model, and transaction management.",
    bgColor: "tertiary",
    icon: FaCheckCircle,
    ctaText: "Understand ACID/BASE",
  },
  {
    href: "/db-transaction-models/consistency-models",
    title: "Consistency Models",
    description:
      "Exploring different consistency models, including eventual consistency.",
    bgColor: "primary",
    icon: FaShieldAlt,
    ctaText: "Learn Consistency Models",
  },
  {
    href: "/db-transaction-models/transaction-management",
    title: "Transaction Management",
    description:
      "Managing transactions, isolation levels, and concurrency control.",
    bgColor: "secondary",
    icon: FaLock,
    ctaText: "Manage Transactions",
  },
  {
    href: "/db-transaction-models/concurrency-control",
    title: "Concurrency Control",
    description:
      "Techniques for managing concurrent transactions and preventing conflicts.",
    bgColor: "tertiary",
    icon: FaTachometerAlt,
    ctaText: "Master Control Concurrency",
  },
  {
    href: "/db-data-storage/storage-systems",
    title: "Storage Systems",
    description:
      "Understanding storage systems, file systems, and data management strategies.",
    bgColor: "primary",
    icon: FaDatabase,
    ctaText: "Explore Storage Systems",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts/data-warehouses-and-data-lakes",
    title: "Data Warehouses & Data Lakes",
    description:
      "Exploring storage systems, data warehouses, and data lakes for big data.",
    bgColor: "secondary",
    icon: FaDatabase,
    ctaText: "Learn Data Warehousing",
  },
  {
    href: "/db-data-storage/data-recovery",
    title: "Data Recovery, In-Memory, Embedded, Time Series, Search Engines",
    description:
      "Understanding data recovery, in-memory databases, embedded systems, time series databases, and search engines.",
    bgColor: "tertiary",
    icon: FaDatabase,
    ctaText: "Explore Data Storage",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts/in-memory",
    title: "In-Memory Databases",
    description:
      "Exploring in-memory databases, their use cases, and performance benefits.",
    bgColor: "primary",
    icon: FaDatabase,
    ctaText: "Learn In-Memory Databases",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts/embedded",
    title: "Embedded Databases",
    description:
      "Understanding embedded databases, their applications, and integration.",
    bgColor: "secondary",
    icon: FaDatabase,
    ctaText: "Explore Embedded Databases",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts/time-series",
    title: "Time Series Databases",
    description:
      "Exploring time series databases, their structure, and use cases in analytics.",
    bgColor: "tertiary",
    icon: FaDatabase,
    ctaText: "Learn Time Series Databases",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts/search-engines",
    title: "Search Engines",
    description:
      "Understanding search engines, indexing, and full-text search capabilities.",
    bgColor: "primary",
    icon: FaDatabase,
    ctaText: "Explore Search Engines",
  },
];

export const additional_resources = [
  {
    href: "/db-version-control-fundamentals/git-and-gitHub-fundamentals",
    icon: FaGitAlt,
    iconBg: "bg-accent",
    title: "Version Control",
    description: "Git fundamentals and collaborative development",
  },
  {
    href: "/db-different-databases-and-their-foundational-concepts",
    icon: FaDatabase,
    iconBg: "bg-primary",
    title: "Database Technologies",
    description: "Relational, NoSQL, and data management systems",
  },
  {
    href: "/adv-docker",
    icon: FaDocker,
    iconBg: "bg-secondary",
    title: "Docker",
    description: "Containerization, orchestration, and deployment",
  },
  {
    href: "/adv-kubernetes",
    icon: FaTools,
    iconBg: "bg-tertiary",
    title: "Kubernetes",
    description: "Container orchestration and management",
  },
];

export const databaseTypes = [
  {
    title: "Data Warehouses and Data Lakes",
    description: "",
  },
  {
    title: "NoSQL Databases",
    description: "",
  },
  {
    title: "Embedded",
    description: "",
  },
  {
    title: "In Memory",
    description: "",
  },
  {
    title: "Relational Databases",
    description: "",
  },
  {
    title: "Search Engines",
    description: "",
  },
  {
    title: "Time Series",
    description: "",
  },
];

export const utilitiesAndTools = [
  {
    title: "General Development Resources and Tools for Back End Development",
    description: "",
  },
  {
    title: "API Management",
    description: "",
  },
  {
    title: "Backup and Recovery Tools",
    description: "",
  },
  {
    title: "Database Management Tools",
    description: "",
  },
  {
    title: "Documentation and Schema Visualization Tools",
    description: "",
  },
  {
    title: "Load Testing and Benchmarking Tools",
    description: "",
  },
  {
    title: "Object Relational Mapping and Query Builders",
    description: "",
  },
  {
    title: "Schema Migration and Version Control",
    description: "",
  },
];

export const advancedTopics = [
  {
    title: "API Versioning",
    description: "",
  },
  {
    title: "ETL Processes",
    description: "",
  },
  {
    title: "Authentication and Authorization",
    description: "",
  },
  {
    title: "Deployment Strategies",
    description: "",
  },
  {
    title: "Docker",
    description: "",
  },
  {
    title: "Kubernetes",
    description: "",
  },
  {
    title: "Software Principles",
    description: "",
    children: [
      {
        title: "SOLID Principles",
        description: "",
      },
      {
        title: "Clean Code Practices",
        description: "",
      },
      {
        title: "Design Patterns",
        description: "",
      },
      {
        title: "Software Design Principles",
        description: "",
      },
    ],
  },
  {
    title: "API Security",
    description: "",
  },
  {
    title: "Quality Security Performance",
    description: "",
    children: [
      {
        title: "Testing Strategies",
        description: "",
        children: [
          {
            title: "Automating Tests",
            description: "",
          },
          {
            title: "Integration Testing",
            description: "",
          },
          {
            title: "Unit Testing",
            description: "",
          },
          {
            title: "Performance Testing",
            description: "",
          },
        ],
      },
      {
        title: "Performance Optimization",
        description: "",
        children: [
          {
            title: "Load Balancing",
            description: "",
          },
          {
            title: "Monitoring and Logging",
            description: "",
          },
          {
            title: "Scalability Strategies",
            description: "",
          },
          {
            title: "Performance Tuning",
            description: "",
          },
          {
            title: "Caching Strategies",
            description: "",
          },
          {
            title: "Database Optimization",
            description: "",
          },
        ],
      },
    ],
  },
];
