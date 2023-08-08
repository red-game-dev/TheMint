import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

const { combinedEnv: env } = loadEnvConfig(__dirname);
// remoteSchemas takes precedence over local schema?
const remoteSchemas = ['http://127.0.0.1', 'http://localhost'];
// --watch part of flags?
const watchMode = process.argv.slice(2).some((opt) => opt === '--watch');

// local schema
const schema = remoteSchemas.some(
  (url) => env.NEXT_PUBLIC_GRAPHQL_API_URL?.startsWith(url),
)
  ? `${env.NEXT_PUBLIC_GRAPHQL_API_URL}/graphql`
  : 'vendor/schema.graphql';
// local GraphQL definitions to match against schema
const documents = ['./**/!(*.d).{ts,tsx}', '!./graphql/generated/**'];

// We want to log this to make sure we're scanning the right things.
// eslint-disable-next-line no-console
console.log({ documents, schema });

const config: CodegenConfig = {
  documents,
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        dedupeFragments: true,
        noOptionalTypename: true,
        useTypeImports: true,
      },
      presetConfig: {
        // The default is `useFragment` which is incredibly confusing in a
        // React codebase.
        fragmentMasking: { unmaskFunctionName: 'getFragment' },
      },
    },
  },
  schema,
  // prevents codegen to watch for "ALL THE FILES!"
  watch: watchMode && documents,
};

export default config;
