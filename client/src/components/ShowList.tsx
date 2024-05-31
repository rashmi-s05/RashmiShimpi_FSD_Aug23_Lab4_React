import React, { useState, useEffect } from "react";
import iDataList from "../models/iDataList";
import { getItemsData } from "../services/itemService";
import ExpenseTracker from "./ExpenseTracker";

export default function ShowList() {

    const [item, setItems] = useState<iDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number>(0);
    const [rahulspent, setRahulSpent] = useState<number>(0);
    const [rameshspent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);


    useEffect(()=>{

        const fetchItemData = async () =>{
            try{
                const data = await getItemsData();
                setItems(data);
                setSum(data.reduce((result,v) =>  result + v.price , 0 ))

                calculateOnItems(data);
            } catch(error: any){
                console.error(error);
                setError(error);
            }
        }
        fetchItemData();
    }, [showForm]); 

    const calculateOnItems = (data: iDataList[]) => {
        //sum
        //rahulspent
        //rameshspent
        var rahul_spent : number = 0;
        var ramesh_spent : number = 0;
        data.map((item) => {
            item.payeeName === 'Rahul' 
            ? (rahul_spent = rahul_spent + item.price)
            : (ramesh_spent = ramesh_spent + item.price)
        });
        setRahulSpent(rahul_spent);
        setRameshSpent(ramesh_spent);
        setSum(rahul_spent + ramesh_spent);
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            {/* Add button */}
            <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <ExpenseTracker onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTracker>
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                item && item.map ((user,idx)=>{
                    return (<div key={idx}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                    </div>)
                })
            }
        <hr/>
        <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Rahul paid: </div>
        <span className="use-inline total Rahul">{rahulspent}</span> <br />
        <div className="use-inline ">Ramesh paid: </div>
        <span className="use-inline total Ramesh">{rameshspent}</span> <br />
        <span className="use-inline payable">{rahulspent>rameshspent? "Pay Rahul " : "Pay Ramesh"}</span>
        <span className="use-inline payable price"> {Math.abs((rahulspent-rameshspent)/2)}</span>
        {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            } 
        </>
    );
}

    