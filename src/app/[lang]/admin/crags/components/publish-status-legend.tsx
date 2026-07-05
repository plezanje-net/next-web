import IconDot from "@/components/ui/icons/dot";
import { IconSize } from "@/components/ui/icons/icon-size";

type PublishStatusLegendProps = {
  className?: string;
};

function PublishStatusLegend({ className }: PublishStatusLegendProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex gap-1">
        <div className="text-red-100">
          <IconDot size={IconSize.regular} />
        </div>
        Osnutek
      </div>
      <div className="flex gap-1">
        <div className="text-amber-100">
          <IconDot size={IconSize.regular} />
        </div>
        V pregledu
      </div>
    </div>
  );
}
export default PublishStatusLegend;
