import React, { useState, useEffect, useRef, forwardRef } from 'react';
import './index.css';
import { uuids, download } from '../utils/utils'

const MgUploadAccessory = (props, ref) => {
  const {
    fileList = [],
    children,
    uploadType = 'accessory',
    length = 6,
    multiple = false,
    isDownload = false,
    autoUpload = true,
    accept = '',
    handleChange = () => { },
    handleRemove = () => { },
    handleDownload = () => { },
    imgBaseUrl = 'https://images.mogulinker.com',
  } = props
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  // 如果不自动上传，展示的文件列表只依赖传进来的fileList
  useEffect(() => {
    if (!autoUpload) {
      const newFileList = fileList.map(item => typeof item === 'object' && item.size ? item : initImage(item))
      setFiles(newFileList)
    }
  }, [fileList])

  // 初始化附件格式
  function initImage(file) {
    const newFile = {
      uid: uuids(),
      key: file.key,
      name: file.name,
      url: file.key.indexOf('/') === -1 ? `${imgBaseUrl}/${file.key}` : `${imgBaseUrl}${file.key}`,
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
      // // 自动上传就返回所有的key
      // handleUpload(fileLists).then(res => {
      //   if (res) {
      //     handleChange([...fileList, ...res])
      //     const addKeys = res.map(item => initImage(item))
      //     autoUploadRef.current = [...fileList, ...res]
      //     setFiles([...files, ...addKeys])
      //   }
      // })
    } else {
      // 自定义上传就返回新选择的图片对象
      handleChange(fileLists)
    }

  };

  // 移除的回调
  const handleDelete = (file, e) => {
    e.stopPropagation()
    const newFiles = files.filter(item => item.uid !== file.uid)
    if (autoUpload) {
      // setFiles(newFiles)
      // handleRemove(file, newFilesKeys)
    } else {
      handleRemove(file, newFiles)
    }
  }

  // 点击下载
  const handleDownloadFile = (file) => {
    if (file.url) {
      download(file.url, file.name)
    } else {
      download(window.URL.createObjectURL(file.originFileObj), file.name)
    }
    handleDownload(file)
  }

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
      <div className='mg-upload-accessory'>
        <button
          className={files.length === length ? 'mg-upload-button-disabled' : 'mg-upload-button'}
          onClick={() => { inputRef.current.click() }}
        // disabled={newFileList.length === length}
        >
          {children || <div className='mg-upload-button-content'>
            <span className='mg-upload-button-content-icon'></span>选择文件
          </div>}
        </button>
        {files.map(item =>
          <div
            className='mg-upload-accessory-item'
            key={item.uid}
            onClick={isDownload ? () => handleDownloadFile(item) : null}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className='mg-upload-accessory-item-icon mg-upload-accessory-icon'></span>{item.name}
            </span>
            <span
              className='mg-upload-accessory-item-icon mg-upload-delete-icon'
              onClick={(e) => handleDelete(item, e)}
            ></span>
          </div>)}
      </div>
    </div>
  )
}

export default forwardRef(MgUploadAccessory);