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

let mockPosts = [
  {
    id: '1',
    title: 'Tips for saving on monthly bills',
    content: 'I\'ve been trying to reduce my monthly expenses and found that calling service providers to negotiate rates can save a lot. Anyone else have good tips for saving on bills?',
    author: 'Sarah Johnson',
    publishDate: new Date('2023-11-15').toISOString(),
    replies: [
      {
        author: 'Michael Chen',
        content: 'Great tip! I have found that bundling services like internet and TV can also lead to significant discounts.',
        date: new Date('2023-11-16').toISOString()
      },
      {
        author: 'Priya Patel',
        content: 'Something that worked for me was switching to annual payments for subscriptions - many offer discounts for paying upfront.',
        date: new Date('2023-11-17').toISOString()
      }
    ],
    userId: 'user123'
  },
  {
    id: '2',
    title: 'Beginner investment advice',
    content: 'I\'m new to investing and have about $5000 to start with. What would you recommend for a beginner who wants to be somewhat conservative but still see growth?',
    author: 'John Doe',
    publishDate: new Date('2023-11-20').toISOString(),
    replies: [
      {
        author: 'Emma Wilson',
        content: 'Index funds are a great place to start! They give you broad market exposure with low fees. Maybe start with an S&P 500 index fund.',
        date: new Date('2023-11-21').toISOString()
      }
    ],
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

export const mockCommunityService = {
  getPosts: () => {
    console.log('Mock getPosts called');
    return Promise.resolve({ 
      data: mockPosts
    });
  },
  getPost: (postId) => {
    console.log('Mock getPost called with postId:', postId);
    const post = mockPosts.find(p => p.id === postId);
    return Promise.resolve({ 
      data: post || null
    });
  },
  addPost: (post) => {
    console.log('Mock addPost called with:', post);
    const newPost = { ...post, id: Date.now().toString() };
    mockPosts.push(newPost);
    return Promise.resolve({ data: newPost });
  },
  addReply: (postId, reply) => {
    console.log('Mock addReply called with postId:', postId, 'reply:', reply);
    const postIndex = mockPosts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      if (!mockPosts[postIndex].replies) {
        mockPosts[postIndex].replies = [];
      }
      
      mockPosts[postIndex].replies.push(reply);
    }
    
    return Promise.resolve({ success: true });
  },
  likePost: (postId) => {
    console.log('Mock likePost called with postId:', postId);
    return Promise.resolve({ success: true });
  }
};