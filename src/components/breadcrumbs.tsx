import Link from "./ui/link";

type Crumb = {
  label: string;
  link: string | null;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav>
      <ol className="flex flex-wrap">
        {crumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.link ? (
              <Link variant="secondary" href={crumb.link}>
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < crumbs.length - 1 && <span className="px-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
