import {Boy} from '../../models/Boy'
export const LOAD_HERO = 'LOAD_HERO'
export const LOAD_HERO_SUCCESS = 'LOAD_HERO_SUCCESS'
export const LOAD_HERO_ERROR = 'LOAD_HERO_ERROR'

export const UPDATE_HERO = 'UPDATE_HERO'
export const UPDATE_HERO_SUCCESS = 'UPDATE_HERO_SUCCESS'
export const UPDATE_HERO_ERROR = 'UPDATE_HERO_ERROR'

export const DELETE_HERO = 'DELETE_HERO'
export const DELETE_HERO_SUCCESS = 'DELETE_HERO_SUCCESS'
export const DELETE_HERO_ERROR = 'DELETE_HERO_ERROR'

export const ADD_HERO = 'ADD_HERO'
export const ADD_HERO_SUCCESS = 'ADD_HERO_SUCCESS'
export const ADD_HERO_ERROR = 'ADD_HERO_ERROR'

export const SELECT_HERO = 'SELECT_HERO'

export const selectBoyAction = (boy: Boy) => ({
  type: SELECT_HERO,
  payload: boy,
})
export const loadBoysAction = () => ({type: LOAD_HERO})

export const updateBoyAction = (boy: Boy) => ({
  type: UPDATE_HERO,
  payload: boy,
})
export const deleteBoyAction = (boy: Boy) => ({
  type: DELETE_HERO,
  payload: boy,
})
export const addBoyAction = (boy: Boy) => ({type: ADD_HERO, payload: boy})

// event -> ACTION -(dispatch)-(middleware)-> REDUCER -> STORE(state) -(selector)-> update VIEW
// In Redux, actions are payloads of information that send data from your application to your store.
// actions return an object with a required type key
// actions represent all the basic ways a user can interact with the app
// we also need to use the dispatch fn (from Redux) to dispatch the action
// Users and servers are the two actors that can modify state in your applications
