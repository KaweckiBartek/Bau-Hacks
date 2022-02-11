import { useState } from "react";
import "./App.css";
import SplitCodeToParts from "./utils/splitCodeToParts";

function App() {
  const [code, setCode] = useState("");

  const split = new SplitCodeToParts();

  return <div className="App"></div>;
}

export default App;
