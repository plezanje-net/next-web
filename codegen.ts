import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://plezanje.info/graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
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
