import http from 'k6/http';
import { check } from 'k6';
import { generateAccessToken } from "../utils/generateAccessToken";
import { MOLI_NBC_BASE_URL, MOLI_NBC_GET_SUBSCRIBER_PATH } from "../config";
import { Rate } from 'k6/metrics';

export let errorRate = new Rate("errors");

// export let options = {
//     vus: 1 // number of virtual users
//     // duration: '1s', // total test duration
// };

export function setup(){

    const accessToken = generateAccessToken();
    return accessToken;
  }

export default function (accessToken) {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`
    };

    const queryParams = {
        msisdn: "601016044545"
    };

    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    const res = http.get(`${MOLI_NBC_BASE_URL}`+`${MOLI_NBC_GET_SUBSCRIBER_PATH}`+`?${queryString}`, { headers: headers });

    // check(res, {
    //     'status is 200': (r) => r.status === 200,
    // });
    let success = check(res,{
      "is status 200": (r) => r.status === 200,
      "is less than 15000ms": (r) => r.timings.duration <= 15000
    });
    if (
        success == false
    ) {
      errorRate.add(!success)
      console.error(res.status);
      console.error(res.body);
      }
}
