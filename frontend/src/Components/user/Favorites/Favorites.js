import React, { useEffect } from 'react'
import axios from '../../../utils/axios'
import { useNavigate } from 'react-router-dom'

const Favorites = () => {

    let userInfo=localStorage.getItem('userInfo')
    userInfo=JSON.parse(userInfo)
    const navigate=useNavigate()

    const [allFavourites,setAllFavourites]=useState([])

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }else{
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data}=await axios.get('users/allfavorites',config)
            setAllFavourites(data)
        }

    }, [userInfo])
    

  return (
    <>

    </>
  )
}

export default Favorites