import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com/products"
})

export const getProducts = async () => {

    try {
        const response = await api.get()
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }

};


export const getSingle = async (id) => {

    try {
        const response = await api.get(`/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
};


