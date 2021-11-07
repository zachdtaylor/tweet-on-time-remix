export function getRequiredEnvVar(key: string) {
  let value = `${key}-placeholder-value`;
  const envVar = process.env[key];
  if (envVar) {
    value = envVar;
  }
  return value;
}
