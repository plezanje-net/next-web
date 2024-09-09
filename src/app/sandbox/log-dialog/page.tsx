"use client";

import {
  LogRoutesProvider,
  TLogRoute,
} from "@/components/log-dialog/log-routes-context";
import LogDialog from "@/components/log-dialog/log-dialog";
import Button from "@/components/ui/button";
import { useState } from "react";
import { AscentType, Crag, PublishType } from "@/graphql/generated";

function LogDialogPage() {
  const [logRoutes, setLogRoutes] = useState(routes);

  return (
    <div className="mt-4 flex justify-center">
      <LogRoutesProvider
        logRoutes={logRoutes}
        setLogRoutes={setLogRoutes}
        crag={crag as Crag}
        showLogSavedToast={() => {}}
      >
        <LogDialog openTrigger={<Button>Log routes</Button>} />
      </LogRoutesProvider>
    </div>
  );
}

export default LogDialogPage;

// Dummy data
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
      firstTryDate: "2024-06-02",
      firstTickDate: "2024-06-04",
    },
    logFormData: {
      publishType: PublishType.Public,
      impossibleAscentTypes: new Set<AscentType>(),
      hiddenAscentTypes: new Set<AscentType>(),
    },
  },
  {
    id: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    key: "c56dff8b-c3cb-497c-8ecc-301c00c260f5",
    name: "Klobasa",
    difficulty: 1700,
    defaultGradingSystemId: "french",
    usersHistory: {
      firstTryDate: "2024-06-04",
      firstTrTickDate: "2024-06-04",
    },
    logFormData: {
      publishType: PublishType.Public,
      impossibleAscentTypes: new Set<AscentType>(),
      hiddenAscentTypes: new Set<AscentType>(),
    },
  },
  {
    id: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    key: "1f3d1ef5-0328-4630-8392-00a05058eda1",
    name: "Krvavica",
    difficulty: 1350,
    defaultGradingSystemId: "french",
    usersHistory: {},
    logFormData: {
      publishType: PublishType.Public,
      impossibleAscentTypes: new Set<AscentType>(),
      hiddenAscentTypes: new Set<AscentType>(),
    },
  },
];
