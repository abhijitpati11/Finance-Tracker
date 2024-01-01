
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <AuthContextProvider>
      <FinanceContextProvider>
          <Navigation />
          <Dashboard />
      </FinanceContextProvider>
    </AuthContextProvider>
  );
}
