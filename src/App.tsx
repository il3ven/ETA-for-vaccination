import { Row } from "./interfaces/Row";
import Table from "./components/Table/Table";

const rows: Row[] = [
  ["State", "Percent"],
  ["Delhi", "50%"],
];

function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <Table rows={rows} />
    </div>
  );
}

export default App;
