import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Kontakt from './components/footer/Kontakt';
import Login from './routes/login-register/Login';
import Register from './routes/login-register/Register';
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Dashboard from './routes/dashboard/dashboard';
import { CarouselData } from './components/home/CarouselData';
import Allcategories from './routes/categories/Allcategories';
import Tjänster from './routes/tjänster/Tjänster';


function App() {

const token = localStorage.getItem('accessToken')

const [useToken, setuseToken] = useState(token)

  return (
    <div className="App">
      <Router>
        <Header />
        <Link to="/login" />
          <div>
           
            <Routes >
              <Route path="/" element={<Home slides={CarouselData} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/kontakt" element={<Kontakt />} />
              

              {!useToken && (
                <Route path="/login" element={<Login auth={() => setuseToken(true)}/>} /> 
              )}

              {useToken && (
                <Route path="/dashboard" element={<Dashboard logout={() => setuseToken(false)}/>} /> 
              )}

              <Route path="/dashboard" element={<Navigate to={token ? "/dashboard" : "/login"}/>} />

              <Route path="*" element={<Navigate to={"/"} />} />

              <Route path="/allcategories" element={<Allcategories />} />

              <Route path="/services" element={<Tjänster />} />
            </Routes>
          </div>
      </Router>
    <Footer />
    </div>
  );
}

export default App;
