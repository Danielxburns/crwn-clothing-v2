import {
  createAction,
  Action,
  ActionWIthPayload,
  withMatcher,
} from '../../assets/utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES, Category } from './category.types';

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWIthPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWIthPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((
  categoriesArray: Category[]
): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
