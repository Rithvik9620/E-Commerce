import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })

  const collectData = async ()=>{
    let result = await fetch('http://localhost:5000/login',{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{'Content-type':'application/json'}
    })
    result = await result.json()
    console.log(result)
    if(result.name){
      localStorage.setItem("user",JSON.stringify(result))
      navigate('/')
    }
    else{
      alert("enter correct details")
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
        <input className='inputbox' type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='inputbox' type="text" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={collectData}>Login</button>
    </div>
  )
}

export default Login