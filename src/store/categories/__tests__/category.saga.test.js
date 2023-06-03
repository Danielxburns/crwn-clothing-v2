import { call } from 'typed-redux-saga/macro'
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers'

import { getCategoriesAndDocuments } from '../../../assets/utils/firebase/firebase.utils';

import {
  fetchCategoriesAsync,
  onFetchCategories,
  categoriesSaga,
} from '../category.saga';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '.././category.action';

import { CATEGORIES_ACTION_TYPES } from '../category.types';

// 'testSaga' is very tied to our implementation. It's brittle because it fails if it doesn't match our implementation exactly
// it tests if every step of the saga that's supposed to happen happens
// this is ok for sagas that only do one thing. 
// ones that don't issue out any sagas nor are there any steps that get them to that place
// good for watcher sagas, aggregate sagas, and worker sagas with only one code block

describe('category Sagas', () => {
  test('categoriesSaga', () => {
    testSaga(categoriesSaga)         // receives a saga
    .next()                          // go to next 'yield'
    .all([call(onFetchCategories)])  // checks if this is what was called by the passed in saga
    .next()                          // move to next step
    .isDone()                        // tells testSaga the test is done
  });
  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
    .next()
    .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
    .next()
    .isDone()
  })

  // 'expectSaga' returns a promise
  // It doesn't care about the order in which the steps happen.
  // It tests the end results of each possible path
  // good for worker sagas with multiple code blocks

  test("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      { id:1, name: 'category 1' },
      { id:2, name: 'category 2' }
    ]

    return expectSaga(fetchCategoriesAsync) // return completed promise
    .provide([    // provide array of tuples with [ effect, mocked result]     
      [call(getCategoriesAndDocuments), mockCategoriesArray]
    ])
    .put(fetchCategoriesSuccess(mockCategoriesArray)) // here .put acts like '.toEqual'
    .run();
  })
  test("fetchCategoriesAsync failure", () => {
    const mockError = new Error('an error occurred');
    return expectSaga(fetchCategoriesAsync)
    .provide([
      [call(getCategoriesAndDocuments), throwError(mockError)]
    ])
    .put(fetchCategoriesFailed(mockError))
    .run()
  })

});
