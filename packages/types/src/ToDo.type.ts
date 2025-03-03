export interface IToDo {
  type: string;
  name: string;
  timeoutId?: ReturnType<typeof setTimeout>; //use upon being in an active todo list. for reference to use clearTimeout on toDo that is going back to idle state
}
