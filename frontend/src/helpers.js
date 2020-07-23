export const postAPI = (url, payload) => {

    return fetch(`http://localhost:3000/${url}`, {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            payload: payload
        })
    })
    .then(res => res.json())

}

export const getAPI = (url) => {
    return fetch(`http://localhost:3000/${url}`, {credentials: "include"})
    .then(res => res.json())
}

export const deleteAPI = (url) => {
    return fetch(`http://localhost:3000/${url}`, {
        credentials: "include", 
        method: 'DELETE'
    })
}