import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import AdminPage from "./pages/AdminPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import NotFound from "./components/common/NotFound";
import "./App.css"; // Global styles for the application

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            {/* Default redirect to student page */}
            <Route path="/" element={<Navigate to="/student" replace />} />

            {/* Student Application Routes */}
            <Route
              path="/student"
              element={
                <ErrorBoundary>
                  <StudentPage />
                </ErrorBoundary>
              }
            />

            {/* Admin Dashboard Routes */}
            <Route
              path="/admin/*"
              element={
                <ErrorBoundary>
                  <AdminPage />
                </ErrorBoundary>
              }
            />

            {/* 404 Not Found page */}
            <Route path="/404" element={<NotFound />} />

            {/* Fallback route - redirect unknown routes to 404 or student page */}
            <Route path="*" element={<Navigate to="/404" replace />} />
            {/* Alternative: <Route path="*" element={<Navigate to="/student" replace />} /> */}
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;


//ggv.admission2026@gmail.com