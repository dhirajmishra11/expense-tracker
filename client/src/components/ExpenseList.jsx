import { TrashIcon, PencilIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useExpenses } from '../context/ExpenseContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Pagination from './Pagination';

export default function ExpenseList() {
  const { 
    expenses, 
    loading, 
    pagination,
    deleteExpense, 
    setEditingExpense,
    exportToCSV,
    fetchExpenses,
    currentMonth // Make sure this is passed from context
  } = useExpenses();

  // Add selectedCategory from props
  const { selectedCategory, month } = useExpenses();

  // Filter expenses based on selected category
  const filteredExpenses = selectedCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      background: '#ffffff',
      borderRadius: '0.5rem',
      customClass: {
        container: 'font-sans'
      }
    });

    if (result.isConfirmed) {
      try {
        const success = await deleteExpense(id);
        if (success) {
          toast.success('Expense deleted successfully');
          // Optionally refresh the list
          fetchExpenses(currentMonth, pagination.page);
        } else {
          toast.error('Failed to delete expense');
        }
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    fetchExpenses(month, page);
  };

  const handleExport = async () => {
    if (!currentMonth) {
      alert('Please select a month first');
      return;
    }
    await exportToCSV(currentMonth);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Expense History</h3>
        <button
          onClick={handleExport}
          disabled={loading}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white
            ${loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'}
            transition-colors duration-200`}
        >
          {loading ? 'Exporting...' : (
            <>
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export CSV
            </>
          )}
        </button>
      </div>
      <div className="min-w-full divide-y divide-gray-200">
        <div className="bg-gray-50">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div>Date</div>
            <div>Category</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Actions</div>
          </div>
        </div>
        <div className="bg-white divide-y divide-gray-200">
          {filteredExpenses.map((expense) => (
            <div key={expense._id} className="grid grid-cols-5 gap-4 px-6 py-4 text-sm">
              <div className="text-gray-900">
                {new Date(expense.date).toLocaleDateString()}
              </div>
              <div className="text-gray-900">{expense.category}</div>
              <div className="text-gray-500">{expense.description}</div>
              <div className="text-gray-900">
                ${expense.amount.toFixed(2)}
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEdit(expense)}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(expense._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {filteredExpenses.length === 0 && (
            <div className="px-6 py-4 text-sm text-gray-500 text-center">
              No expenses found for this period.
            </div>
          )}
        </div>
      </div>
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}