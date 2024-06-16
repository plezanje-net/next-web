import { AscentType, PublishType } from "@/graphql/generated";
import dayjs from "dayjs";
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
  usersHistory: {
    lastDifficultyVote?: {
      difficulty: number;
      date: string;
    };
    lastStarRatingVote?: {
      starRating: number;
      date: string;
    };
    // lastTick?: {
    //   ascentType: AscentType;
    //   date: string;
    // };
    // lastTouch?: {
    //   ascentType: AscentType;
    //   date: string;
    // };
    ascents: { ascentType: AscentType; date: string }[];
  };
};

const tickAscentTypes = [
  AscentType.Onsight,
  AscentType.Flash,
  AscentType.Redpoint,
  AscentType.Repeat,
];

const trTickAscentTypes = [
  AscentType.TOnsight,
  AscentType.TFlash,
  AscentType.TRedpoint,
  AscentType.TRepeat,
];

type TAscentTypesMap = Record<string, AscentType | null>;

type TLogRoutesContext = {
  crag: { id: string; name: string };
  logRoutes: TLogRoute[];
  setLogRoutes: Dispatch<SetStateAction<TLogRoute[]>>;
  ascentTypesMap: TAscentTypesMap;
  setRouteAscentType: (key: string, at: AscentType | null) => void;
  difficultyVotesMap: Record<string, number>;
  setRouteDifficultyVote: (key: string, dv: number | null) => void;
  starRatingVotesMap: Record<string, number>;
  setRouteStarRatingVote: (key: string, srv: number | null) => void;
  publishTypesMap: Record<string, PublishType>;
  setRoutePublishType: (key: string, pt: PublishType) => void;
  impossibleAscentTypesMap: Record<string, Set<AscentType>>;
};

const LogRoutesContext = createContext<TLogRoutesContext | undefined>(
  undefined
);

function LogRoutesProvider({ children }: { children: ReactNode }) {
  const [logRoutes, setLogRoutes] = useState(routes);

  const [ascentTypesMap, setAscentTypesMap] = useState<TAscentTypesMap>({}); // route.key:ascentType
  const setRouteAscentType = (
    key: string,
    newAscentType: AscentType | null
  ) => {
    setAscentTypesMap((ats) => ({ ...ats, [key]: newAscentType }));

    // if ascent type has been changed, we might also need to reset the difficulty vote
    if (!newAscentType || !tickAscentTypes.includes(newAscentType)) {
      setRouteDifficultyVote(key, null);
    }
  };

  const [difficultyVotesMap, setDifficultyVotesMap] = useState({}); // route.key:diffVote
  const setRouteDifficultyVote = (
    key: string,
    newDifficultyVote: number | null
  ) => {
    setDifficultyVotesMap((dvs) => ({ ...dvs, [key]: newDifficultyVote }));
  };

  const [starRatingVotesMap, setStarRatingVotesMap] = useState({}); // route.key:starRatingVote
  const setRouteStarRatingVote = (
    key: string,
    newStarRatingVote: number | null
  ) => {
    setStarRatingVotesMap((srvs) => ({ ...srvs, [key]: newStarRatingVote }));
  };

  const [publishTypesMap, setPublishTypesMap] = useState(
    logRoutes.reduce((acc: Record<string, PublishType>, curr) => {
      acc[curr.key] = PublishType.Public;
      return acc;
    }, {})
  ); // route.key:publishType, with default to public
  const setRoutePublishType = (key: string, newPublishType: PublishType) => {
    setPublishTypesMap((pts) => ({ ...pts, [key]: newPublishType }));
  };

  const impossibleAscentTypesMap: Record<string, Set<AscentType>> = {};

  // Validate ascent types for all routes being logged
  for (let i = 0; i < logRoutes.length; i++) {
    const currentRoute = logRoutes[i];
    const currentRouteImpossibleAscentTypes = calculateImpossibleAscentTypes(
      currentRoute,
      i,
      logRoutes,
      ascentTypesMap
    );
    impossibleAscentTypesMap[currentRoute.key] =
      currentRouteImpossibleAscentTypes;

    // if the current route's ascent type is impossible, unset it
    const currentRotueAscentType = ascentTypesMap[currentRoute.key];
    if (
      currentRotueAscentType &&
      currentRouteImpossibleAscentTypes.has(currentRotueAscentType)
    ) {
      setRouteAscentType(currentRoute.key, null);
    }
  }

  return (
    <LogRoutesContext.Provider
      value={{
        crag,
        logRoutes,
        setLogRoutes,
        ascentTypesMap,
        setRouteAscentType,
        difficultyVotesMap,
        setRouteDifficultyVote,
        starRatingVotesMap,
        setRouteStarRatingVote,
        publishTypesMap,
        setRoutePublishType,
        impossibleAscentTypesMap,
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

export { LogRoutesProvider, useLogRoutesContext, tickAscentTypes };
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
    usersHistory: {
      lastDifficultyVote: {
        difficulty: 1100,
        date: "1.1.2023",
      },
      lastStarRatingVote: {
        starRating: 1,
        date: "12.9.2023",
      },
      ascents: [
        { ascentType: AscentType.Allfree, date: "2020-01-02" },
        { ascentType: AscentType.Flash, date: "2020-01-04" },
      ],
    },
  },
  {
    id: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    key: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    name: "Klobasa",
    difficulty: 1700,
    defaultGradingSystemId: "french",
    usersHistory: {
      ascents: [{ ascentType: AscentType.Redpoint, date: "2020-01-03" }],
    },
  },
  {
    id: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    key: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    name: "Krvavica",
    difficulty: 1350,
    defaultGradingSystemId: "french",
    usersHistory: { ascents: [] },
  },
];

// Helpers

const hasBeenTriedBefore = (
  date: string,
  ascents: { ascentType: AscentType; date: string }[]
) => {
  // assuming that ascents are in order from oldest to newest !

  if (ascents.length == 0) return false; // no ascents, no tries

  // if there is at least one ascent that has a date before the passed date, a route has certanly been tried

  const first = ascents[0];
  if (dayjs(first.date).isBefore(dayjs(date))) return true;

  return false;

  // TODO: what about duplicated routes??
};

const hasBeenTickedBefore = (
  date: string,
  ascents: { ascentType: AscentType; date: string }[]
) => {
  const tickAscents = ascents.filter((a) =>
    tickAscentTypes.includes(a.ascentType)
  );

  if (tickAscents.length == 0) return false;

  const firstTick = ascents[0];
  if (dayjs(firstTick.date).isBefore(dayjs(date))) return true;

  return false;
};

const hasBeenTrTickedBefore = (
  date: string,
  ascents: { ascentType: AscentType; date: string }[]
) => {
  const trTickAscents = ascents.filter((a) =>
    trTickAscentTypes.includes(a.ascentType)
  );

  if (trTickAscents.length == 0) return false;

  const firstTrTick = ascents[0];
  if (dayjs(firstTrTick.date).isBefore(dayjs(date))) return true;

  return false;
};

// TODO: for above tests, we probably only realy need 3 dates: firstTick, firstTrTick, firstTry

// for a single route, get a set of ascent types that are not possible, based on users previous ascents
// TODO: pass in date
const calculateImpossibleAscentTypes = (
  route: TLogRoute,
  routeIndex: number,
  allLogRoutes: TLogRoute[],
  ascentTypesMap: TAscentTypesMap
) => {
  // have to assume that a date is set. If it is not, then everything is possible since we do not know where the ascent should be inserted
  // TODO: except multiple routes at once... there, there are still some limitations

  const date = "2020-01-05";

  // Start with all possible ascentTypes
  const impossibleAscentTypesForRoute = new Set<AscentType>();

  // Initially remove repeat, because repeat needs at least one tick ascent before it
  impossibleAscentTypesForRoute.add(AscentType.Repeat);
  impossibleAscentTypesForRoute.add(AscentType.TRepeat);

  if (hasBeenTriedBefore(date, route.usersHistory.ascents)) {
    // If the user has tried this route before, remove onsight and flash
    impossibleAscentTypesForRoute.add(AscentType.Onsight);
    impossibleAscentTypesForRoute.add(AscentType.TOnsight);
    impossibleAscentTypesForRoute.add(AscentType.Flash);
    impossibleAscentTypesForRoute.add(AscentType.TFlash);
  }

  if (hasBeenTickedBefore(date, route.usersHistory.ascents)) {
    // If the user has ticked the route, remove redpoint and add repeat
    impossibleAscentTypesForRoute.add(AscentType.Redpoint);
    impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
    impossibleAscentTypesForRoute.delete(AscentType.Repeat);
    impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
  }

  if (hasBeenTrTickedBefore(date, route.usersHistory.ascents)) {
    // If the user has ticked on toprope the route, remove toprope redpoint and add toprope repeat
    impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
    impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
  }

  // Finally go through all instances of the same route, preceeding this route (if any) and consider them as already logged ascents before the current one
  for (let i = 0; i < routeIndex; i++) {
    const prevRoute = allLogRoutes[i];
    if (prevRoute.id != route.id) {
      continue;
    }

    const prevRouteAscentType = ascentTypesMap[prevRoute.key];

    // Remove onsight and flash right away, because any log preceeding this one is a try
    impossibleAscentTypesForRoute.add(AscentType.Onsight);
    impossibleAscentTypesForRoute.add(AscentType.TOnsight);
    impossibleAscentTypesForRoute.add(AscentType.Flash);
    impossibleAscentTypesForRoute.add(AscentType.TFlash);

    // Add repeat and remove redpoint if there is a tick log preceeding this one
    if (prevRouteAscentType && tickAscentTypes.includes(prevRouteAscentType)) {
      impossibleAscentTypesForRoute.delete(AscentType.Repeat);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
      impossibleAscentTypesForRoute.add(AscentType.Redpoint);
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
    }

    // If there is a toprope tick log preceeding this one then toprope redpoint is not possible anymore, and toprope repeat becomes possible
    if (
      prevRouteAscentType &&
      trTickAscentTypes.includes(prevRouteAscentType)
    ) {
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
    }
  }
  return impossibleAscentTypesForRoute;
};
