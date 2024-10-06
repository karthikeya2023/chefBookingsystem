import Header from "../components/Header";
import ChefDashboard from "../components/ChefDashboard";
import Footer from "../components/Footer";
import ChefTable from "../components/ChefTable";
import AddRecipe from "../components/AddRecipe";
import WhatsAppIcon from "../components/WhatsAppIcon";

function CChefDashboardPage() {
  return (
    <>
      <Header />
      <ChefDashboard />
      <AddRecipe />
      <ChefTable />
      <WhatsAppIcon/>
      <Footer />
    </>
  );
}

export default CChefDashboardPage;
