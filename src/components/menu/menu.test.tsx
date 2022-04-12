import { render, fireEvent, RenderResult, cleanup, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "1",
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: "1",
  mode: "vertical",
};
const generateMenu = (props: JSX.IntrinsicAttributes & MenuProps & { children?: ReactNode }) => {
  return (
    <Menu {...props}>
      <MenuItem> MenuItem1</MenuItem>
      <MenuItem>active</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>MenuItem4</MenuItem>
      <SubMenu title="down sub">
        <MenuItem>MenuItem5</MenuItem>
        <MenuItem>MenuItem6</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .submenu{
      display: none;
    }
    .submenu.menu-opened{
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test menu component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("should render correct Menu and MenuIten based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // expect(menuElement.getElementsByTagName("li").length).toEqual(4);
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("should itemss should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("MenuItem4");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("menu-item is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("3");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("2");
  });

  it("should render vertical mode when is set to vertical ", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const memuElement = wrapper.getByTestId("test-menu");
    expect(memuElement).toHaveClass("menu-vertical");
  });

  it("should show dropdown item when hover on subMenu", async () => {
    expect(wrapper.queryByText("MenuItem5")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("down sub");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("MenuItem5")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("MenuItem5"));
    expect(testProps.onSelect).toHaveBeenCalledWith("4-0");
    fireEvent.mouseLeave(wrapper.getByText("MenuItem5"));
    await waitFor(() => {
      expect(wrapper.queryByText("MenuItem5")).not.toBeVisible();
    });
  });
  it("should show dropdown item whtn click on subMenu", () => {
    expect(wrapper.queryByText("MenuItem5")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("down sub");
    fireEvent.click(dropdownElement);
    expect(wrapper.queryByText("MenuItem5")).toBeVisible();
    fireEvent.click(dropdownElement);
    expect(wrapper.queryByText("MenuItem5")).not.toBeVisible();
  });
});
