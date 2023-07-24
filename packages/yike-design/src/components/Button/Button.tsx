import React from 'react';
import classNames from 'classnames';

import './Button.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  status?: 'normal' | 'success' | 'warning' | 'danger';
  size?: 's' | 'm' | 'l';
  shape?: 'square' | 'rounded' | 'circle';
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;

  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const {
    children,

    // component props
    type, // = 'primary'
    size, // = 'm'
    shape, // = 'square'
    status, // = 'normal'
    disabled = false,
    loading = false,
    block = false,

    // ninja for HTML native button type
    htmlType = 'button',

    ...restProps
  } = props;

  return (
    <button
      ref={ref}
      className={classNames('yk-btn', {
        'yk-btn--loading': loading,
        'yk-btn--block': block,
        [`yk-btn--size-${size}`]: size,
        [`yk-btn--status-${status}`]: status,
        [`yk-btn--${type}`]: type && type !== 'primary',
        [`yk-btn--shape-${shape}`]: shape && shape !== 'square',
      })}
      type={htmlType}
      disabled={disabled || loading}
      {...restProps}
    >
      {children}
    </button>
  );
};

const ForwardRefButton = React.forwardRef(Button);

const ButtonComponent = ForwardRefButton as typeof ForwardRefButton & {
  Group: typeof Button;
};

ButtonComponent.Group = Button;

export default ForwardRefButton;
