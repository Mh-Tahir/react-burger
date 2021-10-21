import React, { useRef, FC } from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../services/actions";

type TProps = {
  e: TIngredient;
  onClose: () => void;
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const BurgerConstructorElement: FC<TProps> = ({ e, onClose, id, index, moveCard }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "inOrder",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDrag }, drag] = useDrag({
    type: "inOrder",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <>
      {!isDrag && (
        <li ref={ref} className={styles.element + " mb-4 mr-2 ml-4"} data-handler-id={handlerId}>
          <DragIcon type="primary" />
          <ConstructorElement text={e.name} price={e.price} thumbnail={e.image} handleClose={onClose} />
        </li>
      )}
    </>
  );
};
