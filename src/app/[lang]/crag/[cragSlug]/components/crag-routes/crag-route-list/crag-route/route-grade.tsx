import { useRouter } from "next/navigation";
import Dialog, {
  DialogSize,
} from "../../../../../../../../components/ui/dialog";
import DifficultyVotes from "./difficulty-votes";
import { Crag, DifficultyVote, Route } from "@/graphql/generated";
import Grade from "@/components/grade";
import useIsVisible from "@/hooks/useIsVisible";
import { useEffect, useRef, useState } from "react";
import difficultyVotesAction from "./server-actions/difficulty-votes-action";

interface RouteGradeProps {
  route: Route;
  crag: Crag;
}

function RouteGrade({ route, crag }: RouteGradeProps) {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  const handleOpenRoutePage = () => {
    router.push(`/plezalisce/${crag.slug}/smer/${route.slug}`);
  };

  const visible = useIsVisible(ref);

  const [difficultyVotes, setDifficultyVotes] = useState<DifficultyVote[]>([]);

  useEffect(() => {
    if (visible) {
      difficultyVotesAction(route.id).then((votes) => {
        setDifficultyVotes(votes);
      });
    }
  }, [visible, route.id]);

  return route.isProject ? (
    <>P</>
  ) : (
    <Dialog
      openTrigger={
        <button ref={ref}>
          {route.difficulty && <Grade difficulty={route.difficulty} />}
        </button>
      }
      dialogSize={DialogSize.medium}
      title="Glasovi uporabnikov"
      confirm={{ label: "Več", callback: handleOpenRoutePage }}
      cancel={{ label: "Zapri" }}
    >
      <DifficultyVotes route={route} difficultyVotes={difficultyVotes} />
    </Dialog>
  );
}

export default RouteGrade;
