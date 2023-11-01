import React, { useRef, useEffect, useContext } from "react";
import Modal from "../Modal";
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { currencyFormatter } from "@/lib/utils";

// context
import { financeContext } from "@/lib/store/finance-context";



const AddIncomeModal = ({ show, onClose }) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  
  // getting the contxt
  const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext);


  // income handler functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };
    
    try {
     await addIncomeItem(newIncome);
     
     amountRef.current.value = "";
     descriptionRef.current.value = "";
    } catch (error) {
     alert('An error ocurred while adding income');
     console.log(error)
    }

  };

  

  // delete income handler
  const deleteIncomeHandler = async (incomeId) => {
    
   try {
    await removeIncomeItem(incomeId);
   } catch (error) {
    alert('An error occured occured while removing your entry');
    console.log(error)
   }

  };

  return (
    <Modal show={show} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={addIncomeHandler}>
        <div className="flex flex-col gap-4">
          <label htmlFor="amount">Enter Income Amount</label>
          <input
            type="number"
            name="amount"
            min={0.01}
            step={0.01}
            placeholder="Enter Income Amount"
            required
            ref={amountRef}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="amount">Enter Income Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter Income Description"
            required
            ref={descriptionRef}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Entry
        </button>
      </form>

      {/* income history */}
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
        {income.map((i) => {
          return (
            <div key={i.id} className="flex items-center justify-between px-2">
              <div className="flex flex-col  ">
                <p className="font font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex gap-2 items-center">
                {currencyFormatter(i.amount)}
                <button
                  className="cursor-pointer"
                  onClick={() => deleteIncomeHandler(i.id)}
                >
                  <RiDeleteBin5Fill />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
