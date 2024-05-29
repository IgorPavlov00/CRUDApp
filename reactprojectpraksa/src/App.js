import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import {Main} from "./main/Main";
import Navbar from "./header/Header";
import DeviceTable from "./devicetable/DeviceTable";
import 'react-toastify/dist/ReactToastify.css';
import {
   BrowserRouter as Router,
   Routes,
   Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EmailConfirmation from "./Email/EmailConfirmation";
import LoginRegister from "./Login/LoginPage";
function App() {

   return <div>

         <div>
            <ToastContainer theme="colored"
            />
            {/* Navbar or other layout components can go here */}
            <Routes>
               <Route path="/confirm/:token" element={<EmailConfirmation />} />
               <Route path="/" element={<LoginRegister />} />
               <Route path="/der" element={<DeviceTable />} />
            </Routes>
         </div>




   </div>;
}

export default App;
