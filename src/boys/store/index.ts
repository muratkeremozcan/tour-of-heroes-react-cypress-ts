import {combineReducers} from 'redux'
import {boysReducer, selectedBoyReducer} from './reducer'

export * from './actions'
export * from './reducer'
export * from './saga'

const store = combineReducers({
  boys: boysReducer,
  selectedBoy: selectedBoyReducer,
})

export default store
