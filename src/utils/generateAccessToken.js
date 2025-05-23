import http from 'k6/http';
import { check } from 'k6';
import { MOLI_NBC_AUTH_URL, MOLI_NBC_CLIENT_ID, MOLI_NBC_CLIENT_SECRET } from "../config";

export function generateAccessToken(){

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
    };

    const payload = `grant_type=client_credentials&client_id=${MOLI_NBC_CLIENT_ID}&client_secret=${MOLI_NBC_CLIENT_SECRET}`;
    
    const res = http.post(MOLI_NBC_AUTH_URL, payload, { headers: headers });
    
    // check(res, {
    //     'status is 200': (r) => r.status === 200,
    // });

    let accessToken = res.json('access_token');
    // console.log (accessToken)

    return accessToken;

}
