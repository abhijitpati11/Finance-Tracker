import { LuIndianRupee } from "react-icons/lu";

export const GridDisplay = ({ data, params }) => {
 
  return (
    <div className='flex justify-evenly pt-4 hover:cursor-pointer'>
     <div className='btn border-b hover:border-pink-500'>{data.month}</div>
     <div className='btn border-b hover:border-yellow-300 flex items-center' >
      <LuIndianRupee />{data.income}
     </div>
     <div className='btn border-b hover:border-red-600 flex items-center'>
     <LuIndianRupee />{data.expense}
     </div>
     <div className='btn border-b hover:border-green-700 flex items-center'>
     <LuIndianRupee />{data.savings}
     </div>
    </div>
  )
}

export const HeadingDisplay = ({ data }) => {
 return (
  <div className='flex justify-evenly pt-4 '>
    <div className='btn border-b ml-4 text-pink-500'>{data[0]}</div>
    <div className='btn border-b ml-4 text-yellow-300'>{data[1]}</div>
    <div className='btn border-b text-red-600'>{data[2]}</div>
    <div className='btn border-b text-green-700'>{data[3]}</div>
   </div>
 )
}
