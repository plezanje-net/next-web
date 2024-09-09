import { Crag } from "../graphql/generated";
import { TGradingSystemId, gradingSystems } from "../utils/grading-systems";

// TODO: we decided to keep half grades for voting and lose modifiers on calculated grades. this becomes much simpler now. move to Grade??
function difficultyToGrade(difficulty: number, gradingSystemId: string) {
  const grades = gradingSystems[gradingSystemId as TGradingSystemId].grades;

  if (!grades) return null;

  // assuming grades are ordered by difficulty low to high
  for (let i = 1; i < grades.length; i++) {
    const prevGrade = grades[i - 1];
    const currGrade = grades[i];

    if (currGrade.difficulty >= difficulty) {
      // are we closer to left or right 'whole' grade
      if (
        difficulty - prevGrade.difficulty <=
        currGrade.difficulty - difficulty
      ) {
        return prevGrade;
      } else {
        return currGrade;
      }
    }
  }
}

interface GradeSlot {
  label: string;
  grades: string[];
  count: number;
  colorClass: string;
}

interface GradeDistributionProps {
  crag: Crag;
}

function GradeDistribution({ crag }: GradeDistributionProps) {
  // TODO: get this from crag!
  // TODO: what to do when mixed grades inside one crag??:
  //          many distros
  //          only 'main' distro and note that not all routes are counted
  //          no distro at all

  // TODO: what to do when no default grading system is set??:
  //          choose system by majority of routes
  //          fallback to some default e.g. french
  const gradingSystemId = crag.defaultGradingSystem?.id || "french";

  // TODO: define slots for all other grading systems that we want to support. and define some fallback for those we don't
  const gradeSlotsBySystem = [
    {
      gradingSystemId: "french",
      regularSlots: [
        {
          label: "..4c",
          grades: ["1", "2", "3", "4a", "4a+", "4b", "4c"],
          count: 0,
          colorClass: "bg-blue-100",
        },
        {
          label: "5a",
          grades: ["5a", "5a+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "5b",
          grades: ["5b", "5b+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "5c",
          grades: ["5c", "5c+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "6a",
          grades: ["6a", "6a+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "6b",
          grades: ["6b", "6b+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "6c",
          grades: ["6c", "6c+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "7a",
          grades: ["7a", "7a+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "7b",
          grades: ["7b", "7b+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "7c",
          grades: ["7c", "7c+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "8a",
          grades: ["8a", "8a+"],
          count: 0,
          colorClass: "bg-blue-500",
        },
        {
          label: "8b",
          grades: ["8b", "8b+"],
          count: 0,
          colorClass: "bg-blue-500",
        },
        {
          label: "8c",
          grades: ["8c", "8c+"],
          count: 0,
          colorClass: "bg-blue-500",
        },
        {
          label: "9a..",
          grades: ["9a", "9a+", "9b", "9b+", "9c"],
          count: 0,
          colorClass: "bg-neutral-700",
        },
      ],
      compactSlots: [
        {
          label: "..5a",
          grades: ["1", "2", "3", "4a", "4a+", "4b", "4c", "5a", "5a+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "5b",
          grades: ["5b", "5b+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "5c",
          grades: ["5c", "5c+"],
          count: 0,
          colorClass: "bg-neutral-300",
        },
        {
          label: "6a",
          grades: ["6a", "6a+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "6b",
          grades: ["6b", "6b+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "6c",
          grades: ["6c", "6c+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "7a",
          grades: ["7a", "7a+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "7b",
          grades: ["7b", "7b+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "7c",
          grades: ["7c", "7c+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "8a",
          grades: ["8a", "8a+"],
          count: 0,
          colorClass: "bg-blue-500",
        },
        {
          label: "8b",
          grades: ["8b", "8b+"],
          count: 0,
          colorClass: "bg-blue-500",
        },
        {
          label: "8c..",
          grades: ["8c", "8c+", "9a", "9a+", "9b", "9b+", "9c"],
          count: 0,
          colorClass: "bg-blue-500",
        },
      ],
    },
    {
      gradingSystemId: "uiaa",
      regularSlots: [
        {
          label: "..III",
          grades: ["I", "II", "III"],
          count: 6,
          colorClass: "bg-blue-100",
        },
        {
          label: "IV",
          grades: ["IV", "IV+"],
          count: 3,
          colorClass: "bg-neutral-300",
        },
        {
          label: "V",
          grades: ["V-", "V", "V+"],
          count: 4,
          colorClass: "bg-neutral-300",
        },
        {
          label: "VI",
          grades: ["VI-", "VI", "VI+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "VII",
          grades: ["VII-", "VII", "VII+"],
          count: 0,
          colorClass: "bg-blue-300",
        },
        {
          label: "VIII",
          grades: ["VIII-", "VIII", "VIII+"],
          count: 0,
          colorClass: "bg-neutral-500",
        },
        {
          label: "IX",
          grades: ["IX-", "IX", "IX+"],
          count: 2,
          colorClass: "bg-neutral-500",
        },
        {
          label: "X",
          grades: ["X-", "X", "X+"],
          count: 4,
          colorClass: "bg-blue-500",
        },
        {
          label: "XI",
          grades: ["XI-", "XI", "XI+"],
          count: 1,
          colorClass: "bg-blue-500",
        },
        {
          label: "XII",
          grades: ["XII-", "XII", "XII+"],
          count: 2,
          colorClass: "bg-neutral-700",
        },
      ],
    },
  ];

  const routes = crag.sectors.map((sector) => sector.routes).flat();

  // pick the slots that are relevant for the current crag
  const gradeSlots = gradeSlotsBySystem.find(
    (gradeSlotsBy) => gradeSlotsBy.gradingSystemId === gradingSystemId
  );

  routes.forEach((route) => {
    if (route.difficulty) {
      const grade = difficultyToGrade(route.difficulty, gradingSystemId);
      if (grade) {
        // fill in regular slots
        const slot = gradeSlots?.regularSlots.find((slot) =>
          slot.grades.includes(grade.name)
        );
        if (slot) {
          slot.count++;
        }

        // fill in compact slots
        if (gradeSlots?.compactSlots) {
          const slotCompact = gradeSlots?.compactSlots.find((slot) =>
            slot.grades.includes(grade.name)
          );
          if (slotCompact) {
            slotCompact.count++;
          }
        }
      }
    }
  });

  const maxCountRegular = Math.max(
    ...(gradeSlots?.regularSlots.map((val) => val.count) || [])
  );
  const maxCountCompact = Math.max(
    ...(gradeSlots?.compactSlots?.map((val) => val.count) || [])
  );

  return (
    <div className="@container">
      <div className="bg-neutral-100 p-4 @md:p-6 xs:rounded-lg">
        <div className="hidden w-full items-end justify-between @sm:flex">
          {gradeSlots?.regularSlots.map((gradeSlot, index) => (
            <Bar key={index} gradeSlot={gradeSlot} maxCount={maxCountRegular} />
          ))}
        </div>

        <div className="flex w-full items-end justify-between @sm:hidden">
          {gradeSlots?.compactSlots
            ? gradeSlots?.compactSlots.map((gradeSlot, index) => (
                <Bar
                  key={index}
                  gradeSlot={gradeSlot}
                  maxCount={maxCountCompact}
                />
              ))
            : gradeSlots?.regularSlots.map((gradeSlot, index) => (
                <Bar
                  key={index}
                  gradeSlot={gradeSlot}
                  maxCount={maxCountRegular}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

interface BarProps {
  gradeSlot: GradeSlot;
  maxCount: number;
}

function Bar({ gradeSlot, maxCount }: BarProps) {
  return (
    <div className="flex w-5 flex-col items-center @md:w-6 @xl:w-8 @3xl:w-10 @4xl:w-13">
      <div className="flex h-48 w-full flex-col items-center @md:h-[300px]">
        {/* spacer - empty space above bar */}
        <div
          style={{
            flexGrow: `${100 - (gradeSlot.count / maxCount) * 100}`,
          }}
        ></div>

        {/* label above bar - num of grades in a slot */}
        <div className="mb-1">{gradeSlot.count ? gradeSlot.count : ""}</div>

        {/* the actual bar - colored rectangle */}
        <div
          style={{
            flexGrow: `${(gradeSlot.count / maxCount) * 100}`,
          }}
          className={`w-full rounded ${gradeSlot.colorClass} ${
            gradeSlot.count === 0 ? "h-0.5" : ""
          }`}
        ></div>
      </div>

      {/* label below bar - slot name (grade) */}
      <div className="mt-2 font-medium">{gradeSlot.label}</div>
    </div>
  );
}

export default GradeDistribution;
