import {
  ToDoStoreProvider,
  useToDoStore,
} from "@/providers/ToDoListProvider.provider";
import { IToDo } from "@repo/types/ToDo.type";
import BackgroundProgressBar from "../BackgroundProcessBar/BackgroundProcessBar";

function IdleList() {
  const toDoList = useToDoStore((state) => state.toDoList);
  const addToDo = useToDoStore((state) => state.addToDo);

  return (
    <div className="flex max-w-[300px] flex-1 flex-col gap-4">
      {toDoList.map((v, i) => (
        <button
          className="btn btn-primary"
          key={`${v.type}_${v.name}_${i}`}
          onClick={() => {
            addToDo(v);
          }}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}

function TableList() {
  const tableState = useToDoStore((state) => state.tableState);
  const removeToDo = useToDoStore((state) => state.removeToDo);

  return (
    <div className="flex flex-1 gap-4 overflow-x-scroll">
      {Object.entries(tableState).map(([type, toDos]) => (
        <div
          className="flex min-h-[80vh] min-w-[300px] flex-col gap-4 border border-gray-400 p-4"
          key={`table_${type}`}
        >
          <p className="text-center">{type}</p>
          {toDos.map((v, i) => (
            <button
              className="btn bg-transparent btn-primary relative overflow-hidden"
              key={`in_todo_${v.type}_${v.name}_${i}`}
              onClick={() => {
                removeToDo(v);
              }}
            >
              {v.name}
              <BackgroundProgressBar />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

interface ToDoListProps {
  initialValue: IToDo[];
}

export default function ToDoList({ initialValue }: ToDoListProps) {
  return (
    <ToDoStoreProvider initialValue={initialValue}>
      <div className="flex gap-4">
        <IdleList />
        <TableList />
      </div>
    </ToDoStoreProvider>
  );
}
