import { FC, ReactNode } from "react";
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

const Button: FC<BaseButtonProps> = (props) => {
  const { disabled, size, btnType, children, href } = props;
  //
  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });
  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled}>
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
