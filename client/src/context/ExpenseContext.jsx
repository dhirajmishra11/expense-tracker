import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const { token } = useAuth();

  // Add these new states
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Update fetchExpenses to handle pagination
  const fetchExpenses = useCallback(async (month, page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/expenses?month=${month}&page=${page}`);
      setExpenses(response.data.expenses);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    try {
      const response = await axios.post('/api/expenses', expenseData);
      setExpenses(prev => [...prev, response.data]);
      toast.success('Expense added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add expense');
      return false;
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      return true; // Return true on success
    } catch (error) {
      console.error('Error deleting expense:', error);
      return false; // Return false on failure
    }
  }, []);

  const updateExpense = useCallback(async (id, expenseData) => {
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(prev => 
        prev.map(expense => 
          expense._id === id ? response.data : expense
        )
      );
      toast.success('Expense updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update expense');
      return false;
    }
  }, []);

  // Update CSV export function
  const exportToCSV = useCallback(async (month) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `/api/expenses/export/csv?month=${month}`,
        method: 'GET',
        responseType: 'blob'
      });

      // Create a blob from the response
      const blob = new Blob([response.data], { type: 'text/csv' });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `expenses-${month}.csv`;
      
      // Append to body, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Export completed successfully');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ExpenseContext.Provider value={{
      expenses,
      loading,
      fetchExpenses,
      addExpense,
      deleteExpense,
      updateExpense,
      editingExpense,
      setEditingExpense,
      pagination,
      selectedCategory,
      setSelectedCategory,
      currentMonth,
      setCurrentMonth,
      exportToCSV
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);