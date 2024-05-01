import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import ListingDashboard from "./pages/ListingDashboard";
import SearchAdmin from "./pages/SearchAdmin";
import Complaint from "./pages/Complaints";
import ComplaintPost from "./pages/ComplaintPost";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        
          <Route path="/admin/search" element={<SearchAdmin />} />
          <Route
            path="/admin/listing/:listingId"
            element={<ListingDashboard />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard/profile" element={<AdminProfile />} />
            <Route path="/admin/dashboard/complaint" element={<Complaint />} />
          </Route>
          <Route path="/complaint" element={<ComplaintPost/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
