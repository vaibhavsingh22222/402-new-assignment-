import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from"./components/Navbar";  
import Footer from "./components/Footer"
import Home from "./pages/ Home"
import Items from "./pages/ Items"
import Item from "./pages/Item"
import ItemAdmin from "./pages/ItemAdmin";
//import Review from "./pages/Review";
// import '@aws-amplify/ui-react/styles.css';
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
        <div className="bg-[#EAE4D6] min-h-screen">
          <Navbar/>
          <main className="p-6">
            <Authenticator loginMechanisms={['email']} signUpAttributes={['name']}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/items" element={<Items/>}/>
                <Route path="/items/id" element={<Item/>}/>
                <Route path="/admin" element={<ItemAdmin/>} />
              </Routes>
            </Authenticator>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Authenticator.Provider>
  )
}

export default App