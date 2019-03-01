/*
  Contains the action Type constants for the project
*/
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});

export const INSTITUTIONS = createRequestTypes("INSTITUTIONS");

export const REQUEST_RANKING = "REQUEST_RANKING";
