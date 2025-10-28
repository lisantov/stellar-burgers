import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientByIdSelector } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientData = useSelector((state) =>
    ingredientByIdSelector(state)(params.id!)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
