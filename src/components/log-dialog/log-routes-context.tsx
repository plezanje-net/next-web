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
import { TDate } from "../ui/date-picker";

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
    lastTryDate?: string;
    lastTickDate?: string;
    lastTrTickDate?: string;
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
  logDate: TDate;
  setLogDate: Dispatch<SetStateAction<TDate>>;
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
  hiddenAscentTypesMap: Record<string, Set<AscentType>>;
};

const LogRoutesContext = createContext<TLogRoutesContext | undefined>(
  undefined
);

function LogRoutesProvider({ children }: { children: ReactNode }) {
  const [logDate, setLogDate] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

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
  const hiddenAscentTypesMap: Record<string, Set<AscentType>> = {};

  // Validate ascent types for all routes being logged
  for (let i = 0; i < logRoutes.length; i++) {
    const currentRoute = logRoutes[i];
    const currentRouteImpossibleAscentTypes = calculateImpossibleAscentTypes(
      logDate,
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

    // either redpoint or repeat is to be shown, hide the other
    hiddenAscentTypesMap[currentRoute.key] = new Set();
    if (currentRouteImpossibleAscentTypes.has(AscentType.Redpoint)) {
      hiddenAscentTypesMap[currentRoute.key].add(AscentType.Redpoint);
    } else {
      hiddenAscentTypesMap[currentRoute.key].add(AscentType.Repeat);
    }
    if (currentRouteImpossibleAscentTypes.has(AscentType.TRedpoint)) {
      hiddenAscentTypesMap[currentRoute.key].add(AscentType.TRedpoint);
    } else {
      hiddenAscentTypesMap[currentRoute.key].add(AscentType.TRepeat);
    }
  }

  return (
    <LogRoutesContext.Provider
      value={{
        crag,
        logDate,
        setLogDate,
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
        hiddenAscentTypesMap,
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
      lastTryDate: "2024-06-02",
      lastTickDate: "2024-06-04",
    },
  },
  {
    id: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    key: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    name: "Klobasa",
    difficulty: 1700,
    defaultGradingSystemId: "french",
    usersHistory: {
      lastTryDate: "2024-06-04",
      lastTrTickDate: "2024-06-04",
    },
  },
  {
    id: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    key: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    name: "Krvavica",
    difficulty: 1350,
    defaultGradingSystemId: "french",
    usersHistory: {},
  },
];

// Helpers

// For a single route, get a set of ascent types that are not possible, based on users previous ascents
const calculateImpossibleAscentTypes = (
  logDate: TDate,
  route: TLogRoute,
  routeIndex: number,
  allLogRoutes: TLogRoute[],
  ascentTypesMap: TAscentTypesMap
) => {
  // Start with all possible ascentTypes
  const impossibleAscentTypesForRoute = new Set<AscentType>();

  // If a date is not set, then everything is possible since we do not know where the ascent should be inserted
  if (logDate.day != "dd" && logDate.month != "mm" && logDate.year != "llll") {
    // Initially remove repeat, because repeat needs at least one tick ascent before it
    impossibleAscentTypesForRoute.add(AscentType.Repeat);
    impossibleAscentTypesForRoute.add(AscentType.TRepeat);

    const date = dayjs(`${logDate.year}-${logDate.month}-${logDate.day}`); // e.g.: "2020-01-05";

    if (
      route.usersHistory.lastTryDate &&
      dayjs(route.usersHistory.lastTryDate).isBefore(date)
    ) {
      // If the user has tried this route before, remove onsight and flash
      impossibleAscentTypesForRoute.add(AscentType.Onsight);
      impossibleAscentTypesForRoute.add(AscentType.TOnsight);
      impossibleAscentTypesForRoute.add(AscentType.Flash);
      impossibleAscentTypesForRoute.add(AscentType.TFlash);
    }

    // if (hasBeenTickedBefore(date, route.usersHistory.ascents)) {
    if (
      route.usersHistory.lastTickDate &&
      dayjs(route.usersHistory.lastTickDate).isBefore(date)
    ) {
      // If the user has ticked the route, remove redpoint and add repeat
      impossibleAscentTypesForRoute.add(AscentType.Redpoint);
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
      impossibleAscentTypesForRoute.delete(AscentType.Repeat);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
    }

    // if (hasBeenTrTickedBefore(date, route.usersHistory.ascents)) {
    if (
      route.usersHistory.lastTrTickDate &&
      dayjs(route.usersHistory.lastTrTickDate).isBefore(date)
    ) {
      // If the user has ticked on toprope the route, remove toprope redpoint and add toprope repeat
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
    }
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
