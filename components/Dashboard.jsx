
import { React, useState, useContext, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import { HiCloudArrowUp } from 'react-icons/hi'

import ExpenseCatagoryItems from "./ExpenseCatagoryItems";

import AddIncomeModal from "./modals/AddIncomeModal";

import { financeContext } from '@/lib/store/finance-context'
import { authContext } from "@/lib/store/auth-context";

import AddExpenseModal from "./modals/AddExpenseModal";
import SignIn from "./SignIn";

const Dashboard = () => {

  // to show and hide income modal
  const [showedIncomeModal, setShowedIncomeModal] = useState(false);

  // to show and hide expense modal
  const [showedExpenseModal, setShowedExpenseModal] = useState(false);

  // destructuring finance context
  const { income, expenses } = useContext(financeContext);
  // destructuring auth context
  const { user, loading } = useContext(authContext)

  // current balance or net balace
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - expenses.reduce((total, e) => {
      return total + e.total;
    }, 0)
    
    setBalance(newBalance);

  }, [income, expenses])


  // check if user is logged in 
  if(!user) {
    return <SignIn />
  }
  
  return (
    <>
      {/* Add income modal */}
      <AddIncomeModal show={showedIncomeModal} onClose={setShowedIncomeModal} />
      <AddExpenseModal show={showedExpenseModal} onClose={setShowedExpenseModal} />


      <main className="container max-w-2xl px-6 mx-auto">
        {/* balance section */}
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className={`font-bold text-3xl ${balance<600 ? 'text-red-700':'text-white'}`}>
            {currencyFormatter(balance)}
            {balance<600 && balance>0 && 
            <small className="text-[15px] ml-2">Low Balance</small>}
            {balance<0 && 
            <small className="text-[15px] ml-2">Insufficient Balance Stop Spending</small>}
          </h2>
        </section>

        {/* status buttons */}
        <section className="flex gap-7 mt-2 items-center">
          <button className="btn btn-primary" onClick={() => setShowedExpenseModal(true)} >
            - Expenses
          </button>
          <button className="btn btn-primary-outline" onClick={() => setShowedIncomeModal(true)}>
            + Income
          </button>
        </section>

        {/* expenses details and plotting */}
        <section>
          <div className="py-6">
            <h3 className="text-2xl">My Expenses</h3>

            {/* expense details */}
            <div className="flex flex-col gap-4 mt-6">
              {/* Expense items */}
              {expenses.map((items) => {
                return (
                  <ExpenseCatagoryItems
                    key={items.id}
                    expense={items}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* chart & plot section we will use chart js library */}
        <section className="py-6">
          
          <button className="btn btn-primary hover:bg-green-500 w-full">
            {/* <HiCloudArrowUp /> */}
            That's All For This Month
          </button>
          
        </section>
      </main>
    </>
  );
};



export default Dashboard;
