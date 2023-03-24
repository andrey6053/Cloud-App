import axios from "axios"
import { hideLoader, showLoader } from "../reducers/appReducer"
import { setFiles, addFile, dltFile } from '../reducers/fileReducer'
import { addUploadFile, changeUploadProgress, showUploader } from "../reducers/uploadReducer"

export function getFiles(dirId, search) {
   return async dispatch => {
      try {
         dispatch(showLoader())
         let url = `http://localhost:5000/api/files`
         if (dirId) url = `http://localhost:5000/api/files?parent=${dirId}`
         if (search) url = `http://localhost:5000/api/files?search=${search}`
         const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
         })
         dispatch(setFiles(response.data))
      } catch (e) {
         console.log(e)
      } finally {
         dispatch(hideLoader())
      }
   }
}

export function createDir(name, dirId) {
   return async dispatch => {
      try {
         const response = await axios.post(`http://localhost:5000/api/files`, {
            name,
            type: "dir",
            parent: dirId
         }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         dispatch(addFile(response.data))
      } catch (e) {
         console.log(e.response.data.message)
      }
   }
}

export function uploadFile(file, dirId) {
   return async dispatch => {
      try {
         const formData = new FormData()
         const name = encodeURI(file.name)
         formData.append("file", file)
         formData.append("name", name)
         if (dirId) {
            formData.append("parent", dirId)
         }
         const uploadFile = { name: file.name, id: Date.now() + file.size }
         dispatch(showUploader())
         const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            onUploadProgress: progressEvent => {
               const totalLength = progressEvent.event.lengthComputable ? progressEvent.event.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
               if (totalLength) {
                  uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                  dispatch(changeUploadProgress(uploadFile))
               }
            }
         });
         dispatch(addUploadFile(uploadFile))
         dispatch(addFile(response.data))
      } catch (e) {
         console.log(e)
         console.log(e.response.data.message)
      }
   }
}

export function deleteFile(file, dirId) {
   return async dispatch => {
      try {
         const response = await axios.delete(`http://localhost:5000/api/files/delete?id=${file._id}${dirId ? `&parent=${dirId}` : ""}`, {
            headers:
            {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         dispatch(dltFile(response.data))
      } catch (e) {
         console.log(e.response.data.message)
      }
   }
}

export async function downloadFile(file) {
   const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
      headers:
      {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
   })
   if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
   }
}