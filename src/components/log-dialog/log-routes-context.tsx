import { AscentType, Crag, PublishType } from "@/graphql/generated";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TDate } from "../ui/date-picker";
import tickAscentTypes from "@/utils/constants/tick-ascent-types";
import trTickAscentTypes from "@/utils/constants/tr-tick-ascent-types";

type TLogRoute = {
  id: string;
  key: string;
  name: string;
  difficulty: number | null;
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

    firstTickDate?: string | null;
    firstTryDate?: string | null;
    firstTrTickDate?: string | null;
  };
};

type TAscentTypesMap = Record<string, AscentType | null>;

type TLogRoutesContext = {
  crag: { id: string; name: string };
  logDate: TDate;
  setLogDate: Dispatch<SetStateAction<TDate>>;
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
  logRoutes: TLogRoute[];
  setLogRoutes: Dispatch<SetStateAction<TLogRoute[]>>;
  resetAll: () => void;
};

const LogRoutesContext = createContext<TLogRoutesContext | undefined>(
  undefined
);

type TLogRoutesProviderProps = {
  logRoutes: TLogRoute[];
  setLogRoutes: Dispatch<SetStateAction<TLogRoute[]>>;
  crag: Crag;
  children: ReactNode;
};

function LogRoutesProvider({
  logRoutes,
  setLogRoutes,
  crag,
  children,
}: TLogRoutesProviderProps) {
  const [logDate, setLogDate] = useState<TDate>({
    day: "dd",
    month: "mm",
    year: "llll",
  });

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

  const [publishTypesMap, setPublishTypesMap] = useState<
    Record<string, PublishType>
  >({}); // route.key:publishType, with default to public

  // Set default publishType for routes that don't have it set yet
  useEffect(() => {
    setPublishTypesMap((prevPTMap) =>
      logRoutes.reduce((ptMap: Record<string, PublishType>, route) => {
        if (!prevPTMap[route.key]) {
          ptMap[route.key] = PublishType.Public;
        } else {
          ptMap[route.key] = prevPTMap[route.key];
        }
        return ptMap;
      }, {})
    );
  }, [logRoutes]);

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

  const resetAll = () => {
    setLogDate({ day: "dd", month: "mm", year: "llll" });
    setAscentTypesMap({});
    setDifficultyVotesMap({});
    setStarRatingVotesMap({});
    setPublishTypesMap({});
    setLogRoutes([]);
  };

  return (
    <LogRoutesContext.Provider
      value={{
        crag,
        logDate,
        setLogDate,
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
        logRoutes,
        setLogRoutes,
        resetAll,
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

    dayjs.extend(isSameOrBefore);
    const logDateJs = dayjs(`${logDate.year}-${logDate.month}-${logDate.day}`);

    if (
      route.usersHistory.firstTryDate &&
      dayjs(route.usersHistory.firstTryDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has tried this route before, remove onsight and flash
      impossibleAscentTypesForRoute.add(AscentType.Onsight);
      impossibleAscentTypesForRoute.add(AscentType.TOnsight);
      impossibleAscentTypesForRoute.add(AscentType.Flash);
      impossibleAscentTypesForRoute.add(AscentType.TFlash);
    }

    if (
      route.usersHistory.firstTickDate &&
      dayjs(route.usersHistory.firstTickDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has ticked the route before, remove redpoint and add repeat
      impossibleAscentTypesForRoute.add(AscentType.Redpoint);
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
      impossibleAscentTypesForRoute.delete(AscentType.Repeat);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
    }

    if (
      route.usersHistory.firstTrTickDate &&
      dayjs(route.usersHistory.firstTrTickDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has toprope ticked the route before, remove toprope redpoint and add toprope repeat
      impossibleAscentTypesForRoute.add(AscentType.TRedpoint);
      impossibleAscentTypesForRoute.delete(AscentType.TRepeat);
    }
  }

  // Finally go through all instances of the same route preceeding this route (if any) and consider them as already logged ascents before the current one
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
