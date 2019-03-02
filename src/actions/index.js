import { INSTITUTIONS, REQUEST_RANKING } from "../constants/actionTypes";

const action = (type, payload = {}) => ({ type, ...payload });

export const institutions = {
  request: preferences => action(INSTITUTIONS.REQUEST, { preferences }),
  success: response => action(INSTITUTIONS.SUCCESS, { response }),
  failure: (institutionDetails, error) =>
    action(INSTITUTIONS.FAILURE, { institutionDetails, error })
};

export const requestRanking = preferences =>
  action(REQUEST_RANKING, { preferences });
