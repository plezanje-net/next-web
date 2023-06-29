"use client";
import Link from "../../../components/ui/link";

function LinkPage() {
  return (
    <div className="m-8">
      <h3>Link demo</h3>

      <div className="mt-14 w-80">
        <h5>A default (primary) link</h5>
        <div className="mt-4">
          <Link href="">This is a link.</Link>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A secondary link</h5>
        <div className="mt-4">
          <Link
            href="http://www.google.com"
            target="_blank"
            variant="secondary"
          >
            This is a link.
          </Link>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled link</h5>
        <div className="mt-4">
          <Link href="" isDisabled>
            This is a link.
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Test focus, pressed, hover states.</li>
            <li>
              Use primary links where there are only a few and where they should
              stand out.
            </li>
            <li>
              Use secondary links where too many links would make the page
              &lsquo;all blue&rsquo;.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LinkPage;
