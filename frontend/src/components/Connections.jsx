import axios from 'axios';
import React, { useEffect } from 'react'
import { Base_Url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import FriendCard from './FriendCard';
const Connections = () => {
    const dispatch = useDispatch()
    const connection = useSelector((store)=>store.connection.connections)

    const fetchConnection = async()=>{
        try {
            const response = await axios.get(Base_Url+"/user/connection",{withCredentials:true});
            dispatch(addConnections(response.data.data));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchConnection()
    },[])

    if(!connection)return ;
    if(connection.length===0) {
        return (
        <div>
            <h1 className="flex justify-center font-bold text-3xl my-7">No Connections Found</h1>
        </div>
        )
    }
 

    return (
        <>
            <div>
                <h1 className="flex justify-center font-bold text-2xl md:text-3xl my-7">
                    Connections
                </h1>
            </div>
    
            <div className="w-full max-w-2xl mx-auto mt-6 shadow-2xl rounded-md overflow-hidden">
          {connection.map((friend, index) => (
            <FriendCard key={index} connection={friend} />
          ))}
        </div>
        </>
    );
    
}

export default Connections