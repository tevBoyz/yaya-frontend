# Yaya Wallet Transaction Dashboard

A comprehensive React-based dashboard for viewing and managing transactions through the Yaya Wallet API. This application provides a clean, responsive interface for monitoring financial transactions with support for search, pagination, and theme customization.

## Features

- **Transaction Management**: View, search, and paginate through transactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent settings
- **Real-time Data**: Live server time display
- **Advanced Search**: Find transactions by various criteria
- **Visual Indicators**: Color-coded transaction types (incoming/outgoing/top-up)

## Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Environment Management**: dotenv

## Assumptions
  - Authentication:
        There is no login flow. The app assumes a single "current user," which is implicitly defined by the middleware’s API credentials.

  - Data Availability:
        The middleware API is always available and responds with valid JSON.
        Network errors are not deeply handled beyond basic error messages.

   - UI/UX:
        Theme toggle is persisted locally in localStorage.


## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tevBoyz/yaya-frontend.git
cd yaya-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Start the Backend API

Before running the frontend, you need to start the Yaya API:

```
# Follow Readme file on the YAYA-API repository to clone and run the backend.
# Repo Link: 
https://github.com/tevBoyz/yaya-api
```

Once the API is running on `http://localhost:3000` .... **Go to step 5**


### 5. Start the Frontend Application

In a new terminal window, navigate back to the frontend directory:

```bash
cd yaya-frontend
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Dashboard Preview

Here's a preview of the dashboard that interacts with this API:


https://github.com/user-attachments/assets/66cfcea3-c8bc-4dc8-99fc-0a43a5a0d695



## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx   # Main dashboard component
│   ├── TransactionTable.jsx    # Desktop transaction table
│   ├── TransactionCards.jsx    # Mobile transaction cards
│   ├── TransactionPagination.jsx # Pagination controls
│   ├── SearchBar.jsx   # Search functionality
│   └── ThemeToggle.jsx # Dark/light mode toggle
│   └── ui/ # All UI files imported from Shadcn
        ├──button.tsx
        ├──card.tsx
        ├──input.tsx
        ├──pagination.tsx
        └──table.tsx
├── store/               # Redux state management
│   ├── store.js         # Redux store configuration
│   ├── slices/          # Redux slices
│   └── thunks/          # Async action creators
├── services/            # API services
│   └── api.js           # Axios configuration and API calls
└── contexts/            # React contexts
    └── ThemeContext.jsx # Theme management context

```

## API Integration

### Required Endpoints

The frontend expects the following API endpoints:

1. **GET** `/time` - Returns server time
2. **GET** `/transactions/find-by-user?p=:page` - Paginated transactions (each page has max of 15 transactions)
3. **POST** `/transactions/search` - Search transactions (Search by name, id, cause)

### Response Format

The API should return transactions in this format:

```json
{
  "data": [
    {
      "id": "transaction-id",
      "sender": {
        "name": "Sender Name",
        "account": "sender-account"
      },
      "receiver": {
        "name": "Receiver Name",
        "account": "receiver-account"
      },
      "amount": 100,
      "amount_with_currency": "100.00 ETB",
      "currency": "ETB",
      "cause": "Transaction reason",
      "fee": 1.15,
      "created_at_time": 1756033429,
      "is_topup": false,
      "is_outgoing_transfer": false
    }
  ],
  "lastPage": 5,
  "total": 50,
  "perPage": 10,
  "incomingSum": 2500,
  "outgoingSum": 1500
}
```

## Theming

The application supports both light and dark modes:

- Toggle using the theme button in the top-right corner
- Preferences are saved to localStorage

## Responsive Design

- **Desktop**: Full table view with all transaction details
- **Tablet**: Adapted table layout
- **Mobile**: Card-based layout for better readability on small screens

## Customization

### Adding New Environment Variables

1. Add the variable to `.env.example`
2. Add the variable to your `.env` file
3. Access it in code using `import.meta.env.VITE_VARIABLE_NAME`

### Modifying API Configuration

Edit `src/services/api.js` to change:
- Base URL
- Timeout settings
- Default headers
- Request/response interceptors

### Styling Changes

The application uses TailwindCSS. Modify styles in:
- Individual component files
- `src/index.css` for global styles
- `tailwind.config.js` for theme extensions

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.


## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure the backend API is running
   - Check the `VITE_API_BASE_URL` in your `.env` file
   - Verify CORS settings on the API server

2. **Build Failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version: `node --version`

3. **Style Issues**
   - Ensure TailwindCSS is properly configured
   - Check that all required dependencies are installed

This will provide additional console logging for API calls and state changes.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request



**Note**: This application is designed to work with the Yaya API. Ensure the API server is running and properly configured before using the frontend application.
