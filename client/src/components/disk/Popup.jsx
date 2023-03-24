import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/files'
import { switchShowPopup } from '../../reducers/fileReducer'

import Input from "../UI/input/Input"

function Popup() {
   const [nameFolder, setNameFolder] = useState("")
   const dispatch = useDispatch()
   const curDir = useSelector(state => state.files.currentDir)
   const statePopup = useSelector(state => state.files.showPopup)

   function createDirBtn() {
      dispatch(createDir(nameFolder, curDir))
      dispatch(switchShowPopup("none"))
      setNameFolder("")
   }

   function hidePopup() {
      dispatch(switchShowPopup("none"))
   }

   return (
      <div className='popup' onClick={() => hidePopup()} style={{ display: statePopup }} >
         <div className="popup__content" onClick={(e) => e.stopPropagation()}>
            <div className="popup__header">
               <div className="popup__title">Создать новую папку</div>
               <button className="popup__close" onClick={() => hidePopup()}>X</button>
            </div>
            <Input
               type="text"
               placeholder="Введите название папки..."
               value={nameFolder}
               setValue={setNameFolder}
            />
            <button className="popup__createBtn" onClick={() => createDirBtn()}>Создать папку</button>
         </div>
      </div>
   )
}

export default Popup

