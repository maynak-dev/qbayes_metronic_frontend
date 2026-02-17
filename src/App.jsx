import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
// Import other pages when you create them
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;