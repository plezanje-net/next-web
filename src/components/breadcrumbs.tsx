import Link from "./ui/link";

type TCrumb = {
  label: string;
  link: string | null;
};

type TBreadcrumbsProps = {
  crumbs: TCrumb[];
};

function Breadcrumbs({ crumbs }: TBreadcrumbsProps) {
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
