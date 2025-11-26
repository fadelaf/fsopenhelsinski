import axios from "axios";
import { ssrDynamicImportKey } from "vite/module-runner";

const baseUrl = 'http://localhost:3002/person'

const getAll= () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id,person) => {
    const request = axios.put(`${baseUrl}/${id}`,person)
    return request.then(response => response.data)
}


export default { getAll , add , remove, update}