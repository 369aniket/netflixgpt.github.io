import { useState } from "react";
import Login from "./components/Login";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={appStore}>
         <Body />
      </Provider>
    </>
  );
}

export default App;
