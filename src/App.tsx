import { Routes, Route, NavLink } from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import History from "./pages/history";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Side navigation - responsive */}
        <nav className="w-full md:w-[15%] bg-surface_glass text-text_primary p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 md:px-4 py-2 rounded-md transition-colors tracking-wider whitespace-nowrap md:whitespace-normal ${
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
              `px-3 md:px-4 py-2 rounded-md transition-colors tracking-wider whitespace-nowrap md:whitespace-normal ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-surface_glass_hover"
              }`
            }
          >
            History
          </NavLink>
        </nav>
        {/* Main content area - responsive */}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}