import { ComponentProps } from "react";
import { useDrag } from "react-dnd";
import cx from "classnames";

type DraggableButtonProps<T> = {
  dragType: string;
  itemValue: T;
};

type mix<T> = DraggableButtonProps<T> & ComponentProps<"button">;

export function DraggableButton<T>({ dragType, itemValue, ...props }: mix<T>) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragType,
    item: itemValue,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      className={cx("btn", isDragging ? "opacity-25" : "", props.className)}
      ref={(ref) => {
        drag(ref);
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
