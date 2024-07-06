import { AscentType, Crag, PublishType } from "@/graphql/generated";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
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
  logFormData: {
    ascentType?: AscentType | null;
    difficultyVote?: number | null;
    starRatingVote?: number | null;
    publishType: PublishType;
    impossibleAscentTypes: Set<AscentType>;
    hiddenAscentTypes: Set<AscentType>;
  };
};

type TLogRoutesContext = {
  crag: { id: string; name: string };
  logDate: TDate;
  setLogDate: Dispatch<SetStateAction<TDate>>;
  logRoutes: TLogRoute[];
  setLogRoutes: Dispatch<SetStateAction<TLogRoute[]>>;
  setRouteAscentType: (id: string, key: string, at: AscentType | null) => void;
  setRouteDifficultyVote: (id: string, key: string, dv: number | null) => void;
  setRouteStarRatingVote: (id: string, srv: number | null) => void;
  setRoutePublishType: (key: string, pt: PublishType) => void;
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

  const setRouteDifficultyVote = useCallback(
    (id: string, key: string, newDifficultyVote: number | null) => {
      setLogRoutes((logRoutes) => {
        // all clones should be synced (where ascent types allow it)
        const newLogRoutes = [...logRoutes];

        for (let i = 0; i < logRoutes.length; i++) {
          if (logRoutes[i].id != id) {
            continue; // not this route or it's clone...
          }

          const routeToUpdate = logRoutes[i];

          if (routeToUpdate.key != key) {
            // it is a clone of this route

            const at = routeToUpdate.logFormData?.ascentType || null;
            if (at == null || !tickAscentTypes.includes(at)) {
              continue; // skip clones that are not ticks
            }

            if (newDifficultyVote == null) {
              continue; // skip clones if unsetting a dv
            }
          }

          routeToUpdate.logFormData = {
            ...routeToUpdate.logFormData,
            difficultyVote: newDifficultyVote,
          };
          newLogRoutes[i] = routeToUpdate;
        }

        return newLogRoutes;
      });
    },
    [setLogRoutes]
  );

  const setRouteAscentType = useCallback(
    (id: string, key: string, newAscentType: AscentType | null) => {
      setLogRoutes((logRoutes) => {
        const routeToUpdateIdx = logRoutes.findIndex((r) => r.key == key);
        const newLogRoutes = [...logRoutes];
        newLogRoutes[routeToUpdateIdx].logFormData.ascentType = newAscentType;
        return newLogRoutes;
      });

      // if ascent type has been changed to a nontick reset the difficulty vote
      if (!newAscentType || !tickAscentTypes.includes(newAscentType)) {
        setRouteDifficultyVote(id, key, null);
      }
    },
    [setLogRoutes, setRouteDifficultyVote]
  );

  const setRouteStarRatingVote = (
    id: string,
    newStarRatingVote: number | null
  ) => {
    setLogRoutes((logRoutes) => {
      const newLogRoutes = [...logRoutes];

      for (let i = 0; i < logRoutes.length; i++) {
        if (logRoutes[i].id != id) {
          continue; // not this route or it's clone...
        }

        const routeToUpdate = logRoutes[i];

        routeToUpdate.logFormData = {
          ...routeToUpdate.logFormData,
          starRatingVote: newStarRatingVote,
        };
        newLogRoutes[i] = routeToUpdate;
      }

      return newLogRoutes;
    });
  };

  const setRoutePublishType = (key: string, newPublishType: PublishType) => {
    setLogRoutes((logRoutes) => {
      const routeToUpdateIdx = logRoutes.findIndex((r) => r.key == key);
      const newLogRoutes = [...logRoutes];
      newLogRoutes[routeToUpdateIdx].logFormData.publishType = newPublishType;
      return newLogRoutes;
    });
  };

  const setRouteImpossibleAscentTypes = useCallback(
    (i: number, newImpossibleAscentTypes: Set<AscentType>) => {
      setLogRoutes((lrs) => {
        const newRoutes = [...lrs];
        const routeToUpdate = lrs[i];
        newRoutes[i] = {
          ...routeToUpdate,
          logFormData: {
            ...routeToUpdate.logFormData,
            impossibleAscentTypes: newImpossibleAscentTypes,
          },
        };
        return newRoutes;
      });
    },
    [setLogRoutes]
  );

  const setRouteHiddenAscentTypes = useCallback(
    (i: number, newHiddenAscentTypes: Set<AscentType>) => {
      setLogRoutes((lrs) => {
        const newRoutes = [...lrs];
        const routeToUpdate = lrs[i];
        newRoutes[i] = {
          ...routeToUpdate,
          logFormData: {
            ...routeToUpdate.logFormData,
            hiddenAscentTypes: newHiddenAscentTypes,
          },
        };

        return newRoutes;
      });
    },
    [setLogRoutes]
  );

  useEffect(() => {
    // Validate ascent types for all routes being logged
    for (let i = 0; i < logRoutes.length; i++) {
      const currentRoute = logRoutes[i];
      const currentRouteImpossibleAscentTypes = calculateImpossibleAscentTypes(
        logDate,
        logRoutes,
        i
      );

      // update only if they changed
      if (
        !isEqualSets(
          currentRouteImpossibleAscentTypes,
          currentRoute.logFormData.impossibleAscentTypes
        )
      ) {
        setRouteImpossibleAscentTypes(i, currentRouteImpossibleAscentTypes);
      }

      // if the current route's ascent type is impossible, unset it
      // const currentRotueAscentType = ascentTypesMap[currentRoute.key];
      const currentRotueAscentType = currentRoute.logFormData.ascentType;
      if (
        currentRotueAscentType &&
        currentRouteImpossibleAscentTypes.has(currentRotueAscentType)
      ) {
        setRouteAscentType(currentRoute.id, currentRoute.key, null);
      }

      // either redpoint or repeat is to be shown, hide the other
      const currentRouteHiddenAscentTypes = new Set<AscentType>();
      if (currentRouteImpossibleAscentTypes.has(AscentType.Redpoint)) {
        currentRouteHiddenAscentTypes.add(AscentType.Redpoint);
      } else {
        currentRouteHiddenAscentTypes.add(AscentType.Repeat);
      }
      if (currentRouteImpossibleAscentTypes.has(AscentType.TRedpoint)) {
        currentRouteHiddenAscentTypes.add(AscentType.TRedpoint);
      } else {
        currentRouteHiddenAscentTypes.add(AscentType.TRepeat);
      }

      // update only if they changed
      if (
        !isEqualSets(
          currentRouteHiddenAscentTypes,
          currentRoute.logFormData.hiddenAscentTypes
        )
      ) {
        setRouteHiddenAscentTypes(i, currentRouteHiddenAscentTypes);
      }
    }
  }, [
    logDate,
    setRouteAscentType,
    setRouteImpossibleAscentTypes,
    setRouteHiddenAscentTypes,
    logRoutes,
  ]);

  const resetAll = () => {
    setLogDate({ day: "dd", month: "mm", year: "llll" });
    setLogRoutes([]);
  };

  return (
    <LogRoutesContext.Provider
      value={{
        crag,
        logDate,
        setLogDate,
        logRoutes,
        setLogRoutes,
        setRouteAscentType,
        setRouteDifficultyVote,
        setRouteStarRatingVote,
        setRoutePublishType,
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
  allLogRoutes: TLogRoute[],
  routeIndex: number
  // ascentTypesMap: TAscentTypesMap
) => {
  const route = allLogRoutes[routeIndex];

  // Start with all possible ascentTypes
  const impossibleAscentTypes = new Set<AscentType>();

  // If a date is not set, then everything is possible since we do not know where the ascent should be inserted
  if (logDate.day != "dd" && logDate.month != "mm" && logDate.year != "llll") {
    // Initially remove repeat, because repeat needs at least one tick ascent before it
    impossibleAscentTypes.add(AscentType.Repeat);
    impossibleAscentTypes.add(AscentType.TRepeat);

    dayjs.extend(isSameOrBefore);
    const logDateJs = dayjs(`${logDate.year}-${logDate.month}-${logDate.day}`);

    if (
      route.usersHistory.firstTryDate &&
      dayjs(route.usersHistory.firstTryDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has tried this route before, remove onsight and flash
      impossibleAscentTypes.add(AscentType.Onsight);
      impossibleAscentTypes.add(AscentType.TOnsight);
      impossibleAscentTypes.add(AscentType.Flash);
      impossibleAscentTypes.add(AscentType.TFlash);
    }

    if (
      route.usersHistory.firstTickDate &&
      dayjs(route.usersHistory.firstTickDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has ticked the route before, remove redpoint and add repeat
      impossibleAscentTypes.add(AscentType.Redpoint);
      impossibleAscentTypes.add(AscentType.TRedpoint);
      impossibleAscentTypes.delete(AscentType.Repeat);
      impossibleAscentTypes.delete(AscentType.TRepeat);
    }

    if (
      route.usersHistory.firstTrTickDate &&
      dayjs(route.usersHistory.firstTrTickDate).isSameOrBefore(logDateJs)
    ) {
      // If the user has toprope ticked the route before, remove toprope redpoint and add toprope repeat
      impossibleAscentTypes.add(AscentType.TRedpoint);
      impossibleAscentTypes.delete(AscentType.TRepeat);
    }
  }

  // Finally go through all instances of the same route preceeding this route (if any) and consider them as already logged ascents before the current one
  for (let i = 0; i < routeIndex; i++) {
    const prevRoute = allLogRoutes[i];
    if (prevRoute.id != route.id) {
      continue;
    }

    // const prevRouteAscentType = ascentTypesMap[prevRoute.key];
    const prevRouteAscentType = prevRoute.logFormData.ascentType;

    // Remove onsight and flash right away, because any log preceeding this one is a try
    impossibleAscentTypes.add(AscentType.Onsight);
    impossibleAscentTypes.add(AscentType.TOnsight);
    impossibleAscentTypes.add(AscentType.Flash);
    impossibleAscentTypes.add(AscentType.TFlash);

    // Add repeat and remove redpoint if there is a tick log preceeding this one
    if (prevRouteAscentType && tickAscentTypes.includes(prevRouteAscentType)) {
      impossibleAscentTypes.delete(AscentType.Repeat);
      impossibleAscentTypes.delete(AscentType.TRepeat);
      impossibleAscentTypes.add(AscentType.Redpoint);
      impossibleAscentTypes.add(AscentType.TRedpoint);
    }

    // If there is a toprope tick log preceeding this one then toprope redpoint is not possible anymore, and toprope repeat becomes possible
    if (
      prevRouteAscentType &&
      trTickAscentTypes.includes(prevRouteAscentType)
    ) {
      impossibleAscentTypes.add(AscentType.TRedpoint);
      impossibleAscentTypes.delete(AscentType.TRepeat);
    }
  }

  return impossibleAscentTypes;
};

// Compare two sets
function isEqualSets(a: Set<any>, b: Set<any>) {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  for (const value of Array.from(a)) if (!b.has(value)) return false;
  return true;
}
