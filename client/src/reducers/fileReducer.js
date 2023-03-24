const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SHOW_POPUP = "SHOW_POPUP"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const POP_FROM_STACK = "POP_FROM_STACK"
const DELETE_FILE = "DELETE_FILE"
const SORT_FILES = "SORT_FILES"
const SET_CURRENT_NAME_DIR = "CHANGE_NAME"
const POP_FROM_STACK_NAME_DIR = "POP_FROM_STACK_NAME_DIR"
const PUSH_TO_STACK_NAME_DIR = "PUSH_TO_STACK_NAME_DIR"

const defaultState = {
   files: [],
   currentDir: null,
   showPopup: "none",
   dirStack: [],
   sortBy: "name",
   curDirName: "Мой диск",
   dirNameStack: []
}

export default function fileReducer(state = defaultState, action) {
   switch (action.type) {
      case SET_FILES: return { ...state, files: action.payload }
      case SET_CURRENT_DIR: return { ...state, currentDir: action.payload }
      case ADD_FILE: return { ...state, files: [...state.files, action.payload] }
      case SHOW_POPUP: return { ...state, showPopup: action.payload }
      case PUSH_TO_STACK: return { ...state, dirStack: [...state.dirStack, action.payload] }
      case POP_FROM_STACK: return { ...state, dirStack: [...state.dirStack.filter(dir => dir !== action.payload)] }
      case DELETE_FILE: return { ...state, files: [...state.files.filter(file => file._id !== action.payload)] }
      case SORT_FILES: return { ...state, sortBy: action.payload }
      case SET_CURRENT_NAME_DIR: return { ...state, curDirName: action.payload }
      case PUSH_TO_STACK_NAME_DIR: return { ...state, dirNameStack: [...state.dirNameStack, action.payload] }
      case POP_FROM_STACK_NAME_DIR: return { ...state, dirNameStack: [...state.dirNameStack.filter(name => name !== action.payload)] }
      default:
         return state
   }
}

export const setFiles = files => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir })
export const addFile = (file) => ({ type: ADD_FILE, payload: file })
export const switchShowPopup = (display) => ({ type: SHOW_POPUP, payload: display })
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir })
export const popFromStack = (dir) => ({ type: POP_FROM_STACK, payload: dir })
export const dltFile = (fileId) => ({ type: DELETE_FILE, payload: fileId })
export const sortFilesBy = (option) => ({ type: SORT_FILES, payload: option })
export const setNameDir = (name) => ({ type: SET_CURRENT_NAME_DIR, payload: name })
export const pushToStackNameDir = (name) => ({ type: PUSH_TO_STACK_NAME_DIR, payload: name })
export const popFromStackNameDir = (name) => ({ type: POP_FROM_STACK_NAME_DIR, payload: name })


