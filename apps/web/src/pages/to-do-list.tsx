import Container from "@/components/Layout/Container";
import { withDefaultLayout } from "@/components/Layout/DefaultLayout";
import ToDoList from "@/components/ToDoList/ToDoList";
import { IToDo } from "@repo/types/ToDo.type";

interface ToDoListPageProps {
  toDoList: IToDo[];
}

function ToDoListPage({ toDoList }: ToDoListPageProps) {
  return (
    <Container>
      <ToDoList initialValue={toDoList} />
    </Container>
  );
}

export default withDefaultLayout(ToDoListPage);

export async function getStaticProps() {
  //Mimic an event that fetches from an API.
  const toDoList = [
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ];
  return { props: { toDoList } };
}
