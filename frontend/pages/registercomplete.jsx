import React, {useEffect, useState} from 'react'
import Router from 'next/router'

function RegisterComplete(){

    
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const {pathname} = Router
        // conditional redirect
        if(pathname == '/registercomplete' ){
            // with router.push the page may be added to history
            // the browser on history back will  go back to this page and then forward again to the redirected page
            // you can prevent this behaviour using location.replace
            Router.push('/')
           //location.replace("/hello-nextjs")
        }else{
            setTimeout(() => {
                setLoaded(true)
            }, 3000)
            
        }
      },[]);

    if(!loaded){
        return <h1>Registration complete, please login. Redirecting...</h1>//show nothing or a loader
    }
    return ( 
        <p>
            You will see this page only if pathname !== "/" , <br/>
        </p> 
    )
}


export default RegisterComplete;