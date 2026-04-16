import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar";  
import Footer from "./components/Footer"
import Home from "./pages/ Home"
import Items from "./pages/ Items"       
import Item from "./pages/Item"
import ItemAdmin from "./pages/ItemAdmin";
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"

/* 🌿 IMPORTANT: THIS FIXES YOUR WHITE / TEXT LOGIN ISSUE */
import "@aws-amplify/ui-react/styles.css"

Amplify.configure({
  Auth: {
    Cognito:{
      userPoolId:"us-east-1_SVLxqjGTe",
      userPoolClientId: "2pb3djs0j4cu08p6tiddvllavj",
    }
  }
})

function App() {
  return (
    <Authenticator.Provider>

      {/* 🌿 AUTH WRAPPER */}
      <Authenticator>

        <BrowserRouter>

          <div className="bg-emerald-50 min-h-screen flex flex-col text-emerald-950">

            <div className="bg-emerald-100">
              <Navbar/>
            </div>

            <main className="flex-1 px-6 py-6 bg-emerald-50">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/items" element={<Items/>}/>
                <Route path="/items/:id" element={<Item/>}/>
                <Route path="/admin" element={<ItemAdmin/>} />
              </Routes>
            </main>

            <div className="bg-emerald-100">
              <Footer />
            </div>

          </div>

        </BrowserRouter>

      </Authenticator>

    </Authenticator.Provider>
  )
}

export default App