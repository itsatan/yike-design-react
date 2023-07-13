import * as React from 'react';
import { TypographyProps } from './interface';
import classNames from 'classnames';

const Typography: React.FC<TypographyProps> = (props) => {
  const { children, className, ...rest } = props;

  const classes = classNames('yike-typography', className);

  return (
    <article
      className={classes}
      {...rest}
    >
      {children}
    </article>
  );
};

export default Typography;
