import Button from "@/components/ui/button";
import IconSort from "@/components/ui/icons/sort";
import { Select, Option } from "@/components/ui/select";
import { toggleQueryParam } from "@/utils/route-helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Sort() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const sort = searchParams.get('sort') || 'date,desc';
  
  function setSort (value: string) {
    toggleQueryParam(router, pathname, searchParams, 'sort', value);
  }

  return (
    <Select
      customTrigger={
        <Button variant="quaternary">
          <div className="flex">
            <IconSort />
            <span className="ml-2 max-lg:hidden">Uredi</span>
          </div>
        </Button>
      }
      value={sort}
      onChange={setSort}
    >
      <Option value="date,asc">Po datumu naraščajoče</Option>
      <Option value="date,desc">Po datumu, padajoče</Option>
      <Option value="grade,asc">Po težavnosti, naraščajoče</Option>
      <Option value="grade,desc">Po težavnosti, padajoče</Option>
    </Select>
  );
}

export default Sort;
