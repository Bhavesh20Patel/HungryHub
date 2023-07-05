import React from 'react'
import Trash from "../trash.svg"
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (!data || data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 ' style={{ color: "white" }}>The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()   // inbuilt js function to give current date and time
            })
        });
        console.log("Order RESPONSE:", response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + parseFloat(food.price), 0);

    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-danger fs-4'>
                        <tr>
                            <th scope='col' >S.No</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row' style={{ color: "white" }}>{index + 1}</th>
                                <td style={{ color: "white" }}>{food.name}</td>
                                <td style={{ color: "white" }}>{food.qty}</td>
                                <td style={{ color: "white" }}>{food.size}</td>
                                <td style={{ color: "white" }}>{food.price}</td>
                                <td style={{ color: "white" }}><button type="button" className="btn p-0"><img src={Trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} style={{ height: "20px" }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2' style={{ color: "white" }}>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-danger mt-5 '  onClick={handleCheckOut}> Check Out </button>
                </div>
                
            </div>
        </div>
    )
}