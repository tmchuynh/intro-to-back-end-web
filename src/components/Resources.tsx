import Link from "next/link";

export default function Resources() {
  const resources = [
    {
      title: "MDN Web Docs",
      description: "The authoritative guide for HTML, CSS, and JavaScript.",
      href: "https://developer.mozilla.org/",
      external: true,
    },
    {
      title: "Can I Use",
      description: "Check browser compatibility for web technologies.",
      href: "https://caniuse.com/",
      external: true,
    },
    {
      title: "CSS-Tricks",
      description: "Articles, guides, and snippets for modern CSS techniques.",
      href: "https://css-tricks.com/",
      external: true,
    },
    {
      title: "JavaScript.info",
      description: "In-depth JavaScript tutorials from beginner to advanced.",
      href: "https://javascript.info/",
      external: true,
    },
    {
      title: "freeCodeCamp",
      description: "Free coding bootcamp with hands-on projects.",
      href: "https://www.freecodecamp.org/",
      external: true,
    },
    {
      title: "Web Accessibility Guidelines",
      description: "WCAG guidelines for building accessible websites.",
      href: "https://www.w3.org/WAI/WCAG21/quickref/",
      external: true,
    },
    {
      title: "Course Vocabulary",
      description: "Essential web development terms and definitions.",
      href: "/vocabulary",
      external: false,
    },
    {
      title: "Developer Resources",
      description:
        "Tools, hosting, and deployment resources for web developers.",
      href: "/developer-tools-and-resources",
      external: false,
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Essential Resources
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
