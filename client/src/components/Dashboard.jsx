import { useAuth } from '../context/AuthContext';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import Chart from './Chart';
import Filters from './Filters';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-primary-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/src/images/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-600">ExpenseTracker</span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AddExpense />
            <Filters />
            <ExpenseList />
          </div>
          <div className="space-y-8">
            <Chart />
          </div>
        </div>
      </main>
    </div>
  );
}