type ActivityType = {
  label: string;
  color: string;
};

const activityTypes: Record<string, ActivityType> = {
  crag: { label: "Skala", color: "blue-500" },
  climbingGym: { label: "Plastika", color: "blue-200" },
  trainingGym: { label: "Telovadnica", color: "red-100" },
  peak: { label: "Hribi", color: "neutral-400" },
  iceFall: { label: "Slap", color: "neutral-400" },
  other: { label: "Ostalo", color: "neutral-400" },
};

export default activityTypes;
