import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
