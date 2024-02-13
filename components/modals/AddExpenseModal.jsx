// "use client";

import React, { useContext, useState, useRef } from "react";
import Modal from "../Modal";

// uuid
import { v4 as uuidv4 } from "uuid";

import { financeContext } from "@/lib/store/finance-context";

const AddExpenseModal = ({ show, onClose }) => {
  // state for expense amount input
  const [expenseAmount, setExpenseAmount] = useState("");

  // which category is selected
  const [selectedCategory, setSlectedCategory] = useState(null);

  // expense category from context store
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  // adding the expese to the db
  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      setExpenseAmount("");
      setSlectedCategory(null);
    } catch (error) {
      console.error(error.message, "addexpensemodal");
    }
  };


  // reference and state for the new category feature 
  const titleRef = useRef();
  const colorRef = useRef();
  const [showAddExpense, setShowAddExpense] = useState(false);

  // create new category
  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value; 

    try {
      await addCategory({ title, color, total: 0});

      setShowAddExpense(false);
      titleRef.current.value = "";
      colorRef.current.value = "";
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <label>Enter An Amount : </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>

      {/* expense categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          {/* new category section along with heading */}
          <div className="flex justify-between px-3">
            <h3 className="text-xl capitalize">Select Expense Category</h3>
            <button
             className="text-lime-400 hover:scale-105"
             onClick={() => setShowAddExpense(!showAddExpense)}
            >
              + New Category
            </button>
          </div>

          {/* category and color selection */}
          { showAddExpense && 
              <div className="flex flex-col items-center justify-between gap-3">
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Enter Title"
                    ref={titleRef}
                  />
                  <div className="flex gap-1 items-center">
                    <label>Pick Color</label>
                    <input
                    type="color"
                    ref={colorRef}
                    className="h-10 w-24" 
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-primary-outline hover:bg-green-600" onClick={addCategoryHandler}>Create</button>
                  <button className="btn btn-primary hover:bg-red-600" onClick={() => setShowAddExpense(false)}>Cancel</button>
                </div>

              </div>
          }

          {expenses.map((item) => {
            return (
              <button key={item.id} onClick={() => setSlectedCategory(item.id)}>
                <div
                  style={{
                    boxShadow:
                      item.id === selectedCategory ? "1px 1px 1px" : "none",
                  }}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-full transition-transform hover:scale-105 duration-200"
                >
                  <div className="flex gap-3 items-center">
                    {/* color circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    {/* title */}
                    <h4 className="capitalize">{item.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddExpenseModal;
