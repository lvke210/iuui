import React from "react";
import Button from "./components/button/button";
const App: React.FC = () => {
  return (
    <div className="App">
      <Button>default button</Button>
      <Button size="large">large button</Button>
      <Button size="small">small button</Button>
      <Button disabled={true}>disabled button</Button>
      <Button btnType="primary">primary button</Button>
      <Button btnType="danger">danger button</Button>
      <Button btnType="link" href="rest">
        link link
      </Button>
    </div>
  );
};

export default App;
