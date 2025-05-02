// Mock data for development
let mockBills = [
  {
    id: '1',
    name: 'Electricity Bill',
    amount: 120.50,
    dueDate: new Date('2023-12-15').toISOString(),
    category: 'utilities',
    paid: false,
    userId: 'user123'
  },
  {
    id: '2',
    name: 'Rent',
    amount: 1500,
    dueDate: new Date('2023-12-01').toISOString(),
    category: 'rent',
    paid: true,
    userId: 'user123'
  }
];

let mockTransactions = [
  {
    id: '1',
    name: 'Grocery Shopping',
    amount: -85.75,
    date: new Date('2023-11-28').toISOString(),
    category: 'food',
    type: 'expense',
    userId: 'user123'
  },
  {
    id: '2',
    name: 'Salary Deposit',
    amount: 3000,
    date: new Date('2023-11-25').toISOString(),
    category: 'income',
    type: 'income',
    userId: 'user123'
  }
];

// Mock services
export const mockBillsService = {
  getBills: (userId) => {
    console.log('Mock getBills called with userId:', userId);
    return Promise.resolve({ 
      data: mockBills.filter(bill => bill.userId === userId)
    });
  },
  addBill: (bill) => {
    console.log('Mock addBill called with:', bill);
    const newBill = { ...bill, id: Date.now().toString() };
    mockBills.push(newBill);
    // We'll add localStorage later
    return Promise.resolve({ data: newBill });
  },
  payBill: (billId) => {
    console.log('Mock payBill called with billId:', billId);
    mockBills = mockBills.map(bill => 
      bill.id === billId ? { ...bill, paid: true } : bill
    );
    // We'll add localStorage later
    return Promise.resolve({ success: true });
  }
};

export const mockTransactionService = {
  getTransactions: (userId) => {
    console.log('Mock getTransactions called with userId:', userId);
    const filteredTransactions = mockTransactions.filter(transaction => transaction.userId === userId);
    return Promise.resolve({ data: filteredTransactions });
  },
  addTransaction: (transaction) => {
    console.log('Mock addTransaction called with:', transaction);
    const newTransaction = { ...transaction, id: Date.now().toString() };
    mockTransactions.push(newTransaction);
    // We'll handle localStorage consistently later
    return Promise.resolve({ data: newTransaction });
  }
};

export const mockInvestmentService = {
  getInvestments: (userId) => {
    console.log('Mock getInvestments called with userId:', userId);
    return Promise.resolve({ 
      data: [] // Empty investments for now
    });
  }
};

export const mockBudgetService = {
  getBudgets: (userId) => {
    console.log('Mock getBudgets called with userId:', userId);
    return Promise.resolve({ 
      data: [] // Empty budgets for now
    });
  }
};