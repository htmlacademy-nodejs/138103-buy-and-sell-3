'use strict';

const DEFAULT_COUNT = 1;
const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--generate`;
const FILENAME = `mocks.json`;
const API_PREFIX = `/api`;
const MAX_PUBLICATIONS = 1000;
const MAX_ID_LENGTH = 6;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COUNT,
  FILENAME,
  MAX_PUBLICATIONS,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  OfferType,
  SumRestrict,
  PictureRestrict,
  HttpCode,
  MAX_ID_LENGTH,
  API_PREFIX,
  Env
};
