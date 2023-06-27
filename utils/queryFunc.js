const getAllCartData = async () =>{
    const req = await fetch('http://localhost:5000/cart')
    const res = await req.json()
    return res
}
const deleteAllCartData = async (existingItem) =>{
    await fetch(`http://localhost:5000/cart/${existingItem}`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
}

export { getAllCartData, deleteAllCartData }