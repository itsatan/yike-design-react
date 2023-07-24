import React from 'react';
import c from './ComponentView.module.scss';

interface ComponentViewCardProps {
  title: string;
  desc: string;
  children?: React.ReactNode;
}

const ComponentViewCard: React.FC<ComponentViewCardProps> = (props: ComponentViewCardProps) => {
  const { title, desc, children } = props;
  return (
    <div className={c['component-view-card-wrapper']}>
      <h2>{title}</h2>
      {desc && <p className="desc">{desc}</p>}
      <div className={c['component-view-card-content']}>{children}</div>
    </div>
  );
};

export default ComponentViewCard;
