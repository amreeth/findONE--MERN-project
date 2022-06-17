import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/user/HomeScreen";
import MactherScreen from "./screens/user/MactherScreen";
import LoginScreen from "./screens/user/LoginScreen";
import BeforeVerification from "./screens/user/BeforeVerification";
import Verify from "./screens/user/Verify";
import ProfileScreen from "./screens/user/ProfileScreen";
import Log from "./screens/user/Log";
import AllRequestScreen from "./screens/user/AllRequestScreen";
import ForgotPassword from "./screens/user/ForgotPassword";
import ResetPassword from "./screens/user/ResetPassword";
import MessangerScreen from "./screens/user/MessangerScreen";
import GetPremiumScreen from "./screens/user/GetPremiumScreen";
import PaymentSuccessScreen from "./screens/user/PaymentSuccessScreen";
import FriendsScreen from "./screens/user/FriendsScreen";
import AfterRegScreen from "./screens/user/AfterRegScreen";

// import RegisterScreen from "./screens/user/RegisterScreen";

import AdminLogin from "./screens/admin/AdminLoginScreen";
import AdminHomeScreen from "./screens/admin/AdminHomeScreen";
import UserManagement from "./screens/admin/UserManagement";
import AddQuestionScreen from "./screens/admin/AddQuestionScreen";
import AllQuestionsScreen from "./screens/admin/AllQuestionsScreen";
import PremiumDetailsScreen from "./screens/admin/PremiumDetailsScreen";
import AddPremiumScreen from "./screens/admin/AddPremiumScreen";
import AllPremiumUsersScreen from "./screens/admin/AllPremiumUsersScreen";

import "./App.css";

function App() {
  return (
    <div className="main" style={{minHeight:"100vh"}}>
      <Router>
        <Routes>
          {/* user */}

          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<Log />} />
          <Route path="/before" element={<BeforeVerification />} />
          <Route path="/verify/:id/:token" element={<Verify />} />
          <Route path="/match/:id" element={<MactherScreen />} />
          <Route path="/allrequests" element={<AllRequestScreen />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/messanger" element={<MessangerScreen/>}></Route>
          <Route path='/getpremium' element={<GetPremiumScreen/>}/>
          <Route path='/paymentsccess' element={<PaymentSuccessScreen/>}/>
          <Route path='/friends' element={<FriendsScreen/>}/>
          <Route path='/after' element={<AfterRegScreen/>}/>



          {/* admin */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/" element={<AdminHomeScreen />} />
          <Route path="/admin/usermanagement" element={<UserManagement />} />
          <Route path="/admin/addquestion" element={<AddQuestionScreen />} />
          <Route path="/admin/allquestions" element={<AllQuestionsScreen />} />
          <Route path="/admin/allpremiumlist" element={<PremiumDetailsScreen />}/>
          <Route path='/admin/addpremium' element={<AddPremiumScreen/>}/>
          <Route path='/admin/allpremiumusers' element={<AllPremiumUsersScreen/>}/>

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
