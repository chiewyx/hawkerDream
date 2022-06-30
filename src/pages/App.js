import SignupCard from "./signup";
import LoginCard from "./login";
import Dashboard from "./dashboard";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../components/privateRoute";
import LandingPage from "./landing";
import UserProfileEdit from "./update";
import SplitWithImage from "./features";
import SplitWithImag from "./featuresupplier";

import Order from "./order";
import UpdateOrder from "./newOrder";
import AddOrder from "./addOrder";

import Invoice from "./invoice";
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
import UpdateInvoice from "./newInvoice";
import DisplayMonth from "./month";

import Marketplace from "./marketplace";

export default function App() {
  return (
    <div className="App">
      {/* Add routes here👇 */}
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
        <Route path="/marketplace" exact element={<Marketplace />} />
      </Routes>
    </div>
  );
}
