import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typed-document-node",
        "named-operations-object",
        "typescript-operations",
      ],
    },
  },
};

export default config;
