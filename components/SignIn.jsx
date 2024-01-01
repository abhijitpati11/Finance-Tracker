import { authContext } from '@/lib/store/auth-context'
import { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'


const SignIn = () => {

  const { googleLoginHandler, loading } = useContext(authContext)

  return (
   <>
    <main className='container max-w-2xl px-6 mx-auto'>
     <h1 className='mb-6 text-6xl font-bold text-center mx-auto'>
      Welcome To <p className='font-thin mt-10 mb-5'>Finance Database</p> 
      💲💲💲
     </h1>

     <button 
      className='w-full flex overflow-hidden shadow-md shadow-slate-500  bg-slate-800 rouded-2xl'
      onClick={googleLoginHandler}
     >
      <div className='flex items-center gap-2 p-4 mx-auto text-2xl cursor-pointer'> 
       <FcGoogle />
       <p>Continue With Google</p> 
      </div>
     </button>
      
    </main>
    </>
  )
}

export default SignIn
