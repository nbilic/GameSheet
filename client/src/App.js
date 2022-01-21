import {
  Navbar,
  Search,
  Pending,
  Approved,
  Played,
  IndividualGame,
  Test,
  Statistics,
} from "./components/index";
import "./app.css";
import { Route, Routes, Navigate } from "react-router-dom";
import useStyles from "./AppStyles";
import { useState } from "react";
import { UserContext } from "./components/userContext";
import { ifUserIsRequired } from "./components/allowedIDs";
const App = () => {
  const classes = useStyles({});
  const [user, setUser] = useState(null);

  return (
    <div className={classes.main}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className={classes.navbar}>
          <Navbar />
        </div>

        <Routes>
          <Route exact path="/" element={<Navigate to="/approved" />}></Route>

          <Route
            path="/add"
            element={
              ifUserIsRequired(user, true) ? (
                <Search />
              ) : (
                <Navigate to="/approved" />
              )
            }
          />
          <Route path="/pending" element={<Pending />} />
          <Route path="/played" element={<Played />} />
          <Route path="/approved" element={<Approved />} />
          <Route path="/game/:gameId" element={<IndividualGame />} />
          <Route path="/test" element={<Test />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
