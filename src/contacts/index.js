export const ENV_VARS = {
  PORT: 'PORT',
};

export const MONGO_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_VALID_UNTIL = 15 * 60 * 1000;
export const REFRESH_TOKEN_VALID_UNTIL = 24 * 60 * 60 * 1000 * 30;
// Date.now() + 24 * 60 * 60 * 1000 * 30;

export const ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};
