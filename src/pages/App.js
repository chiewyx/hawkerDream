import SignupCard from "./signup";
import LoginCard from "./login";
import Dashboard from "./dashboard";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./landing";
import UserProfileEdit from "./update";
import SplitWithImage from "./features";
import SplitWithImag from "./featuresupplier";
import Invoice from "./invoice";
import Order from "./order";
import Marketplace from "./marketplace";
import UpdateInvoice from "./newInvoice";

export default function App() {
  return (
    <div className="App">
      {/* Add routes here👇 */}
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/signup" exact element={<SignupCard />} />
        <Route path="/login" exact element={<LoginCard />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/dashboard/update" exact element={<UserProfileEdit />} />
        <Route path="/hawker" exact element={<SplitWithImage />} />
        <Route path="/supplier" exact element={<SplitWithImag />} />
        <Route path="/invoice" exact element={<Invoice />} />
        <Route path="/invoice/updateinvoice" exact element={<UpdateInvoice />} />
        <Route path="/order" exact element={<Order />} />
        <Route path="/marketplace" exact element={<Marketplace />} />
      </Routes>
    </div>
  );
}
