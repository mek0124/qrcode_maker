import { Routes, Route, NavLink } from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import History from "./pages/history";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex flex-1 w-full">
        {/* Side navigation - 15% width */}
        <nav className="w-[10%] bg-surface_glass text-text_primary p-4 flex flex-col gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors tracking-wider ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-surface_glass_hover"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors tracking-wider ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-surface_glass_hover"
              }`
            }
          >
            History
          </NavLink>
        </nav>
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}