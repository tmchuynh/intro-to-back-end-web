import Link from "next/link";

export default function Resources() {
  const resources = [
    {
      title: "Node.js Documentation",
      description: "Official Node.js documentation for server-side JavaScript.",
      href: "https://nodejs.org/docs/",
      external: true,
    },
    {
      title: "MDN HTTP Guide",
      description:
        "Complete guide to HTTP protocol, methods, and status codes.",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      external: true,
    },
    {
      title: "MySQL Documentation",
      description: "Comprehensive MySQL database documentation and tutorials.",
      href: "https://dev.mysql.com/doc/",
      external: true,
    },
    {
      title: "Docker Documentation",
      description:
        "Official Docker guides for containerization and deployment.",
      href: "https://docs.docker.com/",
      external: true,
    },
    {
      title: "Express.js Guide",
      description:
        "Fast, unopinionated web framework for Node.js applications.",
      href: "https://expressjs.com/",
      external: true,
    },
    {
      title: "REST API Design",
      description:
        "Best practices for designing RESTful APIs and web services.",
      href: "https://restfulapi.net/",
      external: true,
    },
    {
      title: "Git & Version Control",
      description:
        "Master Git workflows and collaborative development practices.",
      href: "/tools-practices/version-control",
      external: false,
    },
    {
      title: "Database Design Guide",
      description: "Learn database modeling, normalization, and schema design.",
      href: "/databases/database-design",
      external: false,
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Back-end Development Resources
        </h2>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group relative no-underline"
            >
              <div className="relative bg-white shadow p-6 border rounded-xl h-full w-full">
                <div>
                  <span className="inline-flex items-center space-x-1">
                    <h3 className="font-medium text-gray-900 text-lg">
                      {resource.title}
                    </h3>
                    {resource.external && (
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
