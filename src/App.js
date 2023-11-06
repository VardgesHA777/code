import { Route, Routes, Navigate } from "react-router-dom";
import ROUTES from "constants/routes";
import Users from "pages/Users/Users";
import Posts from "pages/Posts/Posts";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path='/'
          element={
              <Users/>
          }
        />

        <Route path="*" element={<Navigate to={ROUTES.SIGNIN} />} />
      </Routes>
    </div>
  );
};

export default App;
