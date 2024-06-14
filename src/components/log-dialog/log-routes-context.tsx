import { AscentType, PublishType } from "@/graphql/generated";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TLogRoute = {
  id: string;
  key: string;
  name: string;
  difficulty: number;
  defaultGradingSystemId: "french" | "uiaa" | "yds"; // TODO:... get type from api ?
  usersLastDifficultyVote?: {
    difficulty: number;
    date: string;
  };
  usersLastStarRatingVote?: {
    starRating: number;
    date: string;
  };
};

type TLogRoutesContext = {
  crag: { id: string; name: string };
  logRoutes: TLogRoute[];
  setLogRoutes: Dispatch<SetStateAction<TLogRoute[]>>;
  ascentTypes: Record<string, AscentType>;
  setAscentType: (key: string, at: AscentType) => void;
  difficultyVotes: Record<string, number>;
  setDifficultyVote: (key: string, dv: number | null) => void;
  starRatingVotes: Record<string, number>;
  setStarRatingVote: (key: string, srv: number | null) => void;
  publishTypes: Record<string, PublishType>;
  setPublishType: (key: string, pt: PublishType) => void;
};

const LogRoutesContext = createContext<TLogRoutesContext | undefined>(
  undefined
);

function LogRoutesProvider({ children }: { children: ReactNode }) {
  const [logRoutes, setLogRoutes] = useState(routes);

  const [ascentTypes, setAscentTypes] = useState({}); // route.key:ascentType
  const setAscentType = (key: string, newAscentType: AscentType) => {
    setAscentTypes((ats) => ({ ...ats, [key]: newAscentType }));
  };

  const [difficultyVotes, setDifficultyVotes] = useState({}); // route.key:diffVote
  const setDifficultyVote = (key: string, newDifficultyVote: number | null) => {
    setDifficultyVotes((dvs) => ({ ...dvs, [key]: newDifficultyVote }));
  };

  const [starRatingVotes, setStarRatingVotes] = useState({}); // route.key:starRatingVote
  const setStarRatingVote = (key: string, newStarRatingVote: number | null) => {
    setStarRatingVotes((srvs) => ({ ...srvs, [key]: newStarRatingVote }));
  };

  const [publishTypes, setPublishTypes] = useState(
    logRoutes.reduce((acc: Record<string, PublishType>, curr) => {
      acc[curr.key] = PublishType.Public;
      return acc;
    }, {})
  ); // route.key:publishType, with default to public
  const setPublishType = (key: string, newPublishType: PublishType) => {
    setPublishTypes((pts) => ({ ...pts, [key]: newPublishType }));
  };

  return (
    <LogRoutesContext.Provider
      value={{
        crag,
        logRoutes,
        setLogRoutes,
        ascentTypes,
        setAscentType,
        difficultyVotes,
        setDifficultyVote,
        starRatingVotes,
        setStarRatingVote,
        publishTypes,
        setPublishType,
      }}
    >
      {children}
    </LogRoutesContext.Provider>
  );
}

function useLogRoutesContext() {
  const logRoutesContext = useContext(LogRoutesContext);
  if (logRoutesContext === undefined) {
    throw new Error(
      "useLogRoutesContext must be used within a LogRoutesProvider"
    );
  }
  return logRoutesContext;
}

export { LogRoutesProvider, useLogRoutesContext };
export type { TLogRoute };

//TODO: Temp dummy. Do we expect to get this from localstorage?

const crag = {
  id: "c08c95e7-03a1-4a7a-b082-bb4aa941c7e6",
  name: "Mišja peč",
};

const routes: TLogRoute[] = [
  {
    id: "e6764a1d-1766-41a3-b7b7-4dd27f1eba27",
    key: "e6764a1d-1766-41a3-b7b7-4dd27f1eba27",
    name: "Hrenovka",
    difficulty: 1136,
    defaultGradingSystemId: "french",
    usersLastDifficultyVote: {
      difficulty: 1100,
      date: "1.1.2023",
    },
    usersLastStarRatingVote: {
      starRating: 1,
      date: "12.9.2023",
    },
  },
  {
    id: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    key: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    name: "Klobasa",
    difficulty: 1700,
    defaultGradingSystemId: "french",
  },
  {
    id: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    key: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    name: "Krvavica",
    difficulty: 1350,
    defaultGradingSystemId: "french",
  },
];
