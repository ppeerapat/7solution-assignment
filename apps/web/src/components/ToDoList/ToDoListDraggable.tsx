import {
  ToDoStoreProvider,
  useToDoStore,
} from "@/providers/ToDoListProvider.provider";
import { DraggableButton } from "../DraggableButton/DraggableButton";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BackgroundProgressBar from "../BackgroundProcessBar/BackgroundProcessBar";
import { IToDo } from "@repo/types/ToDo.type";

export const DragItemType = {
  IdleCard: "idle-card",
  ActiveCard: "active-card",
};

function IdleList() {
  const toDoList = useToDoStore((state) => state.toDoList);
  const removeToDo = useToDoStore((state) => state.removeToDo);

  const [, drop] = useDrop(() => ({
    accept: DragItemType.ActiveCard,
    drop: (item: IToDo) => {
      removeToDo(item);
    },
  }));

  return (
    <div
      className="flex max-w-[300px] flex-1 flex-col gap-4"
      ref={(ref) => {
        drop(ref);
      }}
    >
      {toDoList.map((v, i) => (
        <DraggableButton
          className="btn btn-primary"
          itemValue={v}
          key={`${v.type}_${v.name}_${i}`}
          dragType={DragItemType.IdleCard}
        >
          {v.name}
        </DraggableButton>
      ))}
    </div>
  );
}

interface TypeListProps {
  type: string;
  toDos: IToDo[];
}
function TypeList({ type, toDos }: TypeListProps) {
  const addToDo = useToDoStore((state) => state.addToDo);

  const [, drop] = useDrop(
    () => ({
      accept: DragItemType.IdleCard,
      drop: (item: IToDo) => {
        if (item.type !== type) {
          alert(`${item.name} is not in ${type}`);
        } else {
          addToDo(item);
        }
      },
    }),
    [toDos]
  );

  return (
    <div
      className="flex min-h-[80vh] min-w-[300px] flex-col gap-4 border border-gray-400 p-4"
      ref={(ref) => {
        drop(ref);
      }}
    >
      <p className="text-center">{type}</p>
      {toDos.map((v, i) => (
        <DraggableButton
          className="btn btn-primary relative overflow-hidden bg-transparent"
          itemValue={v}
          dragType={DragItemType.ActiveCard}
          key={`in_todo_${v.type}_${v.name}_${i}`}
        >
          {v.name}
          <BackgroundProgressBar />
        </DraggableButton>
      ))}
    </div>
  );
}

function TableList() {
  const tableState = useToDoStore((state) => state.tableState);

  return (
    <div className="flex flex-1 gap-4 overflow-x-scroll">
      {Object.entries(tableState).map(([type, toDos]) => (
        <TypeList type={type} toDos={toDos} key={`table_${type}`} />
      ))}
    </div>
  );
}

interface ToDoListProps {
  initialValue: IToDo[];
}

export default function ToDoListDraggable({ initialValue }: ToDoListProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToDoStoreProvider initialValue={initialValue}>
        <div className="flex gap-4">
          <IdleList />
          <TableList />
        </div>
      </ToDoStoreProvider>
    </DndProvider>
  );
}
