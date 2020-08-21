import React, { useState, forwardRef, useRef } from "react";
import "./index.css";
import { uuids, download } from '../utils/utils'

function MgUpload(props, ref) {
  const {
    fileList,
    children,
    uploadType = 'accessory',
    length = 6,
    multiple = false,
    isDownload = false,
    accept = '',
    handleChange = () => { },
    handleRemove = () => { },
    handleDownload = () => { },
  } = props
  const [files, setFiles] = useState([]);
  const inputRef = useRef();


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
    if (!fileList) {
      setFiles(fileLists)
    }
    handleChange({ fileList: fileLists });
  };

  // 移除的回调
  const handleDelete = (file) => {
    console.log(file)
    const newFiles = files.filter(item => item.uid !== file.uid)
    if (!fileList) {
      setFiles(newFiles)
    }
    handleRemove(file)
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

  const newFileList = fileList || files;
  if (newFileList.length > length) {
    newFileList.splice(length)
  }
  return (
    <div className='mg-upload'>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        multiple={multiple}
        files={newFileList}
        onChange={onChange}
      />
      {uploadType === 'accessory' ? <div className='mg-upload-accessory'>
        <button
          className={newFileList.length === length ? 'mg-upload-button-disabled' : 'mg-upload-button'}
          onClick={() => { inputRef.current.click() }}
          disabled={newFileList.length === length}
        >
          {children || <div className='mg-upload-button-content'>
            <span className='mg-upload-button-content-icon'></span>选择文件
          </div>}
        </button>
        {newFileList.map(item =>
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
              onClick={() => handleDelete(item)}
            ></span>
          </div>)}
      </div>
        :
        <div className='mg-upload-picture' >
          {newFileList.map(item => <div key={item.uid} className='mg-upload-picture-content'>
            <div className='mg-upload-picture-content-shade'>
              <div className='mg-upload-picture-content-icon'>
                <span className='mg-upload-picture-content-icon-view' />
                <span className='mg-upload-picture-content-icon-delete' onClick={() => handleDelete(item)} />
              </div>
            </div>
            <img style={{ width: '100%', height: '100%' }} key={item.uid} src={item.url || window.URL.createObjectURL(item.originFileObj)} />
          </div>)}
          {newFileList.length !== length && <div
            className='mg-upload-picture-select'
            style={{ display: newFileList.length > length ? 'none' : 'flex' }}
            onClick={() => { inputRef.current.click() }}
          >
            <div className='mg-upload-picture-select-content-icon'></div>
            <div className='mg-upload-picture-select-content-text'>选择图片</div>
          </div>}
        </div>
      }
    </div>
  );
}

export default forwardRef(MgUpload);
