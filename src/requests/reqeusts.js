import {makeHttpRequest} from "../shared/makeHttpRequest";

export const getAllUsers = async ({start}) => {
    const response = await makeHttpRequest({endpoint: '/users', method: 'get', params: {
            _start: start,
            _limit: 4
        }})
    return response
};

export const getUserPosts = async ({userId}) => {
    const response = await makeHttpRequest({endpoint: '/posts', method: 'get', params: {
            userId
        }})
    return response
}
