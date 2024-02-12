
import { React, useState, useContext, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import { HiCloudArrowUp } from 'react-icons/hi'

import ExpenseCatagoryItems from "./ExpenseCatagoryItems";

import AddIncomeModal from "./modals/AddIncomeModal";

import { financeContext } from '@/lib/store/finance-context'
import { authContext } from "@/lib/store/auth-context";
import { month } from "@/lib/month";

import AddExpenseModal from "./modals/AddExpenseModal";
import SignIn from "./SignIn";
import ViewSavingsModal from "./modals/ViewSavingsModal";

const Dashboard = () => {

  // to show and hide income modal
  const [showedIncomeModal, setShowedIncomeModal] = useState(false);

  // to show and hide expense modal
  const [showedExpenseModal, setShowedExpenseModal] = useState(false);

  // to show and hide savings modal
  const [showedSavingsModal, setShowedSavingsModal] = useState(false);

  // destructuring finance context
  const { income, expenses, addMonthlyDatabase } = useContext(financeContext);
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

  // handling end of the month
  async function finishMonth() {
    let netIncome = 0;
    
    income.map((value) => {
      netIncome += value.amount;
    })

    console.log('Income is - ', netIncome);
    console.log('balance is - ', balance);
    const totalExpense = netIncome - balance;
    
    const date = new Date();
    const savingsDetails = {
      month: month[`${date.getMonth()}`],
      income: netIncome,
      expense: totalExpense,
      savings: balance,
      uid: user.uid,
    }
    await addMonthlyDatabase(savingsDetails);
  }
  
  return (
    <>
      {/* Add income modal */}
      <AddIncomeModal show={showedIncomeModal} onClose={setShowedIncomeModal} />
      <AddExpenseModal show={showedExpenseModal} onClose={setShowedExpenseModal} />
      <ViewSavingsModal show={showedSavingsModal} onClose={setShowedSavingsModal} />


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
          <button className="btn btn-primary-savings" onClick={() => setShowedSavingsModal(true)}>
            + Savings
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
          
          <button 
            className="btn btn-primary hover:bg-green-500 w-full"
            onClick={finishMonth}
          >
            
            {/* <HiCloudArrowUp /> */}
            That's All For This Month
          </button>
          
        </section>
      </main>
    </>
  );
};



export default Dashboard;
