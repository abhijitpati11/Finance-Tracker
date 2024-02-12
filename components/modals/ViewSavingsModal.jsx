import React, { useContext } from 'react'
import Modal from '../Modal'
import { financeContext } from '@/lib/store/finance-context';
import { GridDisplay, HeadingDisplay } from '../GridDisplay';



const ViewSavingsModal = ({ show, onClose }) => {

 const parameters = [
  "Month",
  "Income",
  "Expense",
  "Savings",
 ]
  const { savings, removeSavingsData } = useContext(financeContext);

  // function to remove all monthly savings
  function removeMonthlySavings() {

  }


  return (
    <div>
      <Modal show={show} onClose={onClose}>
       <div>
        <div className='flex justify-center text-3xl mb-3'>Your Month wise savings is given below -</div> 
        <HeadingDisplay data={parameters} />
        {savings.map((i) => {
         return (
          <div key={i.id}>
           
           <GridDisplay data={i} params={parameters} />
          </div>
         )
        })}
       </div>

       <button className='btn border border-red-600 w-full mt-12 hover:bg-red-600'
        onClick={removeMonthlySavings}
       >
        Delete
       </button>

      </Modal>
    </div>
  )
}

export default ViewSavingsModal
