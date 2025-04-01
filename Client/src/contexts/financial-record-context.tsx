import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {useUser} from "@clerk/clerk-react";
export interface FinancialRecord{
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
} 
interface FinancialRecordsContextType{
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord)=>void;
  // updateRecord: (id: string,newRecord:FinancialRecord)=>void;
  // deleteRecord: (id:string)=>void;
}
import { BASE_URL } from "../var";
export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);
export const FinancialRecordsProvider =({
  children,
}:{
  children:React.ReactNode;  
})=>{
  const[records,setRecords] = useState<FinancialRecord[]>([]);
  const {user} = useUser();
  const fetchRecords = async ()=>{
    if(!user) return;
    const response = await fetch(`${BASE_URL}/financial-records/getALLByUserID/:userID/${user?.id}`
    );
    if(response.ok){
      const records = await response.json();
      setRecords(records);
    }
  };

  useEffect(()=>{
    fetchRecords();
  },[user]);

  const addRecord = async (record: FinancialRecord)=>{
    const response = await fetch(`${BASE_URL}/financial-records`, {
    method : "POST", 
    body : JSON.stringify(record),
    headers: {
      'Content-Type':"application/json"
    }
  });
    try{
      if(response.ok){
        const newRecord = await response.json()
        setRecords((prev)=>{
          if(newRecord)return [...prev,newRecord];
          return prev;
        });
      }
    }catch (err){}
  };
  return <FinancialRecordsContext.Provider value={{records,addRecord}}>
    {""}
    {children}
  </FinancialRecordsContext.Provider>
}

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType| undefined >(
    FinancialRecordsContext
  );
  if(!context){  
    throw new Error(
      "useUinancialRecords must be used within a FinancialRecordProvider"
    );
  }
  return context;
}