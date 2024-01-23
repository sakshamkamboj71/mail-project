import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import UpdatePass from "./components/UpdatePass";
import UpdatePhone from "./components/UpdatePhone";
import UpdatePic from "./components/UpdatePic";
import UpdateUser from "./components/UpdateUser";
import Account from "./pages/Account";
import Age from "./pages/Age";
import AllMail from "./pages/AllMail";
import Bin from "./pages/Bin";
import Compose from "./pages/Compose";
import Contact from "./pages/Contact";
import Default from "./pages/Default";
import DraCom from "./pages/DraCom";
import Draft from "./pages/Draft";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Sent from "./pages/Sent";
import Starred from "./pages/Starred";
import Verification from "./pages/Verification";
import ViewMail from "./pages/ViewMail";

function App() {
  const isUserLoggedIn = !!window.localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        {isUserLoggedIn ? <Navbar /> : <></>}
        <Routes>
          {isUserLoggedIn ? (
            <Route path="/" element={<Home />}>
              <Route path="compose" element={<Compose />} />
              <Route path="draft-compose" element={<DraCom />} />
              <Route path="/" element={<AllMail />} />
              <Route path="/all" element={<AllMail />} />
              <Route path="view-mail" element={<ViewMail />} />
              <Route path="starred" element={<Starred />} />
              <Route path="drafts" element={<Draft />} />
              <Route path="sent" element={<Sent />} />
              <Route path="bin" element={<Bin />} />
              {/* <Route path="/account" element={<Account />} /> */}
            </Route>
          ) : (
            <Route path="/" element={<Default />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/update-pass" element={<UpdatePass />} />
          <Route path="/update-phone" element={<UpdatePhone />} />
          <Route path="/update-pic" element={<UpdatePic />} />
          <Route path="/update-age" element={<Age />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/contacts" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
