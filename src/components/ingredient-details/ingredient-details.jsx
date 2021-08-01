import React from "react";
import styles from "./ingredient-details.module.css";
import {} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientItemPropTypes } from "../../utils/constants";

const IngredientDetails = ({ data, onClose }) => {
  return (
    <div className={styles.container + " pt-10 pr-10 pb-10 pl-10"} onClick={onClose}>
      <p className="text text_type_main-large mt-3 mb-3">Детали ингредиента</p>
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

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredientItemPropTypes.isRequired).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
