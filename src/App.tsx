import React, { useState } from "react";
import Button from "./components/button/button";
import Alert from "./components/alert/alert";
import Menu from "./components/menu/menu";
import MenuItem from "./components/menu/menuItem";
import SubMenu from "./components/menu/subMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/icon/icon";
import Transition from "./components/transition/transition";
import Input from "./components/input/input";
import AutoCompltet from "./components/autoComplete/autoComplete";
import axios from "axios";
import Upload from "./components/upload/upload";
const App: React.FC = () => {
  function hclick() {
    console.log("click");
  }
  const handleSelect = (index: string | number) => {
    console.log(index);
  };
  let [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files, "files");
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  const handleProgress = (p: any, f: any) => {
    console.log(p, "p", f, "f");
  };
  return (
    <div className="App">
      <form
        method="post"
        action="https://jsonplaceholder.typicode.com/posts"
        encType="multipart/form-data"
      >
        <input type="file" />
        <button type="submit">提交</button>
      </form>
      <br />
      <input type="file" name="myFile" />
      <br />
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        multiple={true}
        onProgress={handleProgress}
        onSuccess={handleProgress}
        onError={handleProgress}
      />
      <br />

      <FontAwesomeIcon icon={faCoffee} size="10x"></FontAwesomeIcon>
      <FontAwesomeIcon icon={faCoffee} spin></FontAwesomeIcon>
      <FontAwesomeIcon icon={faCoffee} pulse></FontAwesomeIcon>
      <Icon icon="coffee" theme="danger" size="10x" />
      <Icon icon="arrow-down" theme="danger" size="10x" />

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
      <Menu defaultIndex="0" onSelect={(index) => handleSelect(index)}>
        <MenuItem> MenuItem1</MenuItem>
        <MenuItem disabled={true}>MenuItem2</MenuItem>
        <MenuItem> MenuItem3</MenuItem>
        <MenuItem> MenuItem4</MenuItem>
        <SubMenu title="down-item">
          <MenuItem> MenuItem5</MenuItem>
          <MenuItem> MenuItem6</MenuItem>
        </SubMenu>
      </Menu>

      <Menu defaultIndex="0" mode="vertical" onSelect={handleSelect}>
        <MenuItem> MenuItem1</MenuItem>
        <MenuItem> MenuItem2</MenuItem>
        <MenuItem> MenuItem3</MenuItem>
        <MenuItem> MenuItem4</MenuItem>
        <SubMenu title="defaultOpend" defaultOpend={true}>
          <MenuItem> MenuItem5</MenuItem>
          <MenuItem> MenuItem6</MenuItem>
          <MenuItem> MenuItem5</MenuItem>
          <MenuItem> MenuItem6</MenuItem>
        </SubMenu>
        <SubMenu title="closed">
          <MenuItem> MenuItem5</MenuItem>
          <MenuItem> MenuItem6</MenuItem>
          <MenuItem> MenuItem5</MenuItem>
          <MenuItem> MenuItem6</MenuItem>
        </SubMenu>
        <MenuItem> MenuItem4</MenuItem>
      </Menu>

      <br />

      <Button btnType="primary" size="large" onClick={() => setShow(!show)}>
        Toggle
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-top" wrapper={true}>
        <Button>button </Button>
      </Transition>

      <br />

      <AutoCompltet
        fetchSuggestions={(value) => {
          const data = [{ value: "aaaa" }, { value: "bbb" }, { value: "cccc" }];
          return data.filter((item) => item.value.includes(value));
        }}
        style={{ width: "400px" }}
      />
      <Input
        append=".com"
        prepend={"www."}
        style={{ width: "400px" }}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <Input icon="search" style={{ width: "400px" }}></Input>
    </div>
  );
};

export default App;
