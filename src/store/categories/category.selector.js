import { createSelector } from 'reselect';

const selectCategoriesSlice = (state) => {
  console.log('selector 1 fired');
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => {
    console.log('selector 2 fired');
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('selector 3 fired');
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

/*export const selectCategoriesMap = (state) => {
  console.log('selector fired');
  const categoriesMap = state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoriesMap;
}; */
