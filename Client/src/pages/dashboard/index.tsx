import{useUser} from "@clerk/clerk-react";
import { FinancialRecordForm } from "./Financial-record-form";
import { FinancialRecordList } from "./Financial-record-list";
export const Dashboard = ()=>{
  const {user} = useUser();
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! These are your finances.</h1>
        <FinancialRecordForm/>
        <FinancialRecordList/>
    </div>
  )
};