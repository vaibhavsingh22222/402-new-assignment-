import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AsymmetricHero } from "./components/AsymetricHero";
import { Button } from "./components/Button1";
import Home from "./pages/ Home"
import Items from "./pages/ Items";
import Item from "./pages/Item";
import { Card } from "./components/Card";
import { CenteredHero } from "./components/CenteredHero";
import ItemsAdmin from "./pages/

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      <main className="p-6 space-y-6">
        <AsymmetricHero />
        <Button children={undefined}/>
        <div className="flex gap-4 flex-wrap">
          
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<Item />} />
          <Route path="/itemsAdmin" element={<ItemsAdmin />} />
        </Routes>
      </main>
      <AsymmetricHero/>
      <Card/> 
      <CenteredHero/>

      <Footer />
    </BrowserRouter>
  );
}

export default App;