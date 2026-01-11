import pkg from "@next/env";
const { loadEnvConfig } = pkg;

import fs from "fs";
import path from "path";

console.log("Fetching all grading systems from server...");

loadEnvConfig(process.cwd());

const fullFilePath = path.join(
  process.cwd(),
  "src/lib",
  "grading-systems.ts"
);

const url = process.env.NEXT_PUBLIC_API_URL;

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `{
      gradingSystems {
        name
        id
        grades {
          difficulty
          name
          id
          __typename
        }
        routeTypes {
          id
          name
          __typename
        }
        __typename      
      }
    }`,
  }),
});

const data = await response.json();

const gradingSystemsAsObject = {};
const gradingSystemIdsAsStrings = [];

data.data.gradingSystems.forEach((gradingSystem) => {
  const gradingSystemId = gradingSystem.id.replace(/(?!^)-(.)/g, (_, char) =>
    char.toUpperCase()
  );
  gradingSystemsAsObject[gradingSystemId] = gradingSystem;
  gradingSystemIdsAsStrings.push(`"${gradingSystemId}"`);
});

fs.writeFileSync(
  fullFilePath,
  `/* This is an auto-generated file. */
export type TGradingSystemId = ${gradingSystemIdsAsStrings.join(' | ')};

  type TGradingSystem = {
  __typename?: 'GradingSystem';
  grades: TGrade[];
  id: string;
  name: string;
  routeTypes: TRouteType[];
};

  type TGrade = {
  __typename?: 'Grade';
  difficulty: number;
  id: string;
  name: string;
};

  type TRouteType = {
  __typename?: 'RouteType';
  id: string;
  name: string;
};

export type TGradingSystems = Record<TGradingSystemId, TGradingSystem>;

export const gradingSystems =  ${JSON.stringify(gradingSystemsAsObject, null, 4)}
`);

console.log("All grading systems stored into " + fullFilePath);
