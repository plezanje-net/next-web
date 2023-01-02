import IconColumns from "../../components/ui/icons/columns";
import IconFilter from "../../components/ui/icons/filter";
import IconMerge from "../../components/ui/icons/merge";
import IconSort from "../../components/ui/icons/sort";
import IconUnmerge from "../../components/ui/icons/unmerge";

function CragTableActionsPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Crag table actions demo</h1>

      <div className="mt-10">
        <IconFilter />
        <IconMerge />
        <IconUnmerge />
        <IconSort />
        <IconColumns />
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Add notes if any...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CragTableActionsPage;
