// This is the global file to store data that we want to acees in the entire application like income data, expense data, monthly savings etc.
"use client";


import { createContext, useEffect, useState } from "react";

import { addDoc, collection, deleteDoc, doc, getDocs  } from "firebase/firestore";
import { db } from "../firebase";



export const financeContext = createContext({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
 
 const [income, setIncome] = useState([]);
 
 const addIncomeItem = async (newIncome) => {
  // sendig data to the firebase db
  // reference to the db and collection name
  const collectionRef = collection(db, "income");

    // adding data to the collectionref
    try {
      const res = await addDoc(collectionRef, newIncome);

      // updating the state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: res.id,
            ...newIncome,
          },
        ];
      });


    } catch (error) {
      console.error(error);
    }
  };

  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);

    try {
      await deleteDoc(docRef);

      // updating the income history state
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      alert("Unable to delete data");
      console.error(error);
    }
  };
  
  // fetching the income data from the db
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnapshot = await getDocs(collectionRef);

      const incomeData = docsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
       });
       setIncome(incomeData);
      };
      getIncomeData();
     }, [db]);


     // this object will be used to pass all the required items
     const allValues = { income, addIncomeItem, removeIncomeItem };
     
     return (
      <financeContext.Provider value={allValues}>
      {children}
    </financeContext.Provider>
  );
}
