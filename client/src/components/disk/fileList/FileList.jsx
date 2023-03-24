import React from 'react'
import { useSelector } from 'react-redux'
import "./fileList.scss"
import File from './file/File'
function FileList() {
   const sortOption = useSelector(state => state.files.sortBy)
   const viewType = useSelector(state => state.app.viewType)
   const files = useSelector(state => state.files.files)
      .sort((a, b) => {
         switch (sortOption) {
            case ("name"): return a.name.localeCompare(b.name)
            case ("type"): return a.type === "dir" ? -1 : 1
            case ("date"): return a.date > b.date ? 1 : -1
            default: return ""
         }
      })
   if (files.length === 0) {
      return <div className='fileList-empty'>Файлы не найдены</div>
   }
   return (
      <div className={viewType === "list" ? "fileList" : "fileList tileList"}>
         {viewType === "list" &&
            <div className="fileList__header">
               <div className="fileList__name">Название</div>
               <div className="fileList__date">Дата</div>
               <div className="fileList__size">Размер</div>
            </div>
         }
         {files.map(file => <File key={file._id} file={file} />)}
      </div>
   )
}

export default FileList
