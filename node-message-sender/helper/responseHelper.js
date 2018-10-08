'use strict';

module.exports.createResponse = ({ body = {}, headers = {}, statusCode = 200 }) => {
  const response = {
    statusCode,
    headers,
    body,
  };
  return response;
};

module.exports.createErrorResponse = ({ body = {},
  headers = { 'Content-Type': 'text/plain' },
  statusCode = 501 }) => {
  const response = {
    statusCode,
    headers,
    body,
  };
  return response;
};