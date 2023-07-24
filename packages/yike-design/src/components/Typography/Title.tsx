import * as React from 'react';
import classNames from 'classnames';
import { TypographyTitleProps } from './interface';
import { useGenChildren } from './hooks';

const Title: React.FC<TypographyTitleProps> = (props) => {
  const {
    type = '',
    level = 1,
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

  const H = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <H
      className={classes}
      {...rest}
    >
      {children}
    </H>
  );
};

export default Title;
