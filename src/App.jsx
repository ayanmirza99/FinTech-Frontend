import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./Routes/AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter>
  );
}

export default App;
