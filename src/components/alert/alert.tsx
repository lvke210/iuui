import React from "react";
import classNames from "classnames";

export enum AlertType {
  success = "warning",
  default = "default",
  danger = "danger",
  warning = "warning",
}
export interface AlertProps {
  visible: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: AlertType;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { visible, children, className, type } = props;
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  return (
    <div style={{ display: visible ? "block" : "none" }} className={classes}>
      {children}
    </div>
  );
};
Alert.defaultProps = {
  type: AlertType.default,
  children: "this is an alert",
};
export default Alert;
