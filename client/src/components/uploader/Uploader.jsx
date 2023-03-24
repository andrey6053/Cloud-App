import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../reducers/uploadReducer'
import './uploader.scss'
import UploaderFile from './UploaderFile'


function Uploader() {
   const dispatch = useDispatch()
   const isVisibleUploader = useSelector(state => state.upload.isVisible)
   const files = useSelector(state => state.upload.files).map(file => <UploaderFile file={file} key={file.id} />)
   return (isVisibleUploader &&
      <div className='uploader'>
         <div className="uploader__header">
            <div className="uploader__title">Загрузки</div>
            <div className="uploader__btnClose" onClick={() => dispatch(hideUploader())}>Х</div>
         </div>
         {files}
      </div>
   )
}


export default Uploader
