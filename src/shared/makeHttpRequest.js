import axios from "axios";
const timeout = 40000;

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const makeHttpRequest = async ({endpoint, method, body, params}) => {
    const createdUrl = baseUrl + endpoint
    try {
        const response = await axios(createdUrl, {
            createdUrl,
            timeout,
            method,
            data: body,
            params: params,
        });
        return {data: response.data}
    } catch(err) {
        console.log('err',err)
    }
}
