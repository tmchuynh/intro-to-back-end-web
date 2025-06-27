import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Guides() {
  const guides = [
    {
      title: "Server Fundamentals",
      description:
        "Master HTTP protocol, RESTful APIs, and server-side architecture.",
      href: "/foundations/foundation",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "Database Design",
      description:
        "Learn database modeling, normalization, and relational design principles.",
      href: "/databases/database-design",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      title: "Version Control & Git",
      description:
        "Master Git workflows, branching strategies, and collaborative development.",
      href: "/tools-practices/version-control",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
    },
    {
      title: "Security & Authentication",
      description:
        "Implement secure authentication, authorization, and security best practices.",
      href: "/quality-security-performance/security",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Containerization",
      description:
        "Deploy applications with Docker, Kubernetes, and modern deployment strategies.",
      href: "/containerization",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
    },
    {
      title: "Performance & Testing",
      description:
        "Optimize performance, implement testing strategies, and monitor applications.",
      href: "/quality-security-performance/testing",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Back-end Course Overview
        </h2>
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group relative no-underline"
            >
              <div className="relative flex flex-col space-y-6 bg-white p-6 ring-1 ring-gray-900/5 rounded-xl h-full w-full leading-none">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center bg-blue-50 p-2 rounded-lg h-12 w-12">
                    <div className="text-blue-600">{guide.icon}</div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800">{guide.title}</p>
                  </div>
                </div>
                <p className="leading-6 text-slate-600 text-sm">
                  {guide.description}
                </p>
                <p className="font-medium text-blue-600 text-sm">
                  Start learning{" "}
                  <FaChevronRight className="inline duration-300 group-hover:translate-x-2 ease-in-out" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
