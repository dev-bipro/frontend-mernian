import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/auth/registration/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/login/Login";
import AccountVerify from "./pages/auth/verify/AccountVerify";
import Home from "./pages/home/Home";
import RootLayout from "./components/RootLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/verify/:email" element={<AccountVerify />}></Route>
        <Route element={<RootLayout />}>
          <Route path="/newsfeed" element={<Home />}></Route>
          {/* <Route path="/home" element={<Home/>} />
                <Route path="/message" element={<Message />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
