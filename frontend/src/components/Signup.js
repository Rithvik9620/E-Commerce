import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })

  const collectData = async () =>{
    console.log(name,email,password)
    let result = await fetch('http://localhost:5000/signup',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{'Content-type':'application/json'}
    })
    result = await result.json()
    console.log(result)
    localStorage.setItem("user",JSON.stringify(result))
    if(result){
      navigate('/')
    }
  }

  return (
    <div className='signup'>
        <h1>Register</h1>
        <input className='inputbox' type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input className='inputbox' type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='inputbox' type="text" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={collectData}>Signup</button>
    </div>
  )
}

export default Signup