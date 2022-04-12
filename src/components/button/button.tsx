import React, { FC, ReactNode } from "react";
import classNames from "classnames";

export type ButtonSize = "large" | "small";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: string;
  btnType?: string;
  children?: ReactNode;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
//Partial 把属性变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps & BaseButtonProps>;

const Button: FC<ButtonProps> = (props) => {
  const { disabled, size, btnType, children, href, className, ...restProps } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: "default",
};
export default Button;
