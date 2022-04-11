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
  showClocseIcon?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { visible, children, className, type, title, onCancel, showClocseIcon } = props;
  console.log(onCancel);

  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div className="alert-mask"></div>
      <div className={classes}>
        <div className="alert-header">
          <span>{title}</span>
          {showClocseIcon && (
            <span className="icon-x" onClick={onCancel}>
              x
            </span>
          )}
        </div>
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
  showClocseIcon: true,
};
export default Alert;
