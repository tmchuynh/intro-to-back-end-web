// Import plugins for enhanced code block functionality
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// Next.js MDX integration
import createMDX from "@next/mdx";

// Rehype plugins for HTML processing (runs after markdown -> HTML conversion)
import rehypeAutolinkHeadings from "rehype-autolink-headings"; // Adds anchor links to headings
import rehypeExpressiveCode from "rehype-expressive-code"; // Enhanced code block styling and features
import rehypeSlug from "rehype-slug"; // Generates URL-friendly slugs for headings

// Remark plugins for markdown processing (runs before HTML conversion)
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown support
import remarkNormalizeHeadings from "remark-normalize-headings"; // Normalize heading levels for consistent TOC generation
import remarkToc from "remark-toc"; // Table of contents generation

// Custom plugin for auto-collapsing function code blocks
import { remarkAutoCollapseFunctions } from "./src/lib/remark-auto-collapse.mjs";

/**
 * Configuration options for rehype-expressive-code plugin
 * This plugin enhances code blocks with advanced features like syntax highlighting,
 * line numbers, and collapsible sections
 * @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions}
 */
const rehypeExpressiveCodeOptions = {
  // Enable additional plugins for code blocks
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],

  // Define light and dark themes for code syntax highlighting
  themes: ["github-light-default", "github-dark-default"],

  // Custom CSS selector function to integrate with next-themes
  themeCssSelector: (theme) => {
    if (theme.name === "github-light-default") return ".light";
    if (theme.name === "github-dark-default") return ".dark";
    return `[data-theme="${theme.name}"]`;
  },

  // Disable automatic dark mode detection to use next-themes manual control instead
  useDarkModeMediaQuery: false,

  defaultProps: {
    // Enable word wrap by default for better mobile experience
    wrap: true,
    // Disable wrapped line indentation for terminal languages
    overridesByLang: {
      "bash,ps,sh": { preserveIndent: false, frame: "none" },
    },
    // Allows re-collapsing sections
    collapseStyle: "collapsible-start",
  },
};

/**
 * Next.js configuration object
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Configure file extensions that Next.js will treat as pages
  // This allows .md and .mdx files to be rendered as pages
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Enable React Strict Mode for additional development warnings
  reactStrictMode: true,
};

/**
 * Create MDX configuration with custom plugins and options
 * This enables MDX processing in Next.js with enhanced markdown features
 */
const withMDX = createMDX({
  // File extension pattern for MDX files
  extension: /\.mdx?$/,

  // Plugin configuration for markdown processing
  options: {
    // Remark plugins process the markdown before conversion to HTML
    remarkPlugins: [
      remarkGfm, // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
      remarkNormalizeHeadings, // Normalize heading levels for consistent TOC generation
      remarkAutoCollapseFunctions, // Custom plugin to auto-collapse function code blocks
      [
        remarkToc, // Generate table of contents
        {
          maxDepth: 2, // Allow up to h4
          tight: true, // Compile list items tightly
        },
      ],
    ],

    // Rehype plugins process the HTML after markdown conversion
    rehypePlugins: [
      rehypeSlug, // Generate URL-friendly slugs for headings (must come before autolink)
      [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
      [
        // Add clickable anchor links to headings
        rehypeAutolinkHeadings,
        {
          // Wrap the entire heading content with the link
          properties: {
            className: ["anchor"], // Add 'anchor' CSS class for styling
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
