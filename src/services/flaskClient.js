import { camelizeKeys } from "humps";
import { schema, normalize } from "normalizr";
import { transformPreferences } from "../utils/featureConfigs";

const API_ROOT = "http://localhost:5000/"; // insert generic name for API  :P

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
  console.log(transformPreferences(preferenceDetails));
  let response = callPostApi(
    "send",
    transformPreferences(preferenceDetails)
  );
  // response = [
  //   {
  //     District: "Vellore",
  //     State: "Tamil Nadu",
  //     id: 490,
  //     university: "Vellore Institute of Technology, Vellore"
  //   },
  //   {
  //     District: "Salem",
  //     State: "Tamil Nadu",
  //     id: 492,
  //     university: "VINAYAKA MISSIONs RESEARCH FOUNDATION, SALEM"
  //   },
  //   {
  //     District: "Thanjavur",
  //     State: "Tamil Nadu",
  //     id: 476,
  //     university:
  //       "Shanmugha Arts, Science, Technology & Reserch Academy (SASTRA), Thanjavur"
  //   },
  //   {
  //     District: "Kancheepuram",
  //     State: "Tamil Nadu",
  //     id: 434,
  //     university: "Academy of Maritime Education and Training, Chennai"
  //   },
  //   {
  //     District: "Virudhunagar",
  //     State: "Tamil Nadu",
  //     id: 458,
  //     university:
  //       "Kalasalingam Academy of Research and Higher Education, Srivilliputhrur"
  //   }
  // ];

  return Object.assign({}, normalize(response, institutionSchemaArray));
};
