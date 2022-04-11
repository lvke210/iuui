import React, { useState } from "react";
import Button from "./components/button/button";
import Alert from "./components/alert/alert";
const App: React.FC = () => {
  function hclick() {
    console.log("click");
  }
  let [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <Button onClick={hclick}>default button</Button>
      <Button size="large" autoFocus>
        large button
      </Button>
      <Button size="small">small button</Button>
      <Button disabled={true}>disabled button</Button>
      <Button btnType="primary">primary button</Button>
      <Button btnType="danger">danger button</Button>
      <Button btnType="link" href="#">
        link link
      </Button>

      <br />

      <Alert visible={visible} title="test" onCancel={() => setVisible(!visible)}>
        hello alert
      </Alert>
      <Button onClick={() => setVisible(!visible)}>show alert</Button>

      <br />
    </div>
  );
};

export default App;
