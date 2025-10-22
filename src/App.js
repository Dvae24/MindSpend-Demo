import React, { useState } from 'react';
import {
  Wallet, Home, Zap, Users, MessageCircle, ArrowLeft,
  ChevronRight, Calendar, DollarSign
} from 'lucide-react';

function App() {
  // State management
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userType, setUserType] = useState(null);
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [expandedGoal, setExpandedGoal] = useState(null);
  
  // Sample data
  const userData = {
    professional: {
      name: 'Miguel',
      theme: 'professional',
      nudge: {
        title: '⚠️ Status Spending Alert',
        message: 'Your Nike shoes purchase (₱5,500) is a status spending trigger. This delays your Japan trip by 2 weeks.',
        impact: 'Impact on Japan Trip: -₱5,500 (2 weeks delay)'
      }
    },
    ofw: {
      name: 'Maria',
      theme: 'ofw',
      nudge: {
        title: '📊 Remittance Update',
        message: 'Your family has allocated 85% of your remittance according to plan. House fund is growing on schedule.',
        impact: 'House Fund: +₱40,000 this month (2 months ahead of schedule)'
      }
    },
    recovery: {
      name: 'Carlos',
      theme: 'recovery',
      nudge: {
        title: '💳 Debt Progress Alert',
        message: "Congratulations! You've paid off 65% of your credit card debt. Keep going!",
        impact: 'Debt-free timeline: 8 months (3 months ahead of schedule)'
      }
    },
    entrylevel: {
      name: 'Sophia',
      theme: 'entrylevel',
      nudge: {
        title: '🎮 Savings Challenge',
        message: "You've completed Week 2 of the No-Spend Challenge! You've saved ₱1,200 so far.",
        impact: 'Weekly Challenge: 2/4 completed (₱1,200 saved)'
      }
    }
  };

  const transactions = [
    { id: 1, name: 'Starbucks', amount: -450, category: 'Dining', date: 'June 15, 2023', icon: '☕' },
    { id: 2, name: 'Grab', amount: -85, category: 'Transport', date: 'June 14, 2023', icon: '🚗' },
    { id: 3, name: 'Salary', amount: 50000, category: 'Income', date: 'June 10, 2023', icon: '💰' },
    { id: 4, name: 'Jollibee', amount: -320, category: 'Dining', date: 'June 8, 2023', icon: '🍗' },
    { id: 5, name: 'Nike Shoes', amount: -5500, category: 'Shopping', date: 'June 5, 2023', icon: '👟' }
  ];

  const goals = [
    { id: 1, name: 'Japan Trip', saved: 85000, target: 200000, deadline: 'Dec 2023', icon: '✈️' },
    { id: 2, name: 'Emergency Fund', saved: 32000, target: 100000, deadline: 'Mar 2024', icon: '🏥' },
    { id: 3, name: 'Laptop Fund', saved: 18500, target: 50000, deadline: 'Aug 2023', icon: '💻' }
  ];

  const spendingCategories = [
    { name: 'Dining', amount: 8500, percentage: 28, color: 'bg-yellow-500' },
    { name: 'Transport', amount: 3200, percentage: 11, color: 'bg-blue-500' },
    { name: 'Shopping', amount: 12000, percentage: 40, color: 'bg-pink-500' },
    { name: 'Bills', amount: 6800, percentage: 21, color: 'bg-purple-500' }
  ];

  const nudges = {
    professional: [
      { id: 1, title: '⚠️ Status Spending Alert', message: 'Your Nike shoes purchase is a status spending trigger.' },
      { id: 2, title: '🧧 Pakikisama Protection', message: 'You spent ₱3,200 on group dining this week.' }
    ],
    ofw: [
      { id: 1, title: '📊 Remittance On-Track', message: 'Your family is following the budget plan.' },
      { id: 2, title: '👨‍👩‍👧 Family Alert', message: "Your daughter's tuition payment is due next week." }
    ],
    recovery: [
      { id: 1, title: '💳 Debt Progress', message: "You've paid off 65% of your credit card debt!" },
      { id: 2, title: '🎉 Celebration Alert', message: "You've gone 30 days without using your credit card!" }
    ],
    entrylevel: [
      { id: 1, title: '🎮 Challenge Progress', message: 'Week 2 of No-Spend Challenge completed!' },
      { id: 2, title: '💪 Motivation Nudge', message: "You're saving 15% more than last month!" }
    ]
  };

  const familyData = {
    remittance: 80000,
    allocation: [
      { category: 'Bills', amount: 20000, percentage: 25 },
      { category: 'Groceries', amount: 15000, percentage: 19 },
      { category: 'Family Assistance', amount: 5000, percentage: 6 },
      { category: 'House Fund', amount: 40000, percentage: 50, highlight: true }
    ],
    houseFund: {
      saved: 420000,
      target: 500000,
      timeline: '2 months ahead of schedule'
    },
    members: [
      { name: 'Spouse (Ana)', visible: true },
      { name: 'Son (Juan)', visible: true },
      { name: 'Daughter (Lia)', visible: false }
    ]
  };

  const chatMessages = [
    { sender: 'user', message: 'How can I save more money?' },
    { sender: 'peso', message: 'Based on your spending, I see you spend ₱3,500/month on coffee shops. Reducing this by half could save you ₱21,000 per year!' },
    { sender: 'peso', message: 'Another option: Your monthly transport costs are ₱3,200. Carpooling twice a week could save you ₱640/month or ₱7,680/year.' },
    { sender: 'user', message: 'What about my dining expenses?' },
    { sender: 'peso', message: 'You spend ₱8,500/month on dining. Cooking at home just 2 more days a week could save you ₱3,400/month or ₱40,800/year!' }
  ];

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return '₱' + Math.abs(amount).toLocaleString();
  };

  // Get current user data based on selected user type
  const getCurrentUser = () => {
    return userType ? userData[userType] : null;
  };

  // Render login/user selection screen
  const renderLoginScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Wallet className="text-primary mr-2" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">MindSpend</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Choose Your Profile</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => {
                setUserType('professional');
                setCurrentScreen('dashboard');
              }}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 border-professional hover:bg-gray-50 transition-all"
            >
              <div className="bg-professional/10 p-3 rounded-full mr-4">
                <DollarSign className="text-professional" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">Urban Young Professional</h3>
                <p className="text-sm text-gray-500">High income, status spending habits</p>
              </div>
            </button>
            
            <button 
              onClick={() => {
                setUserType('ofw');
                setCurrentScreen('dashboard');
              }}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 border-ofw hover:bg-gray-50 transition-all"
            >
              <div className="bg-ofw/10 p-3 rounded-full mr-4">
                <Users className="text-ofw" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">OFW & Family Member</h3>
                <p className="text-sm text-gray-500">Remittance management, family transparency</p>
              </div>
            </button>
            
            <button 
              onClick={() => {
                setUserType('recovery');
                setCurrentScreen('dashboard');
              }}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 border-recovery hover:bg-gray-50 transition-all"
            >
              <div className="bg-recovery/10 p-3 rounded-full mr-4">
                <Zap className="text-recovery" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">Debt Recovery User</h3>
                <p className="text-sm text-gray-500">Rebuilding finances, debt management</p>
              </div>
            </button>
            
            <button 
              onClick={() => {
                setUserType('entrylevel');
                setCurrentScreen('dashboard');
              }}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 border-entrylevel hover:bg-gray-50 transition-all"
            >
              <div className="bg-entrylevel/10 p-3 rounded-full mr-4">
                <Calendar className="text-entrylevel" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800">Entry-Level Earner</h3>
                <p className="text-sm text-gray-500">Building habits, gamified savings</p>
              </div>
            </button>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            A behavioral finance app for Filipinos
          </p>
        </div>
      </div>
    );
  };

  // Render main dashboard screen
  const renderDashboard = () => {
    const user = getCurrentUser();
    if (!user) return null;

    const themeColor = user.theme;
    const bgColorClass =
      themeColor === 'professional' ? 'bg-professional' :
      themeColor === 'ofw' ? 'bg-ofw' :
      themeColor === 'recovery' ? 'bg-recovery' :
      'bg-entrylevel';

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <header className={`${bgColorClass} text-white p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Hello, {user.name}</h1>
              <p className="text-sm opacity-90">June 2023</p>
            </div>
            <Wallet size={24} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto pb-24">
          {/* Demo Intro Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">This is your dashboard.</span> All your money in one place—banks, GCash, Maya, everything.
            </p>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Connected Accounts</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    BPI
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">BPI Savings</p>
                    <p className="text-xs text-gray-500">****1234</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">₱45,230</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    BDO
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">BDO Checking</p>
                    <p className="text-xs text-gray-500">****5678</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">₱12,850</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    GC
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">GCash</p>
                    <p className="text-xs text-gray-500">09XX XXX 1234</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">₱8,450</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">Maya</p>
                    <p className="text-xs text-gray-500">09XX XXX 5678</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">₱3,280</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Balance</span>
                <span className="text-xl font-bold text-green-600">₱69,810</span>
              </div>
            </div>
          </div>

          {/* Spending Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Total Spending</h2>
              <span className="text-xl font-bold">₱30,855</span>
            </div>
            
            {/* Spending Breakdown */}
            <div className="space-y-3 mt-4">
              {spendingCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span>{formatCurrency(category.amount)} ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full`} 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Behavioral Nudge Card */}
          <div className={`bg-${themeColor}/10 border border-${themeColor}/20 rounded-lg p-4 mb-4`}>
            <h3 className={`text-${themeColor} font-semibold mb-1`}>{user.nudge.title}</h3>
            <p className="text-gray-700 text-sm mb-2">{user.nudge.message}</p>
            <p className={`text-${themeColor} text-xs font-medium`}>{user.nudge.impact}</p>
          </div>
          
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <button 
                onClick={() => setCurrentScreen('transactions')}
                className="text-primary text-sm font-medium flex items-center"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {transactions.slice(0, 5).map(transaction => (
                <div 
                  key={transaction.id}
                  onClick={() => {
                    setExpandedTransaction(transaction.id);
                    setCurrentScreen('transaction-detail');
                  }}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100 text-green-600' : 
                      transaction.category === 'Dining' ? 'bg-yellow-100 text-yellow-600' :
                      transaction.category === 'Transport' ? 'bg-blue-100 text-blue-600' :
                      transaction.category === 'Shopping' ? 'bg-pink-100 text-pink-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <span>{transaction.icon}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Savings Goals */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Savings Goals</h2>
              <button 
                onClick={() => setCurrentScreen('goals')}
                className="text-primary text-sm font-medium flex items-center"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {goals.map(goal => (
                <div 
                  key={goal.id}
                  onClick={() => {
                    setExpandedGoal(goal.id);
                    setCurrentScreen('goal-detail');
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="mr-2">{goal.icon}</span>
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round((goal.saved / goal.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(goal.saved / goal.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatCurrency(goal.saved)} saved</span>
                    <span>Target: {formatCurrency(goal.target)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        {/* Bottom Navigation */}
        {renderBottomNav()}
      </div>
    );
  };

  // Render bottom navigation
  const renderBottomNav = () => {
    if (currentScreen === 'login') return null;
    
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-10">
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center justify-center w-1/4 h-full ${currentScreen === 'dashboard' ? 'text-primary' : 'text-gray-500'}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          onClick={() => setCurrentScreen('nudges')}
          className={`flex flex-col items-center justify-center w-1/4 h-full ${currentScreen === 'nudges' ? 'text-primary' : 'text-gray-500'}`}
        >
          <Zap size={20} />
          <span className="text-xs mt-1">Nudges</span>
        </button>
        
        <button 
          onClick={() => setCurrentScreen('family')}
          className={`flex flex-col items-center justify-center w-1/4 h-full ${currentScreen === 'family' ? 'text-primary' : 'text-gray-500'}`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Family</span>
        </button>
        
        <button 
          onClick={() => setCurrentScreen('chat')}
          className={`flex flex-col items-center justify-center w-1/4 h-full ${currentScreen === 'chat' ? 'text-primary' : 'text-gray-500'}`}
        >
          <MessageCircle size={20} />
          <span className="text-xs mt-1">Peso AI</span>
        </button>
      </nav>
    );
  };

  // Render nudges screen
  const renderNudgesScreen = () => {
    const user = getCurrentUser();
    if (!user) return null;

    const themeColor = user.theme;
    const bgColorClass =
      themeColor === 'professional' ? 'bg-professional' :
      themeColor === 'ofw' ? 'bg-ofw' :
      themeColor === 'recovery' ? 'bg-recovery' :
      'bg-entrylevel';
    const userNudges = nudges[userType] || [];

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className={`${bgColorClass} text-white p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Behavioral Nudges</h1>
              <p className="text-sm opacity-90">June 2023</p>
            </div>
            <Zap size={24} />
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto pb-24">
          <p className="text-gray-600 mb-4">
            Personalized insights based on your spending patterns and financial behavior.
          </p>
          
          <div className="space-y-4">
            {userNudges.map(nudge => (
              <div 
                key={nudge.id}
                className={`bg-${themeColor}/10 border border-${themeColor}/20 rounded-lg p-4`}
              >
                <h3 className={`text-${themeColor} font-semibold mb-2`}>{nudge.title}</h3>
                <p className="text-gray-700">{nudge.message}</p>
              </div>
            ))}
          </div>
        </main>
        
        {renderBottomNav()}
      </div>
    );
  };

  // Render family module screen (OFW feature)
  const renderFamilyScreen = () => {
    const user = getCurrentUser();
    if (!user) return null;
    
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-ofw text-white p-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Family Transparency</h1>
          </div>
        </header>
        
        <main className="flex-1 p-4 overflow-y-auto pb-24">
          {/* Remittance Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Remittance Breakdown</h2>
            <p className="text-sm text-gray-600 mb-4">Monthly allocation of ₱80,000</p>
            
            <div className="space-y-3">
              {familyData.allocation.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.category}</span>
                    <span className={item.highlight ? 'text-ofw font-medium' : ''}>
                      {formatCurrency(item.amount)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={item.highlight ? 'bg-ofw h-2 rounded-full' : 'bg-gray-400 h-2 rounded-full'} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* House Fund Progress */}
          <div className="bg-ofw/10 border border-ofw/20 rounded-lg p-4 mb-4">
            <h3 className="text-ofw font-semibold mb-2">House Fund Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-ofw h-3 rounded-full" 
                style={{ width: `${(familyData.houseFund.saved / familyData.houseFund.target) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>{formatCurrency(familyData.houseFund.saved)} saved</span>
              <span>Target: {formatCurrency(familyData.houseFund.target)}</span>
            </div>
            <p className="text-ofw text-sm font-medium">
              {familyData.houseFund.timeline}
            </p>
          </div>
          
          {/* Family Members */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Family Members</h2>
            <p className="text-sm text-gray-600 mb-4">Who can see this information</p>
            
            <div className="space-y-3">
              {familyData.members.map((member, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b border-gray-100">
                  <span>{member.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member.visible ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {member.visible ? 'Can view' : 'No access'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        {renderBottomNav()}
      </div>
    );
  };

  // Render Peso AI chatbot screen
  const renderChatScreen = () => {
    const user = getCurrentUser();
    if (!user) return null;
    
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-primary text-white p-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Peso AI</h1>
          </div>
        </header>
        
        <main className="flex-1 p-4 overflow-y-auto pb-24">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="text-sm text-gray-600 mb-4">
              Ask Peso AI about your finances and get personalized advice based on your spending patterns.
            </p>
          </div>
          
          <div className="space-y-4">
            {chatMessages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        
        <div className="bg-white border-t border-gray-200 p-3 flex items-center">
          <input 
            type="text" 
            placeholder="Ask Peso AI a question..." 
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="ml-2 bg-primary text-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {renderBottomNav()}
      </div>
    );
  };

  // Render goal detail screen
  const renderGoalDetailScreen = () => {
    const user = getCurrentUser();
    if (!user || !expandedGoal) return null;

    const goal = goals.find(g => g.id === expandedGoal);
    if (!goal) return null;

    const themeColor = user.theme;
    const bgColorClass =
      themeColor === 'professional' ? 'bg-professional' :
      themeColor === 'ofw' ? 'bg-ofw' :
      themeColor === 'recovery' ? 'bg-recovery' :
      'bg-entrylevel';
    const progressPercentage = Math.round((goal.saved / goal.target) * 100);
    const remaining = goal.target - goal.saved;

    // Calculate months until deadline
    const deadlineDate = new Date(goal.deadline);
    const currentDate = new Date();
    const monthsRemaining = (deadlineDate.getFullYear() - currentDate.getFullYear()) * 12 +
                           (deadlineDate.getMonth() - currentDate.getMonth());

    // Calculate required monthly savings
    const monthlySavingsRequired = monthsRemaining > 0 ? Math.ceil(remaining / monthsRemaining) : remaining;

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className={`${bgColorClass} text-white p-4`}>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="mr-2"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{goal.name}</h1>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto pb-24">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-center items-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={themeColor === 'professional' ? '#3b82f6' : 
                            themeColor === 'ofw' ? '#a855f7' : 
                            themeColor === 'recovery' ? '#f97316' : '#6366f1'}
                    strokeWidth="3"
                    strokeDasharray={`${progressPercentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{progressPercentage}%</span>
                  <span className="text-xs text-gray-500">completed</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Saved</span>
                <span className="font-semibold">{formatCurrency(goal.saved)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Target</span>
                <span className="font-semibold">{formatCurrency(goal.target)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold">{formatCurrency(remaining)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Deadline</span>
                <span className="font-semibold">{goal.deadline}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Months Remaining</span>
                <span className="font-semibold">{monthsRemaining}</span>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Required Monthly Savings</span>
                  <span className={`font-bold text-${themeColor}`}>{formatCurrency(monthlySavingsRequired)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`bg-${themeColor}/10 border border-${themeColor}/20 rounded-lg p-4 mb-4`}>
            <h3 className={`text-${themeColor} font-semibold mb-2`}>Savings Tip</h3>
            <p className="text-gray-700 text-sm">
              {goal.name === 'Japan Trip' 
                ? 'Reducing your dining expenses by 20% would allow you to reach this goal 1 month earlier.'
                : goal.name === 'Emergency Fund'
                ? 'Setting up an automatic transfer of ₱8,000 per month would complete this goal by your deadline.'
                : 'Selling items you no longer use could add ₱5,000-10,000 to this fund immediately.'}
            </p>
          </div>
        </main>
        
        {renderBottomNav()}
      </div>
    );
  };

  // Render transaction detail screen
  const renderTransactionDetailScreen = () => {
    const user = getCurrentUser();
    if (!user || !expandedTransaction) return null;

    const transaction = transactions.find(t => t.id === expandedTransaction);
    if (!transaction) return null;

    const themeColor = user.theme;
    const bgColorClass =
      themeColor === 'professional' ? 'bg-professional' :
      themeColor === 'ofw' ? 'bg-ofw' :
      themeColor === 'recovery' ? 'bg-recovery' :
      'bg-entrylevel';

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className={`${bgColorClass} text-white p-4`}>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="mr-2"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Transaction Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto pb-24">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                transaction.amount > 0 ? 'bg-green-100 text-green-600' : 
                transaction.category === 'Dining' ? 'bg-yellow-100 text-yellow-600' :
                transaction.category === 'Transport' ? 'bg-blue-100 text-blue-600' :
                transaction.category === 'Shopping' ? 'bg-pink-100 text-pink-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <span className="text-2xl">{transaction.icon}</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{transaction.name}</h2>
              <p className={`text-xl font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold">{transaction.category}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">{transaction.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold">Credit Card</span>
              </div>
            </div>
          </div>
          
          {/* Behavioral Insight for Shopping transactions */}
          {transaction.category === 'Shopping' && (
            <div className={`bg-${themeColor}/10 border border-${themeColor}/20 rounded-lg p-4 mb-4`}>
              <h3 className={`text-${themeColor} font-semibold mb-2`}>Behavioral Insight</h3>
              <p className="text-gray-700 text-sm mb-2">
                This purchase falls into your "status spending" pattern. Similar purchases this month: 3
              </p>
              <div className="pt-2 border-t border-gray-200 mt-2">
                <p className={`text-${themeColor} text-sm font-medium`}>
                  Impact on Japan Trip Goal: 3 weeks delay
                </p>
              </div>
            </div>
          )}
          
          {/* Dining Insight */}
          {transaction.category === 'Dining' && (
            <div className={`bg-${themeColor}/10 border border-${themeColor}/20 rounded-lg p-4 mb-4`}>
              <h3 className={`text-${themeColor} font-semibold mb-2`}>Dining Pattern</h3>
              <p className="text-gray-700 text-sm mb-2">
                You've spent ₱3,200 on coffee shops this month (38% of dining budget)
              </p>
              <div className="pt-2 border-t border-gray-200 mt-2">
                <p className={`text-${themeColor} text-sm font-medium`}>
                  Potential monthly savings: ₱1,600 by reducing coffee purchases by half
                </p>
              </div>
            </div>
          )}
        </main>
        
        {renderBottomNav()}
      </div>
    );
  };

  // Main render function
  const renderContent = () => {
    switch (currentScreen) {
      case 'login':
        return renderLoginScreen();
      case 'dashboard':
        return renderDashboard();
      case 'nudges':
        return renderNudgesScreen();
      case 'family':
        return renderFamilyScreen();
      case 'chat':
        return renderChatScreen();
      case 'goal-detail':
        return renderGoalDetailScreen();
      case 'transaction-detail':
        return renderTransactionDetailScreen();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="max-w-[500px] mx-auto h-screen overflow-hidden">
      {renderContent()}
    </div>
  );
}

export default App;