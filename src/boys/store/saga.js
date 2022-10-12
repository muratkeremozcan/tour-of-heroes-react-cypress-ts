import {put, takeEvery, call, all} from 'redux-saga/effects'
import {
  LOAD_BOY,
  LOAD_BOY_SUCCESS,
  LOAD_BOY_ERROR,
  UPDATE_BOY,
  UPDATE_BOY_SUCCESS,
  UPDATE_BOY_ERROR,
  DELETE_BOY,
  DELETE_BOY_SUCCESS,
  DELETE_BOY_ERROR,
  ADD_BOY,
  ADD_BOY_SUCCESS,
  ADD_BOY_ERROR,
} from './actions'
import {createItem, deleteItem, getItem, editItem} from '../../api/api'

// Our worker Saga: will perform the async increment task
export function* loadingBoysAsync() {
  try {
    const data = yield call(getItem)
    const heroes = [...data]

    yield put({type: LOAD_BOY_SUCCESS, payload: heroes})
  } catch (err) {
    yield put({type: LOAD_BOY_ERROR, payload: err.message})
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadingBoysAsync() {
  yield takeEvery(LOAD_BOY, loadingBoysAsync)
}

export function* updatingBoyAsync({payload}) {
  try {
    const data = yield call(editItem, payload)
    const updatedBoy = data

    yield put({type: UPDATE_BOY_SUCCESS, payload: updatedBoy})
  } catch (err) {
    yield put({type: UPDATE_BOY_ERROR, payload: err.message})
  }
}

export function* watchUpdatingBoyAsync() {
  yield takeEvery(UPDATE_BOY, updatingBoyAsync)
}

export function* deletingBoyAsync({payload}) {
  try {
    yield call(deleteItem, payload)

    yield put({type: DELETE_BOY_SUCCESS, payload: null})
  } catch (err) {
    yield put({type: DELETE_BOY_ERROR, payload: err.message})
  }
}

export function* watchDeletingBoyAsync() {
  yield takeEvery(DELETE_BOY, deletingBoyAsync)
}

export function* addingBoyAsync({payload}) {
  try {
    const data = yield call(createItem, payload)
    const addedBoy = data

    yield put({type: ADD_BOY_SUCCESS, payload: addedBoy})
  } catch (err) {
    yield put({type: ADD_BOY_ERROR, payload: err.message})
  }
}

export function* watchAddingBoyAsync() {
  yield takeEvery(ADD_BOY, addingBoyAsync)
}

export function* heroSaga() {
  yield all([
    watchLoadingBoysAsync(),
    watchUpdatingBoyAsync(),
    watchDeletingBoyAsync(),
    watchAddingBoyAsync(),
  ])
}
