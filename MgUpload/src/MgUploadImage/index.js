import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { uuids, handleUpload } from '../utils/utils'
import "./index.css";

const MgUploadImage = (props, ref) => {
  const {
    fileList = [],
    length = 6,
    multiple = false,
    autoUpload = true,
    accept = '',

    handleChange = () => { },
    handleRemove = () => { },
    imgBaseUrl = 'https://images.mogulinker.com',
  } = props

  const autoUploadRef = useRef([])

  const inputRef = useRef();
  const [files, setFiles] = useState([])

  // 自动上传只接收第一次传进来的初始值，后面fileList改变不再重新渲染
  useEffect(() => {
    if (autoUpload && fileList) {
      autoUploadRef.current = fileList
      const newFileList = fileList.map(item => typeof item === 'string' ? initImage(item) : item)
      setFiles(newFileList)
    }
  }, [])

  useEffect(() => {
    if (!autoUpload) {
      const newFileList = fileList.map(item => typeof item === 'string' ? initImage(item) : item)
      setFiles(newFileList)
    }
  }, [fileList])


  // 初始化图片格式
  function initImage(file) {
    const newFile = {
      uid: uuids(),
      key: file,
      url: file.indexOf('/') === -1 ? `${imgBaseUrl}/${file}` : `${imgBaseUrl}${file}`,
    }
    return newFile;
  }

  const onChange = (info) => {
    const fileLists = [];
    Object.entries(info.currentTarget.files).forEach(item => {
      const [key, value] = item;
      const file = {
        uid: uuids(),
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
        lastModifiedDate: value.lastModifiedDate,
        originFileObj: item[1]
      };
      fileLists.push(file);
    });
    if (autoUpload) {
      handleUpload(fileLists).then(res => {
        if (res) {
          console.log(res)
          const addKeys = res.map(item => item.key)
          const addfiles = addKeys.map(item => initImage(item))
          // 自动上传返回新增了那些key和新增后所有的key
          handleChange(addKeys, [...files, ...addfiles].map(file => file.key))
          autoUploadRef.current = [...files, ...addfiles].map(file => file.key)
          // 将新增的key展示到图片列表中
          setFiles([...files, ...addfiles])
        }
      })
    } else {
      // 自定义上传就返回新选择的图片对象
      handleChange(fileLists)
    }
  };

  // 移除的回调
  const handleDelete = (file) => {
    const newFiles = files.filter(item => item.uid !== file.uid)
    const newFilesKeys = newFiles.map(item => item.key)
    if (autoUpload) {
      setFiles(newFiles)
      autoUploadRef.current = newFilesKeys
    }
    // 自动上传将删除的文件key和删除后剩下的keys返回
    // 自定义上传-返回删除的那个文件和删除后剩余的文件
    handleRemove(autoUpload ? file.key : file, autoUpload ? newFilesKeys : newFiles)
  }

  const getAutoFileKeys = () => autoUploadRef.current

  useImperativeHandle(ref, () => ({
    // 获取自动上传的keys
    getAutoFileKeys,
  }))
  console.log(files)
  return (
    <div className='mg-upload'>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        multiple={multiple}
        files={files}
        onChange={onChange}
      />
      <div className='mg-upload-picture' >
        {files.map(item => <div key={item.uid} className='mg-upload-picture-content'>
          <div className='mg-upload-picture-content-shade'>
            <div className='mg-upload-picture-content-icon'>
              <span className='mg-upload-picture-content-icon-view' />
              <span className='mg-upload-picture-content-icon-delete' onClick={() => handleDelete(item)} />
            </div>
          </div>
          <img style={{ width: '100%', height: '100%' }} key={item.uid} src={item.url || window.URL.createObjectURL(item.originFileObj)} />
        </div>)}
        <div
          className='mg-upload-picture-select'
          style={{ display: files.length > length ? 'none' : 'flex' }}
          onClick={() => { inputRef.current.click() }}
        >
          <div className='mg-upload-picture-select-content-icon'></div>
          <div className='mg-upload-picture-select-content-text'>选择图片</div>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(MgUploadImage);