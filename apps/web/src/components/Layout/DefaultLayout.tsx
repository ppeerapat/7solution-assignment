import Navbar from "../Navbar/Navbar";
import Container from "./Container";

type DefaultLayoutProps = React.ComponentProps<"div">;

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <div className="max-w-screen flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 py-8">{props.children}</div>
      <footer className="footer py-8">
        <Container>This is a footer</Container>
      </footer>
    </div>
  );
}

export function withDefaultLayout<P>(
  Component: React.ComponentType<P & object>
) {
  function DefaultLayoutHOC(props: P & object) {
    return (
      <DefaultLayout>
        <Component {...props}></Component>
      </DefaultLayout>
    );
  }
  return DefaultLayoutHOC;
}
