import React, { forwardRef } from 'react';
import './index.css';
import { download } from '../utils/utils'

const MgUploadAccessory = (props, ref) => {
  const {
    children,
    files = [],
    length = 6,
    isDownload = false,
    inputRef,
    handleDownload = () => { },
    handleDelete = () => { },
  } = props

  // 点击下载
  const handleDownloadFile = (file) => {
    if (isDownload) {
      download(file.url || window.URL.createObjectURL(file.originFileObj), file.name)
    }
    handleDownload(file)
  }

  return (
    <div className='mg-upload'>
      <div className='mg-upload-accessory'>
        <button
          className={files.length === length ? 'mg-upload-button-disabled' : 'mg-upload-button'}
          onClick={() => { inputRef.current.click() }}
          disabled={files.length === length}
        >
          {children || <div className='mg-upload-button-content'>
            <span className='mg-upload-button-content-icon'></span>选择文件
          </div>}
        </button>
        {files.map(item =>
          <div
            className='mg-upload-accessory-item'
            key={item.uid}
            onClick={() => handleDownloadFile(item)}
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