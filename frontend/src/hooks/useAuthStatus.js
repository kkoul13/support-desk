import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useAuthStatus = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [isLoading , setIsLoading] = useState(true)
    const {user} = useSelector((state)=>state.auth)

    useEffect(()=>{

        if(user){
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
        setIsLoading(false)
    } , [user])

    return {isLoggedIn , isLoading}
}

export default useAuthStatus