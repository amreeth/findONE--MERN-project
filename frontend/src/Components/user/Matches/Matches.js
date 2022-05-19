import React, { useEffect } from 'react'
import { getMatches } from '../../../actions/matchActions'
import {useSelector,useDispatch} from 'react-redux'

const Matches = () => {

    const dispatch=useDispatch()
    const {loading,error,matches} =useSelector(state=>state.matches)

    useEffect(() => {

     dispatch(getMatches())

    }, [dispatch])
    

  return (
    <div>
        Matches
     </div>
  )
}

export default Matches