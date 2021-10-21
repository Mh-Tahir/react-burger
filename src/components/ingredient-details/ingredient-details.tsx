import React, { FC } from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../services/actions";

const IngredientDetails: FC = () => {
  const { id } = useParams() as any;
  let data = useSelector((store) => store.ingredients.element);
  const dataId = useSelector((store) => store.ingredients.ingredients).find((e: TIngredient) => e._id === id);
  data = dataId || data;
  return (
    <div className={styles.container + " pt-10 pr-10 pb-10 pl-10"}>
      <p className={styles.flex + " text text_type_main-large mt-3 mb-3"}>Детали ингредиента</p>
      <div className={styles.flex}>
        <img src={data.image_large} alt={data.name} />
        <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
        <ul className={styles.structure + " pb-5"}>
          <li className={styles.flex}>
            <p className="text text_type_main-default text_color_inactive mr-5">Калории, ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
          </li>
          <li className={styles.flex}>
            <p className="text text_type_main-default text_color_inactive mr-5">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
          </li>
          <li className={styles.flex}>
            <p className="text text_type_main-default text_color_inactive mr-5">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
          </li>
          <li className={styles.flex}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
