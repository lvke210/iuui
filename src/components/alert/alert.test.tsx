import { render, fireEvent } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

const defaultProps: AlertProps = {
  visible: false,
  onCancel: jest.fn(),
};
describe("test alert componnet", () => {
  it("should render the correct default element", () => {
    const wrapper = render(<Alert {...defaultProps}>alert</Alert>);
    const element = wrapper.getByText("alert") as HTMLButtonElement;
  });
});
