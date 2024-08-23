
import { BrowserRouter as Router, Route, Routes} from'react-router-dom'
import './App.css';
import './screens/Signup';
import HomeScreen from './screens/Signup';
import UserDashboard
 from './screens/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/dashboard' element={<UserDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
