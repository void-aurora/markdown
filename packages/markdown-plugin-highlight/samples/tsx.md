# TSX

TSX Samples for testing default `normalizeLang`

```tsx
interface PropsType {
  children: JSX.Element;
  name: string;
}

class Component extends React.Component<PropsType, {}> {
  render() {
    return <h2>{this.props.children}</h2>;
  }
}
```
