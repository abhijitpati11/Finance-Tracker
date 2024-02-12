import { LuIndianRupee } from "react-icons/lu";

export const GridDisplay = ({ data, params }) => {
 
  return (
    <div className='flex justify-evenly pt-4 hover:cursor-pointer'>
     <div className='btn border-b hover:border-yellow-500'>{data.month}</div>
     <div className='btn border-b hover:border-yellow-500 flex items-center' >
      <LuIndianRupee />{data.income}
     </div>
     <div className='btn border-b hover:border-yellow-500 flex items-center'>
     <LuIndianRupee />{data.expense}
     </div>
     <div className='btn border-b hover:border-yellow-500 flex items-center'>
     <LuIndianRupee />{data.savings}
     </div>
    </div>
  )
}

export const HeadingDisplay = ({ data }) => {
 return (
  <div className='flex justify-evenly pt-4 '>
    <div className='btn border-b ml-4'>{data[0]}</div>
    <div className='btn border-b ml-4'>{data[1]}</div>
    <div className='btn border-b'>{data[2]}</div>
    <div className='btn border-b'>{data[3]}</div>
   </div>
 )
}
