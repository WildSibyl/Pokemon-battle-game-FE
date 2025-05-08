import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router";
import { useState } from "react";

// This is a Layout component, using React's composable nature
const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query in the state
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      <Navbar onSearch={handleSearch} />
      <div className="flex-grow">
        {/* The Outlet component is a placeholder for children components under this route */}
        <Outlet context={{}} />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
