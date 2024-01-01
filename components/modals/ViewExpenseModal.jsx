import React, { useContext } from 'react'
import Modal from '../Modal'
import { currencyFormatter } from '@/lib/utils'
import { FaRegTrashAlt } from 'react-icons/fa'

import { financeContext } from '@/lib/store/finance-context'

const ViewExpenseModal = ({ show, onClose, expense }) => {

  const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext);

  // function to delete item
  const deleteExpenseItemHandler = async (item) => {

   try {
     // remove items fromt the main list
     const updatedItems = expense.items.filter((i) => i.id !== item.id);

     // update expense balance
     const updatedExpense = {
      items: [...updatedItems],
      total: expense.total - item.amount,
     };

     deleteExpenseItem(updatedExpense, expense.id)

   } catch (error) {
     console.error(error.message);
   }
  }

  // delete expense category from the db
  const deleteExpenseHandler = async () => { 
   try {
     await deleteExpenseCategory(expense.id);

   } catch (error) {
     throw error;
   }
  }

  return (
      <Modal show={show} onClose={onClose}>
        <div className='flex items-center justify-between'>
         <h2 className='text-4xl'>{expense.title}</h2>
         <button 
          className='btn btn-danger hover:scale-110'
          onClick={() => deleteExpenseHandler()}
         >
          Delete
         </button>
        </div>

        <div>
         <h2 className='my-5 text-2xl'>Expense History</h2>
         {expense.items.map((item) => {
          return <div key={item.id} className='flex items-center justify-between'>
           <small className='text-md'>
            {item.createdAt.toMillis
             ? new Date(item.createdAt.toMillis()).toISOString()
             :item.createdAt.toISOString()}
           </small>

           <p className='flex gap-2 items-center'>
            {currencyFormatter(item.amount)}

            <button onClick={() => deleteExpenseItemHandler(item)}>
             <FaRegTrashAlt />
            </button>
           </p>
          </div>
         })}
        </div>

      </Modal>
  )
}

export default ViewExpenseModal
