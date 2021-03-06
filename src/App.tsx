import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";

import { Home } from "./components/Home/Home";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { Login } from "./components/auth/Login";
import { ProtectedRoute } from "./components/auth/PrivateRoutes";
import { Projects } from "./components/Projects/Projects";
import { OneProject } from "./components/Projects/OneProject";

function App() {
  const query = useAuthUser("user", auth);
  // console.log("user present query   ====  ", query.data);
  const user = query.data;
  if (query.isFetching) {
    return <div className="w-full h-full flex-center ">Loading ....</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-between overflow-x-hidden">
      <BrowserRouter>
        <div className="fixed top-[0px] right-1 w-full z-30">
          <Toolbar user={user} />
        </div>

        <div className="w-full   mt-16 flex-center ">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home user={user}/>
                </ProtectedRoute>
              }
            />
          <Route
              path="/oneproject"
              element={
                <ProtectedRoute user={user}>
                  <OneProject user={user}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects"
              element={
                <ProtectedRoute user={user}>
                  <Projects user={user}/>
                </ProtectedRoute>
              }
            />
            {/* @ts-ignore */}
            <Route path="/login" element={<Login user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
