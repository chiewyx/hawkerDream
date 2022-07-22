import SignupCard from "./landingPages/signup";
import LoginCard from "./landingPages/login";
import Dashboard from "./usersPages/dashboard";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../components/privateRoute";
import LandingPage from "./landingPages/landing";
import UserProfileEdit from "./usersPages/update";
import SplitWithImage from "./features";
import SplitWithImag from "./featuresupplier";

import Order from "./orderSystem/order";
import UpdateOrder from "./orderSystem/newOrder";
import AddOrder from "./orderSystem/addOrder"; 
import CompletedOrder from "./orderSystem/completedOrder";

import JanInvoice from "./months/january";
import FebInvoice from "./months/february";
import MarInvoice from "./months/march";
import AprInvoice from "./months/april";
import MayInvoice from "./months/may";
import JunInvoice from "./months/june";
import JulInvoice from "./months/july";
import AugInvoice from "./months/august";
import SeptInvoice from "./months/september";
import NovInvoice from "./months/november";
import OctInvoice from "./months/october";
import DecInvoice from "./months/december";
import UpdateInvoice from "./invoiceSystem/newInvoice";
import DisplayMonth from "./invoiceSystem/month";
import DisplayYear from "./invoiceSystem/year";

import Marketplace from "./marketplace";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/signup" exact element={<SignupCard />} />
        <Route path="/login" exact element={<LoginCard />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              {" "}
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/dashboard/update" exact element={<UserProfileEdit />} />
        <Route path="/hawker" exact element={<SplitWithImage />} />
        <Route path="/supplier" exact element={<SplitWithImag />} />
        <Route path="/invoice/year" exact element={<DisplayYear />} />
        <Route path="/invoice" exact element={<DisplayMonth />} />

        <Route path="/invoice/January" exact element={<JanInvoice />} />
        <Route path="/invoice/February" exact element={<FebInvoice />} />
        <Route path="/invoice/March" exact element={<MarInvoice />} />
        <Route path="/invoice/April" exact element={<AprInvoice />} />
        <Route path="/invoice/May" exact element={<MayInvoice />} />
        <Route path="/invoice/June" exact element={<JunInvoice />} />
        <Route path="/invoice/July" exact element={<JulInvoice />} />
        <Route path="/invoice/August" exact element={<AugInvoice />} />
        <Route path="/invoice/September" exact element={<SeptInvoice />} />
        <Route path="/invoice/October" exact element={<OctInvoice />} />
        <Route path="/invoice/November" exact element={<NovInvoice />} />
        <Route path="/invoice/December" exact element={<DecInvoice />} />
        <Route
          path="/invoice/updateinvoice"
          exact
          element={<UpdateInvoice />}
        />

        <Route path="/order/updateorder" exact element={<UpdateOrder />} />
        <Route path="/order/addorder" exact element={<AddOrder />} />
        <Route path="/order" exact element={<Order />} />
        <Route
          path="/order/completedorders"
          exact
          element={<CompletedOrder />}
        />
        <Route path="/marketplace" exact element={<Marketplace />} />
      </Routes>
    </div>
  );
}
