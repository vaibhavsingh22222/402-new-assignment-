import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar";  
import Footer from "./components/Footer"
import Home from "./pages/ Home"
import Items from "./pages/ Items"       
import Item from "./pages/Item"
import ItemAdmin from "./pages/ItemAdmin";
import { Amplify } from "aws-amplify"
import { Authenticator } from "@aws-amplify/ui-react"

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
      <BrowserRouter>

        {/* 🌿 Light green global background */}
        <div className="bg-emerald-50 min-h-screen flex flex-col text-emerald-950">

          {/* 🌿 Navbar */}
          <div className="bg-emerald-100">
            <Navbar/>
          </div>

          {/* 🌿 Main content area */}
          <main className="flex-1 px-6 py-6 bg-emerald-50">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/items" element={<Items/>}/>
              <Route path="/items/:id" element={<Item/>}/>
              <Route path="/admin" element={
                <Authenticator loginMechanisms={['email']} signUpAttributes={['name']}>
                  <ItemAdmin/>
                </Authenticator>
              } />
            </Routes>
          </main>

          {/* 🌿 Footer */}
          <div className="bg-emerald-100">
            <Footer />
          </div>

        </div>

      </BrowserRouter>
    </Authenticator.Provider>
  )
}

export default App