import React, { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

const ExpenseCatagoryItems = ({ expense }) => {
  const [showViewExpenseModal, setShowViewExpeseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal 
        show={showViewExpenseModal} 
        onClose={setShowViewExpeseModal}
        expense={expense}
      />

      <button onClick={() => setShowViewExpeseModal(true)}>
        <div
          className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => {}}
        >
          <div className="flex gap-3 items-center">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseCatagoryItems;
