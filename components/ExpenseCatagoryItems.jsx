import React from "react";
import { currencyFormatter } from '@/lib/utils'

const ExpenseCatagoryItems = ({ color, title, total, showedIncomeModal, setShowedIncomeModal }) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => {}}>
        <div className="flex gap-3 items-center">
          <div className='w-[25px] h-[25px] rounded-full' style={{backgroundColor: color}} />
          <h4 className="capitalize">{title}</h4>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </>
  );
};

export default ExpenseCatagoryItems;
