import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-gray-200 dark:border-gray-700 border-b -900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold text-gray-900 text-xl dark:text-white"
            >
              Intro to Web
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 font-medium text-gray-900 text-sm hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 font-medium text-gray-900 text-sm hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
            >
              About
            </Link>
            <Link
              href="/mdx-demo"
              className="px-3 py-2 font-medium text-gray-900 text-sm hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
            >
              MDX Demo
            </Link>
            <Link
              href="/interactive"
              className="px-3 py-2 font-medium text-gray-900 text-sm hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
            >
              Interactive
            </Link>
            <Link
              href="/code-demo"
              className="px-3 py-2 font-medium text-gray-900 text-sm hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
            >
              Code Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
