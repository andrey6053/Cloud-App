const SHOW_LOADER = "SHOW_LOADER"
const HIDE_LOADER = "HIDE_LOADER"
const VIEW_TYPE = "VIEW_TYPE"

const defaultState = {
   isLoader: true,
   viewType: "list"
}

export default function appReducer(state = defaultState, action) {
   switch (action.type) {
      case SHOW_LOADER: return { ...state, isLoader: true }
      case HIDE_LOADER: return { ...state, isLoader: false }
      case VIEW_TYPE: return { ...state, viewType: action.payload }
      default:
         return state
   }
}

export const showLoader = () => ({ type: SHOW_LOADER })
export const hideLoader = () => ({ type: HIDE_LOADER })
export const setViewType = (type) => ({ type: VIEW_TYPE, payload: type })