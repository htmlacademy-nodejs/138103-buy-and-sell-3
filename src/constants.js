'use strict';

const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};
const FILENAME = `mocks.json`;
const MAX_PUBLICATIONS = 1000;
const MAX_ID_LENGTH = 6;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
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

const API_PREFIX = `/api`;

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
  API_PREFIX
};

