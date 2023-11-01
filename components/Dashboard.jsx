
import { React, useState } from "react";
import { currencyFormatter } from "@/lib/utils";


import ExpenseCatagoryItems from "./ExpenseCatagoryItems";

import AddIncomeModal from "./modals/AddIncomeModal";

const Dashboard = () => {



  // check if modal is open
  const [showedIncomeModal, setShowedIncomeModal] = useState(false);

  
  return (
    <>
      {/* Add income modal */}
      <AddIncomeModal show={showedIncomeModal} onClose={setShowedIncomeModal} />
       

      <main className="container max-w-2xl px-6 mx-auto">
        {/* balance section */}
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="font-bold text-3xl">{currencyFormatter(1447)}</h2>
        </section>

        {/* status buttons */}
        <section className="flex gap-7 mt-2 items-center">
          <button className="btn btn-primary" onClick={() => setShowedIncomeModal(true)} >
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
              {dummyData.map((items) => {
                return (
                  <ExpenseCatagoryItems
                    key={items.id}
                    color={items.color}
                    total={items.total}
                    title={items.title}
                    // showedIncomeModal={showedIncomeModal}
                    // setShowedIncomeModal={setShowedIncomeModal}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* chart & plot section we will use chart js library */}
        <section className="py-6">
          <h2 className="text-2xl">My Statistics</h2>
        </section>
      </main>
    </>
  );
};

// useless dummy data for test purpose
const dummyData = [
  {
    id: 0,
    color: "#000",
    title: "Rent",
    total: 500,
  },
  {
    id: 1,
    color: "#100",
    title: "EMI",
    total: 290,
  },
  {
    id: 2,
    color: "#002",
    title: "Transport",
    total: 300,
  },
  {
    id: 3,
    color: "#002",
    title: "Grocery",
    total: 100,
  },
  {
    id: 4,
    color: "#000",
    title: "Food",
    total: 250,
  },
];

export default Dashboard;
