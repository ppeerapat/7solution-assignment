import CONFIG from "@/configs/config";
import { IToDo } from "@repo/types/ToDo.type";
import { createStore } from "zustand/vanilla";

export type ToDoState = {
  toDoList: IToDo[];
  tableState: Record<string, IToDo[]>;
};

export type ToDoActions = {
  addToDo: (toDo: IToDo) => void;
  removeToDo: (toDo: IToDo) => void;
};

export type ToDoStore = ToDoState & ToDoActions;

export const defaultInitState: ToDoState = {
  toDoList: [],
  tableState: {},
};

export const createToDoStore = (initState: ToDoState = defaultInitState) => {
  return createStore<ToDoStore>()((set, get) => ({
    ...initState,
    addToDo: (toDo: IToDo) => {
      const idleToDo = get().toDoList.find(
        (v) => v.name === toDo.name && v.type === toDo.type
      );
      if (idleToDo) {
        //save this timeout id so it can be call with clearTimeout.
        const timeoutId = setTimeout(() => {
          get().removeToDo(toDo);
        }, CONFIG.TODO_TIMEOUT);

        set((state) => ({
          toDoList: state.toDoList.filter(
            (v) => v.name !== toDo.name || v.type !== toDo.type
          ),
          tableState: {
            ...state.tableState,
            [toDo.type]: state.tableState[toDo.type]
              ? [...state.tableState[toDo.type]!, { ...toDo, timeoutId }]
              : [{ ...toDo, timeoutId }],
          },
        }));
      }
    },
    removeToDo: (toDo: IToDo) => {
      const currentToDo = get().tableState[toDo.type]?.find(
        (v) => v.name === toDo.name && v.type === toDo.type
      );

      if (currentToDo) {
        clearTimeout(currentToDo.timeoutId);

        set((state) => ({
          //Put back the toDo in todoList
          toDoList: [...state.toDoList, toDo],
          tableState: {
            ...state.tableState,
            //Update toDo by type to remove selected toDo out.
            [toDo.type]: state.tableState[toDo.type]!.filter(
              (v) => v.name !== toDo.name || v.type !== toDo.type
            ),
          },
        }));
      }
    },
  }));
};
