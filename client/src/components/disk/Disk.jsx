import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileList from './fileList/FileList'
import "./disk.scss"
import { getFiles, uploadFile } from '../../actions/files'
import Popup from './Popup'
import backLogo from '../../assets/img/back.svg'
import arrowFilter from '../../assets/img/arrowFilter.svg'
import union from '../../assets/img/union.svg'
import viewByList from '../../assets/img/viewByList.svg'
import Loader from '../UI/loader/Loader'
import { popFromStack, popFromStackNameDir, setCurrentDir, setNameDir, sortFilesBy, switchShowPopup } from '../../reducers/fileReducer'
import Uploader from '../uploader/Uploader'
import { setViewType } from '../../reducers/appReducer'

function Disk() {
   const dispatch = useDispatch()
   const curDir = useSelector(state => state.files.currentDir)
   const dirStack = useSelector(state => state.files.dirStack)
   const curDirName = useSelector(state => state.files.curDirName)
   const dirNameStack = useSelector(state => state.files.dirNameStack)
   const [isDropFile, setIsDropFile] = useState(false)
   const isLoader = useSelector(state => state.app.isLoader)

   useEffect(() => {
      dispatch(getFiles(curDir))
      // eslint-disable-next-line
   }, [curDir])

   function showHandlerPopup() {
      dispatch(switchShowPopup("flex"))
   }
   function backToFolder() {
      const backDirId = dirStack[dirStack.length - 1]
      const lastNameDir = dirNameStack[dirNameStack.length - 1]
      dispatch(setNameDir(lastNameDir))
      dispatch(popFromStackNameDir(lastNameDir))
      dispatch(popFromStack(backDirId))
      dispatch(setCurrentDir(backDirId))
   }
   function fileUploadHandler(event) {
      const files = [...event.target.files]
      files.forEach(file => dispatch(uploadFile(file, curDir)))
   }
   function dragEnter(event) {
      event.preventDefault()
      event.stopPropagation()
      setIsDropFile(true)
   }
   function dragLeave(event) {
      event.preventDefault()
      event.stopPropagation()
      setIsDropFile(false)
   }
   function dropHandler(event) {
      event.preventDefault()
      event.stopPropagation()
      const files = [...event.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, curDir)))
      setIsDropFile(false)
   }
   function filterByOptions(event) {
      event.preventDefault()
      event.stopPropagation()
      dispatch(sortFilesBy(event.target.value))
   }
   function viewChangeHandler(type) {
      dispatch(setViewType(type))
   }
   if (isLoader) return <Loader />
   return (
      (!isDropFile ?
         <div className='disk' onDragEnter={dragEnter} onDragOver={dragEnter} onDragLeave={dragLeave}>
            <div className="disk__name-folder">{curDirName}</div>
            <div className="disk__btns">
               {curDir && <button className="disk__btnBack" onClick={() => backToFolder()}>
                  <img src={backLogo} alt="" />
               </button>}
               <button className="disk__btnCreateDir" onClick={() => showHandlerPopup()}>Создать папку</button>
               <div className="dis__btnUploadFile">
                  <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                  <input multiple={true} type="file" id="disk__upload-input" onChange={(event) => fileUploadHandler(event)} className="disk__upload-input" />
               </div>
               <img className='disk__arrowFilter' src={arrowFilter} alt="" />
               <select name="filter" className='disk__filters' id="" onChange={(event) => filterByOptions(event)}>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                  <option value="date">Date</option>
               </select>
               <button className='disk__view' onClick={() => viewChangeHandler("tile")}><img src={union} alt="" /></button>
               <button className='disk__view' onClick={() => viewChangeHandler("list")}><img src={viewByList} alt="" /></button>
            </div>
            <FileList />
            <Popup />
            <Uploader />
         </div>
         :
         <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnter} onDragOver={dragEnter} onDragLeave={dragLeave}>
            Перетащите файлы сюда
         </div>
      )
   )
}

export default Disk
