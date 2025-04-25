import { Link } from "react-router-dom";

export default function Landing() {
  const handleLearnMore = () => {
    // Smooth scroll to the features section
    document.querySelector('#features').scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/src/images/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">
                ExpenseTracker
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Smart Expense Tracking for Better Financial Control
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Take control of your finances with our intuitive expense
                tracking solution. Monitor spending, set budgets, and make
                informed financial decisions.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Start Tracking Free
                </Link>
                <button
                  onClick={handleLearnMore}
                  className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/src/images/landignpg1.png"
                alt="Dashboard Preview"
                className="w-full max-h-96 object-cover  rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Expense Tracker?
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you manage your expenses effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/src/images/landingpg2.png"
                alt="App Preview"
                className="w-full max-h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visualize Your Spending Patterns
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get detailed insights into your spending habits with interactive
                charts and reports. Make better financial decisions with
                data-driven analytics.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src="/src/images/logo.png"
                  alt="Logo"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-lg font-bold">ExpenseTracker</span>
              </div>
              <p className="text-gray-400">
                Smart expense tracking for better financial control.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorial
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  {/* Add social media icons */}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} ExpenseTracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "📊",
    title: "Visual Analytics",
    description:
      "Track your expenses with interactive charts and detailed breakdowns.",
  },
  {
    icon: "🔒",
    title: "Secure Data",
    description: "Your financial data is encrypted and stored securely.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Access your expense tracker from any device, anywhere.",
  },
  {
    icon: "📥",
    title: "Export Reports",
    description:
      "Download your expense reports in CSV format for further analysis.",
  },
  {
    icon: "🎯",
    title: "Budget Goals",
    description:
      "Set and track your budget goals with customizable categories.",
  },
  {
    icon: "⚡",
    title: "Real-time Updates",
    description: "See your expense updates and summaries in real-time.",
  },
];

const benefits = [
  "Interactive pie and bar charts for expense visualization",
  "Monthly and yearly expense summaries",
  "Category-wise expense breakdown",
  "Export reports in multiple formats",
  "Mobile-responsive design for on-the-go access",
  "Secure and encrypted data storage",
];
