import SignupCard from "./signup";
import LoginCard from "./login";
import Dashboard from "./dashboard";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./landing";

export default function App() {
  return (
    <div className="App">
      
      {/* Add routes here👇 */}
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/signup" exact element={<SignupCard />} />
          <Route path="/login" exact element={<LoginCard />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
    </div>
  );
}
