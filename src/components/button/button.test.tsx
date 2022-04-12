import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: "primary",
  size: "large",
  className: "testclass",
};
const disabledprops: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nicee</Button>);
    const element = wrapper.getByText("Nicee") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render diffrend button base on differen props", () => {
    const wrapper = render(<Button {...testProps}>Nicee</Button>);
    const element = wrapper.getByText("Nicee");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-large testclass");
  });

  it("should render a link when btnType epuals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="www.baidu.com">
        Nicee
      </Button>
    );
    const element = wrapper.getByText("Nicee") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });

  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledprops}>Nicee</Button>);
    const element = wrapper.getByText("Nicee") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledprops.onClick).not.toHaveBeenCalled();
  });
});
