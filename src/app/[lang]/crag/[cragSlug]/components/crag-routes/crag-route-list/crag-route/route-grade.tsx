import Grade from "../../../../../../../../components/grade";
import Dialog, {
  DialogSize,
} from "../../../../../../../../components/ui/dialog";
import { Route } from "../../../../../../../../graphql/generated";
import DifficultyVotes from "./difficulty-votes";

interface RouteGradeProps {
  route: Route;
}

function RouteGrade({ route }: RouteGradeProps) {
  const handleOpenRoutePage = () => {};
  const handleCloseDialog = () => {};

  return (
    <Dialog
      openTrigger={
        <button>
          {route.isProject && "P"}
          {route.difficulty && <Grade difficulty={route.difficulty} />}
        </button>
      }
      dialogSize={DialogSize.hug}
      title="Glasovi uporabnikov"
      confirm={{ label: "Več", callback: handleOpenRoutePage }}
      cancel={{ label: "Zapri", callback: handleCloseDialog }}
    >
      <DifficultyVotes route={route} />
    </Dialog>
  );
}

export default RouteGrade;
