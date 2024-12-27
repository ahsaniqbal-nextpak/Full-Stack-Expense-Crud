import { useEffect, useState } from "react";
import "./App.css";
import ExpenseTracker from "./view/ExpenseTracker";
import { getExpenses } from "./controllers";

function App() {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    getExpenses((data) => setData(data));
  }, []);
  return <ExpenseTracker data={data} setData={setData} />;
}

export default App;
