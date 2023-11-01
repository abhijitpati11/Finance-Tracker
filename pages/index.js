
import FinanceContextProvider from "@/lib/store/finance-context";

import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";


export default function Home() {
  return (
    <FinanceContextProvider>
      {/* navigation bar */}
      <Navigation />

      {/* Body section */}
      <Dashboard />
    </FinanceContextProvider>
  );
}
