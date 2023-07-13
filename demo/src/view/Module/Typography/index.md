<ComponentViewTitle title="Typography 排版" desc="用于展示标题、段落、文本内容。" />

```tsx [define]
const { Typography } = Yk;
const { Title, Text, Paragraph } = Typography;

const TextMap = (props: { children: React.ReactNode }) => {
  return React.Children.map(props.children, (child) => {
    return <div style={{ marginBottom: 10 }}>{child}</div>;
  });
};
```

<ComponentViewCard
  title="Aha"
  desc="ssc">
```tsx [demo]
<div>
  Demo
</div>
```
</ComponentViewCard>

<ComponentViewCard
  title="Wooot"
  desc="XXXXXXXX"
>

```tsx [demo][comp=Demo]
const Demo = () => {
  return (
    <Yk.Typography>
      <Yk.Typography.Title level={1}>Heading 1</Yk.Typography.Title>
      <Yk.Typography.Title level={2}>Heading 2</Yk.Typography.Title>
    </Yk.Typography>
  );
};
```

</ComponentViewCard>
