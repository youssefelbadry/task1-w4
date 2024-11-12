import App from './App.jsx'
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);