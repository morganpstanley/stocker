export const fetchData = (url, method, payload) => {

    if (payload) {
        return  fetch(`http://localhost:3000/${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                payload
            })
        })
        .then(res => res.json())

    } else {
        return  fetch(`http://localhost:3000/${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include"
        })
        .then(res => res.json())
    }
}