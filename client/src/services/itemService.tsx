import axios from "axios";
import iDataList from "../models/iDataList";

export const getItemsData = () => {
    return axios.get<iDataList[]>('http://localhost:4000/items').then(response=>response.data)
}

export const pushDataFromUser = (newPurchase : Omit<iDataList,"id">) => {
    return axios.post<iDataList>(
        `http://localhost:4001/items`,
        newPurchase,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
}