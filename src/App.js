import Gist from "./pages/gists";
import ReactNotification from "react-notifications-component";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <>
      <ReactNotification />
      <Gist />
    </>
  );
}

export default App;
