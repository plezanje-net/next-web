# Coding Conventions for plezanjenet/next-web

## Component Structure

### Props Type Definition
- All components have a type that defines their input props
- Naming pattern: For a component named `SomeComponent`, the props type is `TSomeComponentProps`
- Props must be defined as a **type**, not an interface
- Props type is defined immediately before the component function

### Component Export
- Components are functions
- Components are exported as default at the end of the file

### Example
```tsx
type TMyComponentProps = {
  title: string;
  count: number;
};

function MyComponent(props: TMyComponentProps) {
  const { title, count } = props;
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
    </div>
  );
}

export default MyComponent;
```
