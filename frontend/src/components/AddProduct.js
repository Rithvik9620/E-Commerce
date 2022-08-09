import React, { useState } from 'react'

function AddProduct() {

  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [company,setCompany] = useState('')
  const [error,setError] = useState(false)

  const addProducts = async () =>{
    if(!name || !price || !category || !company){
      setError(true)
      return false
    }
     const userId = JSON.parse(localStorage.getItem('user'))._id
     let result = await fetch('http://localhost:5000/add-product',{
        method:'post',
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{'Content-type':'application/json'}
      })
      result = await result.json()
      console.log(result)
  }

  return (
    <div className='product'>
        <h1>Add Product</h1>
        <input type="text" placeholder='Enter product name' value={name} onChange={e=>setName(e.target.value)} className='inputbox'></input>
        {error && !name && <span className='invalid-input'>Enter valid name</span>}
        <input type="text" placeholder='Enter product price' value={price} onChange={e=>setPrice(e.target.value)} className='inputbox'></input>
        {error && !price && <span className='invalid-input'>Enter valid price</span>}
        <input type="text" placeholder='Enter product category' value={category} onChange={e=>setCategory(e.target.value)} className='inputbox'></input>
        {error && !category && <span className='invalid-input'>Enter valid category</span>}
        <input type="text" placeholder='Enter product company' value={company} onChange={e=>setCompany(e.target.value)} className='inputbox'></input>
        {error && !company && <span className='invalid-input'>Enter valid company</span>}
        <button className='appButton' onClick={addProducts}>Add Product</button>
    </div>
  )
}

export default AddProduct