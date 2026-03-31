# 💰 Finio - Expense Tracking

A modern, lightweight expense tracker built with **React** and **Vite**. Track your income, manage budgets, and visualize spending patterns with beautiful charts and analytics.

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 📊 **Dashboard** - View income, expenses, balance, and recent transactions at a glance
- 📋 **Transactions Management** - Add, edit, and delete transactions with category filtering
- 💳 **Budget Tracking** - Set monthly spending limits by category and monitor progress
- 📈 **Financial Reports** - Analysis of yearly expenses and top spending categories
- 🎨 **Modern UI** - Dark theme with smooth animations and aurora blob effects
- 💾 **Local Storage** - Auto-save all data in browser (no backend required)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎯 **Category Management** - Pre-defined categories: Income, Salary, Food, Entertainment, Shopping, Bills, Others

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anjishnu04/finio-react.git
   cd finio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

The optimized app will be in the `dist/` folder, ready to deploy.

## 📁 Project Structure

```
finio-react/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation and app branding
│   │   ├── Toast.jsx            # Notification component
│   │   ├── charts/
│   │   │   ├── BarChart.jsx     # Monthly expenses chart
│   │   │   └── DonutChart.jsx   # Category distribution chart
│   │   └── modals/
│   │       └── TransactionModal.jsx  # Add/Edit transaction form
│   ├── pages/
│   │   ├── Dashboard.jsx        # Overview with summary cards
│   │   ├── Transactions.jsx     # Full transaction list
│   │   ├── Budgets.jsx          # Budget management
│   │   └── Reports.jsx          # Financial analytics
│   ├── utils/
│   │   ├── storage.js           # LocalStorage management
│   │   ├── calculations.js      # Financial calculations
│   │   ├── categories.js        # Category definitions
│   │   └── formatting.js        # Date/currency formatting
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   ├── App.css                  # Global styles
│   └── index.css                # Base styles
├── package.json
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint rules
└── README.md
```

## 🎯 Usage Guide

### Dashboard
- View total income, expenses, and balance
- See recent transactions and spending trends
- Visual charts showing spending by category and monthly trends

### Add Transaction
1. Click **"Add Transaction"** button
2. Fill in amount, category, date, and description
3. Choose type (Income/Expense)
4. Click **"Save"** - automatically saved to LocalStorage

### Manage Budgets
1. Go to **Budgets** page
2. Set monthly limits for each category
3. Dashboard shows progress bars for each budget
4. Get alerts when approaching limits

### View Reports
- **Yearly Overview** - Total income and expenses
- **Category Breakdown** - See which categories you spend most on
- **Expense Distribution** - Visual pie chart of spending

### Filter & Search Transactions
- Filter by category
- Search by description
- Sort by date or amount
- Edit or delete any transaction

## 🛠️ Technologies Used

- **React 18** - UI library for building user interfaces
- **Vite 8** - Lightning-fast build tool and dev server
- **JavaScript ES6+** - Modern JavaScript syntax
- **Canvas API** - Creating dynamic charts and visualizations
- **LocalStorage API** - Client-side data persistence
- **CSS3** - Styling with animations and gradients

## 📊 Sample Data

The app comes pre-loaded with 11 sample transactions to demonstrate features:
- ₹50,000 salary income
- ₹15,000 rent expense
- ₹1,200 groceries
- ₹2,500 entertainment
- ₹3,000 shopping
- ₹1,500 bills
- And more examples across all categories

All sample data is stored locally and can be modified or deleted at any time.

## 🔒 Data Storage

- **Location**: Browser LocalStorage
- **Security**: Data stays on your device (no server storage)
- **Backup**: Export regularly or save browser data
- **Privacy**: 100% private - no data leaves your computer

## 💾 Export Data

Data is stored in browser LocalStorage under keys:
- `fn_tx` - All transactions
- `fn_bd` - All budgets

You can export using browser DevTools:
```javascript
// In browser console (F12):
localStorage.getItem('fn_tx')  // Get all transactions
localStorage.getItem('fn_bd')  // Get all budgets
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
# Then push to GitHub and connect to Vercel for auto-deployment
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify, or connect GitHub repo
```

### Deploy to GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try the next port (5174, 5175, etc.)

### Data Not Saving
- Check browser LocalStorage is enabled
- Open DevTools → Application → LocalStorage → Verify `fn_tx` and `fn_bd` exist

### Charts Not Showing
- Make sure JavaScript is enabled in browser
- Try refreshing the page (Ctrl+R or Cmd+R)
- Clear browser cache and reload

## 🔄 Future Enhancements

- 📱 PWA support for offline usage
- 🔐 User authentication & cloud sync
- 📧 Email expense reports
- 📊 Advanced analytics and machine learning predictions
- 💳 API integration with banking platforms
- 🔔 Bill reminders and notifications
- 📤 Export to CSV/PDF formats

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Anjishnu Sarkar** - [GitHub Profile](https://github.com/Anjishnu04)

## 🙏 Support

If you found this helpful, please give it a ⭐ on GitHub!

For issues, questions, or suggestions, feel free to open an issue on GitHub.

---

**Made with 💜 for better expense tracking**
