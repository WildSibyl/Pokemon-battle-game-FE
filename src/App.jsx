import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Roster from "./pages/Roster.jsx";
import Battle from "./pages/Battle.jsx";
import { RosterProvider } from "./context/RosterContext.jsx";

const App = () => {
  return (
    <RosterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/pokemon-details/:pokeId" element={<Details />} />
            <Route path="/pokemon-roster" element={<Roster />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RosterProvider>
  );
};

export default App;
