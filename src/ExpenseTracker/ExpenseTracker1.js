import { useEffect, useState } from "react";
import './ExpenseTracker.css';
const  ExpenseTracker= () => {
    const [description, setDescription] = useState();
    const [amount, setAmount] = useState();
    const [transaction, setTransaction] = useState([]);
    const [editId, setEditId] = useState(null);
    const [income,setIncome]=useState("");
    const [expenses,setExpenses]=useState(0);

    //add the transaction
    const addTransaction=(e)=>{
        e.preventDefault();

        //if edit id is available then perform edition
        if (editId) {
            const newTransaction = transaction.map((t) => (
                t.id === editId ? { id: editId, description, amount } : t
            ));
            setTransaction(newTransaction);
            setEditId(null);

        }
        else if(description==="" && amount===""){//checking for empty fields
           alert("please enter your transaction details");
        }
        else {
            //add transaction(previous transaction and a new object)
            setTransaction([...transaction, { id: Date.now(), description, amount }]);
           
        }
        //set amount and description empty
        setDescription('');
        setAmount('');
        
    }


     //handle edit transaction
     const handleEdit = (t) => {
        setEditId(t.id);
        setDescription(t.description);
        setAmount(t.amount);
    }

    //delete transaction
    const handleDelete = (id) => {
        setTransaction(transaction.filter(t => t.id !== id))
       
    }

    //calculate expenses
    const calculateBalance=()=>{
        let exp=0;
        transaction.map((payload)=>{
            exp=exp+parseInt(payload.amount);
        })
        setExpenses(exp);
    }


    //to do the changes only when trasaction is done
    useEffect(()=>calculateBalance(),[transaction]);
    return ( 
        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="main-container">
                <div className="transaction-cont">
                    <div className="trans-cont">
                    <h1>Add Your Income</h1>
                        <form>
                            <input type="number" placeholder="Income" onChange={e => setIncome(e.target.value)} value={income}></input>
                            <br></br>
                            <h2 style={{color:"green"}}>Total Income:<br/><span>{income}</span></h2>
            
                        </form>
                        <tr style={{fontSize:"22px"}}>
                                    <td><label className="red" style={{backgroundColor:"red",color:"white",marginLeft:"20px"}} isIncome={false}>Total Expenses</label></td>
                                    <td style={{color:"red"}}><b>{expenses}</b></td>
                                    <td><label className="red" style={{backgroundColor:"green",color:"white",marginLeft:"60px"}} isIncome={true}>Total balance</label></td>
                                    <td style={{color:"green"}}><b>{income-expenses}</b></td>
                                    </tr> 
                        <h1>Add Your Transactions</h1>
                        <form onSubmit={addTransaction} >
                            <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} value={description}></input>
                            <br></br>
                            <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} value={amount}></input>
                            <br></br>
                            <button>Add Transaction</button>
                        </form>
                    </div>
                    <h2>Transactions</h2>
                    <div>
                        <table>
                            <thead>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {transaction.map((t) => (
                                    <tr key={t.id}>
                                        <td>{t.description}</td>
                                        <td>{t.amount}</td>
                                        <td>
                                            <button className="yellow" onClick={e => handleEdit(t)}>Edit</button>
                                            <button className="red" onClick={e => handleDelete(t.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div >
     );
}
 
export default ExpenseTracker;