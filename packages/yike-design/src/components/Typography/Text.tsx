import * as React from 'react';
import { TypographyTextProps } from './interface';
import { useGenChildren } from './hooks';
import classNames from 'classnames';

const Text: React.FC<TypographyTextProps> = (props) => {
  const {
    type = '',
    code = false,
    underline = false,
    delete: del = false,
    strong = false,
    italic = false,
    mark = false,
    disabled = false,
    copyable = false,
    ellipsis = false,
    className,
    ...rest
  } = props;

  const children = useGenChildren({ ...props, underline, delete: del, strong, italic, mark });

  const classes = classNames(
    'yike-typography',
    {
      [`yike-typography-${type}`]: type,
      code,
      disabled,
      copyable,
      ellipsis,
    },
    className
  );

  return (
    <span
      className={classes}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
