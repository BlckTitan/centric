const getAllCartData = async () =>{
    const req = await fetch('http://localhost:5000/cart')
    const res = await req.json()
    return res
}
const createCartData = async (newItem) =>{
    await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newItem)
    })
}
const updateCartData = async (existingItem, updatedItem) =>{
    await fetch(`http://localhost:5000/cart/${existingItem}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(updatedItem)
    })
}
const deleteOneCartData = async (existingItem) =>{
    await fetch(`http://localhost:5000/cart/${existingItem}`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
}
const deleteAllCartData = async () =>{
    
    await fetch('http://localhost:5000/cart/', {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
}
export { getAllCartData, deleteOneCartData, deleteAllCartData, createCartData, updateCartData }