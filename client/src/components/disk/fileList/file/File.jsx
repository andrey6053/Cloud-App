import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./file.scss"
import dirLogo from '../../../../assets/img/iconDir.svg'
import fileFormat from '../../../../utils/fileFormat'
import basketLogo from '../../../../assets/img/basket.svg'
import downloadLogo from '../../../../assets/img/download.svg'
import { curDirNameHandler, pushToStack, pushToStackNameDir, setCurrentDir, setNameDir } from '../../../../reducers/fileReducer'
import { downloadFile, deleteFile } from '../../../../actions/files'
import sizeFormat from "../../../../utils/sizeFormat.js"

function File({ file }) {
   const dispatch = useDispatch()
   const curDir = useSelector(state => state.files.currentDir)
   const viewType = useSelector(state => state.app.viewType)
   const curDirName = useSelector(state => state.files.curDirName)
   function dirHandler() {
      if (file.type === "dir") {
         const name = file.path.replace('disk', "Мой диск:")
         dispatch(pushToStackNameDir(curDirName))
         dispatch(setNameDir(name))
         dispatch(pushToStack(curDir))
         dispatch(setCurrentDir(file._id))
      }
   }
   function downloadHandler(event) {
      if (file.type !== "dir") {
         event.stopPropagation()
         downloadFile(file)
      }
   }
   function deleteHandler(event) {
      event.stopPropagation()
      dispatch(deleteFile(file, curDir))
   }
   return (
      viewType === "list" ?
         <div className='file' onClick={() => dirHandler()}>
            <img src={file.type === "dir" ? dirLogo : fileFormat(file.type)} alt="" className="file__icon" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== "dir" && <button className="file__btn file__download" onClick={(event) => downloadHandler(event)}>
               <img className='file__btnBasket' src={downloadLogo} alt="downloadLogo" />
            </button>}
            <button className="file__btn file__delete" onClick={(event) => deleteHandler(event)}>
               <img className='file__btnBasket' src={basketLogo} alt="basketLogo" />
            </button>
         </div>
         :
         <div className='tile' onClick={() => dirHandler()}>
            <div className="tile__file" onClick={(event) => downloadHandler(event)}>
               <img src={file.type === "dir" ? dirLogo : fileFormat(file.type)} alt="" className="tile__icon" />
               <div title={file.name} className="tile__name" >{file.name}</div>
            </div>
         </div>
   )
}

export default File
