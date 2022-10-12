import {
  SELECT_BOY,
  LOAD_BOY_SUCCESS,
  LOAD_BOY,
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

import {State} from '../../models/types'
import {Boy} from '../../models/Boy'

const initState: State = {
  loading: false,
  data: [],
  error: void 0,
}

// TODO: find a type for payload
/* eslint-disable @typescript-eslint/no-explicit-any */

export const boysReducer = (state = initState, action: any) => {
  switch (action.type) {
    case LOAD_BOY:
      return {...state, loading: true, error: ''}
    case LOAD_BOY_SUCCESS:
      return {...state, loading: false, data: [...action.payload]}
    case LOAD_BOY_ERROR:
      return {...state, loading: false, error: action.payload}

    case UPDATE_BOY:
      return {
        ...state,
        data: state.data.map(h => {
          if (h.id === action.payload.id) {
            state.loading = true
          }
          return h
        }),
      }
    case UPDATE_BOY_SUCCESS:
      return modifyBoyState(state, action.payload)
    case UPDATE_BOY_ERROR:
      return {...state, loading: false, error: action.payload}

    case DELETE_BOY: {
      return {
        ...state,
        loading: true,
        data: state.data.filter(h => h !== action.payload),
      }
    }

    case DELETE_BOY_SUCCESS: {
      const result = {...state, loading: false}
      return result
    }

    case DELETE_BOY_ERROR: {
      return {
        ...state,
        data: [...state.data, action.payload.requestData],
        loading: false,
      }
    }

    case ADD_BOY: {
      return {...state, loading: true}
    }

    case ADD_BOY_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, {...action.payload}],
      }
    }

    case ADD_BOY_ERROR: {
      return {...state, loading: false}
    }

    default:
      return state
  }
}

const modifyBoyState = (heroState: any, heroChanges: any) => {
  return {
    ...heroState,
    loading: false,
    data: heroState.data.map((h: any) => {
      if (h.id === heroChanges.id) {
        return {...h, ...heroChanges}
      } else {
        return h
      }
    }),
  }
}

const initialSelectedBoy = null

export const selectedBoyReducer = (state = initialSelectedBoy, action: any) => {
  switch (action.type) {
    case SELECT_BOY:
      return action.payload ? {...action.payload} : null
    default:
      return state
  }
}
