import { camelizeKeys } from "humps";
import { schema, normalize } from "normalizr";

const API_ROOT = ""; // insert generic name for API  :P

const callPostApi = async (endpoint, payload) => {
  try {
    const fullUrl =
      endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
    const rawResponse = await fetch(fullUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const content = await rawResponse.json();
    return content;
  } catch (e) {
    return { error: e.message || "something bad happened" };
  }
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, schema) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
        return Promise.reject(json);
      }
      if (schema !== undefined) {
        const excludePickupPoints = fullUrl.includes("get-pickup-points");
        if (excludePickupPoints) {
          return Object.assign({}, normalize(json, schema));
        }
        const camelizedJson = camelizeKeys(json);
        return Object.assign({}, normalize(camelizedJson, schema));
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || "Something bad happened" })
    );
};

// Schemas for Menu API responses.
const institutionSchema = new schema.Entity(
  "institutions",
  {},
  { idAttribute: "id" }
);
const institutionSchemaArray = new schema.Array(institutionSchema);

// Menu api services
// export const fetchRankingForEntityBasedOnPref = preferenceDetails =>
//   callApi(
//     `restaurants/get-by-loc&lat=${locDetails.lat}&long=${locDetails.lng}`,
//     FcAndRestSchemaArray
//   );

export const fetchRankingForEntityBasedOnPref = preferenceDetails => {
  return Object.assign(
    {},
    normalize([{ id: 3 }, { id: 4 }], institutionSchemaArray)
  );
};
