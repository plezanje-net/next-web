import { Fragment } from "react";
import { Crag } from "../graphql/generated";

interface VisitsDistributionProps {
  crag: Crag;
}

function VisitsDistribution({ crag }: VisitsDistributionProps) {
  const maxCount = Math.max(...crag.activityByMonth);

  const monthNames = [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  const months: {
    position: number;
    name: string;
    nameShort: string;
    color?: string;
    nrVisits: number;
  }[] = [];

  // Fill months array of month objects
  for (let i = 0; i < monthNames.length; i++) {
    months[i] = {
      position: i,
      name: monthNames[i],
      nameShort: monthNames[i].substring(0, 3),
      nrVisits: crag.activityByMonth[i],
    };
  }

  // Sort by number of visits descending
  months.sort((a, b) => (a.nrVisits > b.nrVisits ? -1 : 1));

  // Assign colors: more visits, more intense
  months[0].color = months[1].color = months[2].color = "bg-blue-500";
  months[3].color = months[4].color = months[5].color = "bg-blue-200";
  months[6].color = months[7].color = months[8].color = "bg-neutral-300";
  months[9].color = months[10].color = months[11].color = "bg-neutral-200";

  // Sort back to original order
  months.sort((a, b) => (a.position > b.position ? 1 : -1));

  return (
    <div className="@container">
      <h4 className="mx-4 xs:mx-0">Obiskanost po mesecih</h4>
      <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 bg-neutral-100 p-4 xs:rounded-lg xs:p-6">
        {months.map((month) => (
          <Fragment key={month.name}>
            <div className="hidden text-right @md:block">{month.name}</div>
            <div className="text-right @md:hidden">{month.nameShort}</div>
            <div className="h-5">
              <div
                className={`h-full rounded ${month.color}`}
                style={{
                  width: `${(month.nrVisits / maxCount) * 100}%`,
                }}
              ></div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default VisitsDistribution;
