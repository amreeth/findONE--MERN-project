
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom' 
import HomeScreen from "./screens/user/HomeScreen";
import MactherScreen from "./screens/user/MactherScreen";
import LoginScreen from "./screens/user/LoginScreen";
// import RegisterScreen from "./screens/user/RegisterScreen";
import AdminLogin from "./screens/admin/AdminLoginScreen";
import AdminHomeScreen from "./screens/admin/AdminHomeScreen";
import UserManagement from "./screens/admin/UserManagement";
import ProfileScreen from './screens/user/ProfileScreen';
import Log from './screens/user/Log';
import AddQuestionScreen from './screens/admin/AddQuestionScreen';
import AllQuestionsScreen from './screens/admin/AllQuestionsScreen';

import './App.css'



function App() {
  return (
    <div className='main'>
    <Router>
      <Routes>

        {/* user */}

      <Route path="/login" element={<LoginScreen/>}/>
      {/* <Route path="/register" element={<RegisterScreen/>}/> */}
      <Route exact path='/' element={<HomeScreen/>} />
      <Route path='/match/:id' element={<MactherScreen/>} />
      <Route path='/profile' element={<ProfileScreen/>}/>
      <Route path='/register' element={<Log/>}/>
      

 

      {/* admin */}

      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/' element={<AdminHomeScreen/>}/>
      <Route path='/admin/usermanagement' element={<UserManagement/>}/>
      <Route path='/admin/addquestion' element={<AddQuestionScreen/>}/>
      <Route path='/admin/allquestions' element={<AllQuestionsScreen/>}/>


      </Routes>
    </Router>
    </div>
  );
}

export default App;
