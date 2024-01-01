// This is the global file to store data that we want to acees in the entire application like income data, expense data, monthly savings etc.
"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { authContext } from "./auth-context";


import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";


export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {}, 
  deleteExpenseCategory: async () => {},
  addMonthlyDatabase: async () => {},
});

export default function FinanceContextProvider({ children }) {
  // state for income
  const [income, setIncome] = useState([]);

  // state for expenses
  const [expenses, setExpenses] = useState([]);

  // destructuring the user form auth context to show data related to only the particular user
  const { user } = useContext(authContext);

  // adding income to the db
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

  // removing income from the db
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
    if(!user) return;

    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docsSnapshot = await getDocs(q);

      const incomeData = docsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(incomeData);
    };

    const getExpenseData = async () => {
      const collectionRef = collection(db, "expense");

      const q = query(collectionRef, where("uid", "==", user.uid));

      const docSnap = await getDocs(q);

      const expenseData = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setExpenses(expenseData);
      console.log(expenses)
    };

    
    getIncomeData();
    getExpenseData();
  }, [user, db]);


  // adding expenses to the db
  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, 'expense', expenseCategoryId);

    try {
      await updateDoc(docRef, {...newExpense});

      // update the state
      setExpenses(prevState => {
        const updatedExpenses = [...prevState]

        const foundIndex = updatedExpenses.findIndex(expense => {
          return expense.id === expenseCategoryId;
        })

        updatedExpenses[foundIndex] = {id: expenseCategoryId, ...newExpense}

        return updatedExpenses;
      })
    } catch (error) {
      console.error(error.message, 'financecontext');
    }
  }

  // delete expense item from the custom modal
  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      
      const docRef = doc(db, 'expense', expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      })

      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCategoryId);

        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;

        return updatedExpenses;
      })

    } catch (error) {
      console.error(error.message);
    }
  }

  // delete expense category
  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      // reference of the document we want to delete
      const docRef = doc(db, "expense", expenseCategoryId); 
      await deleteDoc(docRef);

      // update the state
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter((e) => e.id !== expenseCategoryId)

        return [...updatedExpenses];
      })

    } catch (error) {
      throw error;
    }
  }

  // adding new category from the expenses section
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, 'expense');

      const docSnap =  await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      })

      setExpenses(prevExpenses => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            uid: user.uid,
            items: [],
            ...category
          }
        ]
      })
    } catch (error) {
      console.error(error.message);
    }
  }

  // add all data to a monthly database
  const addMonthlyDatabase = async () => {
    console.log('Monthly data added')
  }


  // this object will be used to pass all the required items
  const allContextValues = { 
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory, 
    deleteExpenseItem,
    deleteExpenseCategory,
    addMonthlyDatabase,
  };

  return (
    <financeContext.Provider value={allContextValues}>
      {children}
    </financeContext.Provider>
  );
}
