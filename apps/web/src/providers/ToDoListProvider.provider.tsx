import { createContext, useRef, ComponentProps, useContext } from "react";
import { useStore } from "zustand";

import { createToDoStore, ToDoStore } from "@/stores/to-do-list.store";
import { IToDo } from "@repo/types/ToDo.type";

export type ToDoStoreApi = ReturnType<typeof createToDoStore>;

export const ToDoStoreContext = createContext<ToDoStoreApi | undefined>(
  undefined
);

export interface ToDoStoreProviderProps extends ComponentProps<"div"> {
  initialValue: IToDo[];
}

export const ToDoStoreProvider = ({
  initialValue,
  children,
}: ToDoStoreProviderProps) => {
  const storeRef = useRef<ToDoStoreApi>(null);
  if (!storeRef.current) {
    const initialTableState = initialValue.reduce(
      (acc, curr) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [];
        }
        return acc;
      },
      {} as Record<string, IToDo[]>
    );

    storeRef.current = createToDoStore({
      toDoList: initialValue,
      tableState: initialTableState,
    });
  }

  return (
    <ToDoStoreContext.Provider value={storeRef.current}>
      {children}
    </ToDoStoreContext.Provider>
  );
};

export const useToDoStore = <T,>(selector: (store: ToDoStore) => T): T => {
  const toDoStoreContext = useContext(ToDoStoreContext);

  if (!toDoStoreContext) {
    throw new Error(`useToDoStore must be used within ToDoStoreProvider`);
  }

  return useStore(toDoStoreContext, selector);
};
