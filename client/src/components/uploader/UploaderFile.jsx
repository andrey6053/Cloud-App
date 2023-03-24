import React from 'react'
import './uploader.scss'

function UploaderFile({ file }) {
  return (
    <div className='uploadFile'>
      <div className="uploadFile__name">{file.name}</div>
        <div className="uploadFile__progressBar" >
          <div className="uploadFile__line" style={{ width: file.progress + '%' }}></div>
          <div className="uploadFile__progress">{file.progress}%</div>
        </div>
    </div>
  )
}

export default UploaderFile
