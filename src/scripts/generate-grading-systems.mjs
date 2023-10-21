import pkg from "@next/env";
const { loadEnvConfig } = pkg;

import fs from "fs";
import path from "path";

console.log("Fetching all grading systems from server...");

loadEnvConfig(process.cwd());

const fullFilePath = path.join(
  process.cwd(),
  "src/utils",
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

fs.writeFileSync(
  fullFilePath,
  "/* This is an auto-generated file. */\n" +
    "export const gradingSystems = " +
    JSON.stringify(data.data.gradingSystems)
);

console.log("All grading systems stored into " + fullFilePath);
