import React from "react";
import classNames from "classnames";
import Button from "../button/button";
export type AlertType = "success" | "default" | "danger" | "warning";
type Icancel = () => void;

export interface AlertProps {
  visible: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: AlertType;
  title?: string;
  onCancel?: Icancel;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { visible, children, className, type, title, onCancel } = props;
  console.log(onCancel);

  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div className="alert-mask"></div>
      <div className={classes}>
        <div className="alert-header">{title}</div>
        <div className="alert-body">{children}</div>
        <div className="alert-footer">
          <Button onClick={onCancel}>cancel</Button>
          <Button btnType="primary">ok</Button>
        </div>
      </div>
    </div>
  );
};
Alert.defaultProps = {
  type: "default",
  children: "this is an a",
};
export default Alert;
