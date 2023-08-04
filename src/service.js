import axios from "axios";

const app = axios.create({
    baseURL: "https://64cbcd182eafdcdc8519554b.mockapi.io/api",
    headers: {
        "Access-Control-Allow-Headers": "access-control-allow-origin", "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    }
})

const AsyncPost = (data, url) => {
    return app.post(url, data)
        .then(result => result)
        .catch(err => err.response)
}

const AsyncGet = async (url) => {
    return await app.get(url)
        .then(result => result)
        .catch(err => err.response)
}

const AsyncDelete = (url) => {
    return app.delete(url)
        .then(result => result)
        .catch(err => err.response)
}

const AsyncUpdate = async (data, url) => {
    return await app.put(url, data)
        .then(result => result)
        .catch(err => err.response)
}


export default {
    AsyncPost,
    AsyncGet,
    AsyncUpdate,
    AsyncDelete
}