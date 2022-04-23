
import './App.css';
import Login from './Component/Login/Login';
import Sign from './Component/Sign-up/Sign';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Component/Home/Home';
import AdminLogin from './Component/AdminLogin/AdminLogin';
import AdminSign from './Component/AdminSign/AdminSign';
import Firstpage from './Component/Firstpage/Firstpage';
import Adminhome from './Component/Adminhome/Adminhome';
import Cart from './Component/Cart/Cart';
import File from './Component/File/File';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-sign" element={<AdminSign />} />
          <Route path="/product" element={<Firstpage />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/cart/:postid" element={<Cart/>} />
          <Route path="/file" element={<File/>} />
  
    </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
