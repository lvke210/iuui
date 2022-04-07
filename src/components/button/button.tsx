import React, { FC, ReactNode } from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "large",
  Small = "small",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

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
    disabled: btnType === ButtonType.Link && disabled,
  });
  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
};
export default Button;
