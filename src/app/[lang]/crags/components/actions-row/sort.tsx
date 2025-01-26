import Button from "@/components/ui/button";
import IconSort from "@/components/ui/icons/sort";
import { Select, Option } from "@/components/ui/select";
import { useCragsContext } from "../../lib/crags-context";

function Sort() {
  const {
    sort: { sort, setSort },
  } = useCragsContext();

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
      <Option value="name,asc">Po abecedi, naraščajoče</Option>
      <Option value="name,desc">Po abecedi, padajoče</Option>
      <Option value="nrRoutes,asc">Po št. smeri, naraščajoče</Option>
      <Option value="nrRoutes,desc">Po št. smeri, padajoče</Option>
      <Option value="maxDifficulty,asc">Po najtežji smeri, naraščajoče</Option>
      <Option value="maxDifficulty,desc">Po najtežji smeri, padajoče</Option>
      <Option value="minDifficulty,asc">Po najlažji smeri, naraščajoče</Option>
      <Option value="minDifficulty,desc">Po najlažji smeri, padajoče</Option>
      <Option value="approachTime,asc">Po času dostopa, naraščajoče</Option>
      <Option value="approachTime,desc">Po času dostopa, padajoče</Option>
    </Select>
  );
}

export default Sort;
