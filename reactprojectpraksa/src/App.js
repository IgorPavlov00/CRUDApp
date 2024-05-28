import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import {Main} from "./main/Main";
import Navbar from "./header/Header";
import DeviceTable from "./devicetable/DeviceTable";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
function App() {

   return <div>
      <ToastContainer theme="colored"
      />
      <Navbar navbar="true"/>

   </div>;
}

export default App;
