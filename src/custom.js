import { useState, useEffect } from "react";
import Axios from "axios";


const useCollegeList = () => {
    const [hotelList, setHotelList] = useState([]);
    const [detaylist, setDetayList] = useState ([]);


    const detayGetir=(id)=>{
        Axios.get(`http://localhost:15252/api/hotels/${id}`).then((response) => {
            setDetayList(response.data)
        });
    }

    const deleteAction = (deleteId) => {
        setHotelList(hotelList.filter(({ id }) => Number(id) !== Number(deleteId)));
    }
   
    const updateAction = (responsedata) => {
        const newArr = [...hotelList]; 
        newArr[hotelList.findIndex(({ id }) => Number(id) === Number(responsedata.id))] = responsedata;
        setHotelList(newArr);
    };
    const postAction = (postguncelle) => {
        const guncelData = [...hotelList, postguncelle]; 

        setHotelList(guncelData);
    }
  
    useEffect(() => {
        Axios.get("http://localhost:15252/api/hotels").then((response) => {
            setHotelList(response.data)
        });

    }, []);


    return { hotelList, deleteAction, updateAction, postAction,detayGetir,detaylist };
}

export default useCollegeList;
