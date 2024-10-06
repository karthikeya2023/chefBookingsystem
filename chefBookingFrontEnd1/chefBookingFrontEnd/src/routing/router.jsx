import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../pages/Home";
import ReceipeView from "../pages/ReceipeView";
import ChefRegisteration from "../pages/ChefRegisteration";
import ReceipeAddPage from "../pages/ReceipeAddPage";
import ChefBooking from "../pages/ChefBooking";
import AdminPage from "../pages/AdminPage";
import ChefViewPage from "../pages/ChefViewPage";
import CChefDashboardPage from "../pages/CChefDashboardPage";
import RecipeListPage from "../pages/RecipeListPage";
import EditRecipe from "../components/EditRecipe";
import BookingViewPage from "../pages/BookingViewPage";
import UserBookingsPage from "../pages/UserBookingsPage";
import ChefsListPage from "../pages/ChefsListPage";
import ProfilePage from "../pages/ProfilePage";
import AboutUsPage from "../pages/AboutUsPage";
import Healthcarework from "../pages/Healthcarework";


function Routing() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUsPage />} />

        <Route path="/chef/register" element={<ChefRegisteration />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/chefs" element={<ChefsListPage />} />
        <Route path="/view/recipe/:recipeId" element={<ReceipeView />} />
        <Route path="Healthcarework" element={<Healthcarework />} />

        {/* Admin Routes */}
        {role === "admin" && <Route path="/admin" element={<AdminPage />} />}

        {/* Common Routes for all roles */}
        {role === "chef" || role === "admin" || role === "user" ? (
          <>
            <Route path="/view/chef/:id" element={<ChefViewPage />} />
            <Route path="/view/booking/:id" element={<BookingViewPage />} />
            <Route path="/user/bookings" element={<UserBookingsPage />} />
            <Route path="/book/chef" element={<ChefBooking />} />
            <Route path="/profile/user" element={<ProfilePage />} />

          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {/* Chef Routes */}
        {role === "chef" || role === "admin" ? (
          <>
            <Route path="/add/recipe" element={<ReceipeAddPage />} />
            <Route path="/edit/recipe/:recipeId" element={<EditRecipe />} />
            <Route path="/dashboard/chef" element={<CChefDashboardPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
