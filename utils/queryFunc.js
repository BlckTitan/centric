const getAllCartData = async () =>{
    const req = await fetch('http://localhost:5000/cart')
    const res = await req.json()
    return res
}

export { getAllCartData }