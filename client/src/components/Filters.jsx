import { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';

const CATEGORIES = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Others'
];

export default function Filters() {
  const { 
    fetchExpenses, 
    selectedCategory, 
    setSelectedCategory,
    currentMonth,
    setCurrentMonth
  } = useExpenses();

  useEffect(() => {
    fetchExpenses(currentMonth);
  }, [currentMonth, fetchExpenses]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Month
          </label>
          <input
            type="month"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-primary-500 focus:ring-primary-500
              hover:border-primary-400 transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-primary-500 focus:ring-primary-500
              hover:border-primary-400 transition-colors duration-200"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}