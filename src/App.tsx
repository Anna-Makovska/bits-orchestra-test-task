
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WishPage from './pages/WishPage';
import { WishesProvider, useWishes } from './context/WishesContext';
import { Snackbar } from './components/Snackbar';
import { Navbar } from './components/Navbar';

function Shell() {
  const { snackbar, clearSnackbar } = useWishes();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wish/:id" element={<WishPage />} />
      </Routes>
      <Snackbar type={snackbar.type} message={snackbar.message} onClose={clearSnackbar} />
    </>
  );
}

export default function App() {
  return (
    <WishesProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </WishesProvider>
  );
}
