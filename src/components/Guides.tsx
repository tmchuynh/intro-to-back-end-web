import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Guides() {
  const guides = [
    {
      title: "HTML Fundamentals",
      description:
        "Master semantic HTML, document structure, and accessibility best practices.",
      href: "/intro-to-html",
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "CSS Styling",
      description:
        "Learn CSS for beautiful layouts, responsive design, and modern styling techniques.",
      href: "/intro-to-css",
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "JavaScript Programming",
      description:
        "Add interactivity and dynamic behavior with JavaScript fundamentals.",
      href: "/intro-to-javascript",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Developer Tools",
      description:
        "Essential tools every web developer needs including Git, browser DevTools, and more.",
      href: "/developer-tools-and-resources",
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Build Real Projects",
      description:
        "Apply your skills with hands-on projects like a quiz app and portfolio website.",
      href: "/quiz-app",
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "React & Modern Frameworks",
      description:
        "Explore React, Next.js, and modern development tools for building advanced applications.",
      href: "/react",
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Course Overview
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
