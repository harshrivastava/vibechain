import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import VendorDashboard from "./pages/VendorDashboard";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Show navbar on all pages
  const showNavbar = true;

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </>
  );
}

export default App;
