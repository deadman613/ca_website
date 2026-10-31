function isPostgresConnectionConfigured(value: string | undefined) {
  const connectionString = value?.trim();
  if (!connectionString) return false;

  try {
    const url = new URL(connectionString);
    return (
      (url.protocol === "postgres:" || url.protocol === "postgresql:") &&
      url.hostname.length > 0
    );
  } catch {
    return false;
  }
}

export function isPrismaDatabaseConfigured() {
  return isPostgresConnectionConfigured(process.env.DATABASE_URL);
}

export function isPrismaMigrationDatabaseConfigured() {
  return isPostgresConnectionConfigured(process.env.DIRECT_URL);
}
