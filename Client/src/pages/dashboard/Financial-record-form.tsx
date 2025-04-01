import { useState } from "react";
import {useUser} from "@clerk/clerk-react"
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = ()=> {
  const [description, setDescription] =  useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const {user} = useUser();
  const {addRecord} = useFinancialRecords();

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category, 
      paymentMethod: paymentMethod,
    };
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };
  return (
  <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" id="description" placeholder="Add Description"
        required className="input" 
        value={description} 
        onChange={(e)=>setDescription(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="amount" >Amount:</label>
        <input placeholder = "Enter Amount" type="text" id="amount"
        required className="input" 
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="category ">Category:</label>
        <select required className="input" 
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >
          <option value ="">Select a Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-field">
        <label>Payment Method::</label>
        <select required className="input" 
        value={paymentMethod}
        onChange={(e)=>setPaymentMethod(e.target.value)}
        >
          <option value ="">Select a payment method</option>
          <option value="Credit Card">Credt Card</option>
          <option value="Cash">Cash</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Banmk Transfer">Debit Card</option> 
        </select>
      </div>
      <button type="submit" className="button">Add Record</button>

    </form>
  </div>
  )
};
