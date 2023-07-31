import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

export interface CodeboxProps {
  example: JSX.Element;
}

const Codebox: React.FC<PropsWithChildren<CodeboxProps>> = (props) => {
  const { children, example } = props;

  return (
    <div className={classNames(styles['codebox'])}>
      <div className={classNames(styles['codebox-example'])}>{example}</div>
      <div className={classNames(styles['codebox-code'])}>{children}</div>
    </div>
  );
};

export default Codebox;
