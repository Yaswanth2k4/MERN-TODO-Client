import React from "react";
import Todo from "./Todo";
import Login from "./Login";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App()
{
  return <div>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<PrivateRoute />} >
            <Route path="/todo" element={<Todo/> } />
        </Route>
      </Routes>
    </BrowserRouter>
   </div>
}

export default App;