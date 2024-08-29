
import { BrowserRouter as Router, Route, Routes} from'react-router-dom'
import './App.css';
import UserDashboard
 from './screens/UserDashboard';
import Login from './screens/Login';
import LandingPage from './screens';
import SignUp from './screens/Signup'
import ForgotPassword from './screens/forgotPassword';
import ResetPassword from './screens/resetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/dashboard' element={<UserDashboard/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/resetpassword' element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
