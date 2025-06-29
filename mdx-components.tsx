import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { JSX } from "react";
import Button from "./src/components/Button";
import Guides from "./src/components/Guides";
import Resources from "./src/components/Resources";

interface Props {
  children: React.ReactNode;
  level: number;
  id: string;
  className?: string;
}

export function CustomHeading({ children, level, id, className }: Props) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  // Don't apply custom classes if this is the table-of-contents heading
  const finalClassName =
    id === "table-of-contents"
      ? "scroll-mt-24 text-accent"
      : `scroll-mt-24 ${className}`;

  return (
    <Component id={id} className={finalClassName}>
      {children}
    </Component>
  );
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, ...props }) => (
      <CustomHeading
        className="my-6 font-[IbarraRealNova] font-extrabold text-5xl"
        level={1}
        id={props.id}
      >
        {children}
      </CustomHeading>
    ),
    h2: ({ children, ...props }) => (
      <CustomHeading
        level={2}
        id={props.id}
        className="my-4 font-[IbarraRealNova] font-black text-3xl text-primary tracking-tighter"
      >
        {children}
      </CustomHeading>
    ),
    h3: ({ children, ...props }) => (
      <CustomHeading
        level={3}
        id={props.id}
        className="my-4 font-[IbarraRealNova] font-light text-2xl text-secondary tracking-wide"
      >
        {children}
      </CustomHeading>
    ),
    h4: ({ children, ...props }) => (
      <CustomHeading
        level={4}
        id={props.id}
        className="mb-4 mt-7 font-[DMSerifText] text-accent text-xl"
      >
        {children}
      </CustomHeading>
    ),
    h5: ({ children, ...props }) => (
      <CustomHeading
        level={5}
        id={props.id}
        className="mt-6 decoration-border font-[DMSerifText] text-lg text-tertiary"
      >
        {children}
      </CustomHeading>
    ),
    h6: ({ children, ...props }) => (
      <CustomHeading
        level={6}
        id={props.id}
        className="my-1 font-[IbarraRealNova] text-accent text-base tracking-wider underline decoration-double"
      >
        {children}
      </CustomHeading>
    ),
    ul: ({ children }) => (
      <ul className="space-y-1 list-disc list-outside">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-1 my-1 list-decimal list-outside">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1 ml-9">{children}</li>,
    code: ({ children }) => (
      <code className="my-5 py-1 font-[CascadiaCode] font-semibold text-code text-sm">
        {children}
      </code>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    // Table components
    table: ({ children }) => (
      <>
        <br />
        <table className="shadow-md rounded-lg min-w-full overflow-clip">
          {children}
        </table>
        <br />
      </>
    ),
    thead: ({ children }) => <thead className="">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="bg-table-body text-table-body-foreground">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-table-hover text-left transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="bg-table-head px-6 py-3 font-medium text-table-head-foreground tracking-wider uppercase">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 border-b-1 border-border text-sm">{children}</td>
    ),
    img: ({ src, alt, ...props }) => (
      <Image
        src={src as string}
        alt={alt as string}
        className="mx-auto my-6 rounded-lg"
        {...props}
        width={props.width || 800}
        height={props.height || 600}
      />
    ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    // Custom components
    Button,
    Guides,
    Resources,
    ...components,
  };
}
