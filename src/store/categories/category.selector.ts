import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

const selectCategoriesFromState = (state: RootState): CategoriesState => {
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoriesFromState],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesFromState],
  (categoriesSlice) => categoriesSlice.isLoading
);

