import logo from "./logo.svg";
import "./App.css";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";

function App() {
  return (
   <BrowserRouter>
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <TopBar />
          <div class="container-fluid">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/users" element={<UserList />}/>
              <Route path="/create-user" element={<CreateUser />}/>
              <Route path="/view-user/:id" element={<ViewUser />}/>
              <Route path="/edit-user/:id" element={<EditUser />}/>
              <Route path="/products" element={<Products />}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
