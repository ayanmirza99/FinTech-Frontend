import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./Routes/AuthRoutes";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./redux/features/auth/actions";
import HomeRouter from "./Routes/HomeRoutes";
import CustomSpinner from "./components/CustomSpinner";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth.status.user);
  const { user, token } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    dispatch(getLoggedInUser());
    // eslint-disable-next-line
  }, [token]);
  return (
    <BrowserRouter>
      {loading ? (
        <div className="w-full h-screen">
          <CustomSpinner />
        </div>
      ) : user?.email ? (
        <HomeRouter />
      ) : (
        <AuthRouter />
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
