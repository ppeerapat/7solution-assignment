type ContainerProps = React.ComponentProps<"div">;

export default function Container(props: ContainerProps) {
  return (
    <div className="container mx-auto max-w-screen-lg">{props.children}</div>
  );
}

export function withContainer<P>(Component: React.ComponentType<P & object>) {
  function ContainerHOC(props: P & object) {
    return (
      <Container>
        <Component {...props}></Component>
      </Container>
    );
  }
  return ContainerHOC;
}
