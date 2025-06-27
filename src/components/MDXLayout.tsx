export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-4xl prose prose-gray">{children}</article>
  );
}
