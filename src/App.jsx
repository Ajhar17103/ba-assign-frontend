import React, { lazy, Suspense} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Loader from "./Shade/Loaders/Loaders";
import Login from "./Component/Auth/Login/Login";
import Signup from "./Component/Auth/Register/Signup";

// Lazy loading components
const AuthLayout = lazy(() => import('./Component/Auth/Layout/AuthLayout'));
const Home = lazy(() => import('./Component/Home/Home'));
const HotelListShowcase = lazy(() => import('./Component/Hotels/HotelListShowcase'));
const ProductDetails = lazy(() => import('./Component/HotelDetails/HotelDetails'));
const ErrorPage = lazy(() => import('./Shade/ErrorPage/ErrorPage'));

function App() {
 let authTokens = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
    
     {authTokens?    
          <Routes>
          <Route path="/" element={<Home  />}>
            <Route index element={<HotelListShowcase  />} />
            <Route path="/product-details/:id" element={<ProductDetails  />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes> 
      :
      <Routes>
      <Route path="/" element={<AuthLayout  />}>
        <Route index element={<Login  />} />
        <Route path="/sign-up" element={<Signup  />} />
      </Route> 
     
       <Route path="*" element={<ErrorPage />} />
      </Routes>  
      }
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
