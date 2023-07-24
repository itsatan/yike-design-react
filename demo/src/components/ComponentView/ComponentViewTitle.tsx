import c from './ComponentView.module.scss';

export interface ComponentViewTitleProps {
  title: string;
  desc: string;
}

const ComponentViewTitle: React.FC<React.PropsWithChildren<ComponentViewTitleProps>> = (props) => {
  const { children, title, desc } = props;

  const _desc = desc || children;

  return (
    <div className={c['component-view-title-wrapper']}>
      <h1>{title}</h1>
      {_desc && <p className="desc">{_desc}</p>}
    </div>
  );
};

export default ComponentViewTitle;
