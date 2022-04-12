import React, { useState } from "react";
import Button from "./components/button/button";
import Alert from "./components/alert/alert";
import Menu from "./components/menu/menu";
import MenuItem from "./components/menu/menuItem";
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
        alert
      </Alert>
      <Button onClick={() => setVisible(!visible)}>show alert</Button>

      <br />
      <Menu defaultIndex={0}>
        <MenuItem index={0}> MenuItem1</MenuItem>
        <MenuItem index={1} disabled={true}>
          MenuItem2
        </MenuItem>
        <MenuItem index={2}> MenuItem3</MenuItem>
        <MenuItem index={3}> MenuItem4</MenuItem>
      </Menu>

      <Menu defaultIndex={0} mode="vertical">
        <MenuItem> MenuItem1</MenuItem>
        <MenuItem>MenuItem2</MenuItem>
        <MenuItem> MenuItem3</MenuItem>
        <MenuItem> MenuItem4</MenuItem>
      </Menu>
    </div>
  );
};

export default App;
