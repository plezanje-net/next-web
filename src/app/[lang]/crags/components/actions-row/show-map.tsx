import Button from "@/components/ui/button";
import IconMap from "@/components/ui/icons/map";

function ShowMap() {
  return (
    <Button variant="quaternary">
      <div className="flex">
        <IconMap />
        <span className="ml-2 max-lg:hidden">Pokaži zemljevid</span>
      </div>
    </Button>
  );
}
export default ShowMap;
