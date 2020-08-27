import React, { forwardRef, useRef, useState, useImperativeHandle, useEffect } from "react";
import MgUploadAccessory from '../MgUploadAccessory';
import MgUploadImage from '../MgUploadImage';
import { uuids, handleUpload } from '../utils/utils'

function MgUpload(props, ref) {
  const {
    token,
    uploadType = 'accessory',
    fileList = [],
    multiple = false,
    autoUpload = true,
    accept = '',
    imgBaseUrl = 'https://images.mogulinker.com',
    handleChange = () => { },
    handleRemove = () => { },
  } = props

  const inputRef = useRef();
  const autoUploadRef = useRef([])

  const [files, setFiles] = useState([]);

  // 初始化附件格式
  function initImage(file) {
    const key = uploadType === 'accessory' ? file.key : file
    const newFile = {
      uid: uuids(),
      key: key,
      url: key.indexOf('/') === -1 ? `${imgBaseUrl}/${key}` : `${imgBaseUrl}${key}`,
    }

    if (uploadType === 'accessory') {
      newFile.name = file.name
    }

    return newFile;
  }

  useEffect(() => {
    if (!autoUpload) {
      const newFileList = uploadType === 'accessory' ?
        fileList.map(item => typeof item === 'object' && item.size ? item : initImage(item)) :
        fileList.map(item => typeof item === 'string' ? initImage(item) : item)
      setFiles(newFileList)
    }
  }, [fileList])

  useEffect(() => {
    if (autoUpload && fileList) {
      autoUploadRef.current = fileList
      const newFileList = uploadType === 'accessory' ?
        fileList.map(item => initImage(item)) :
        fileList.map(item => typeof item === 'string' ? initImage(item) : item)
      setFiles(newFileList)
    }
  }, [])

  const onChange = (info) => {
    const fileLists = [];
    console.log(Object.entries(info.currentTarget.files))
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
      // 自动上传就返回所有的key和name
      handleUpload(fileLists, token).then(res => {
        if (res) {
          if (uploadType === 'accessory') {
            const addKeys = res.map(file => ({ name: file.name, key: file.key }))
            const addFiles = addKeys.map(file => initImage(file))
            // 自动上传-返回新增的文件keys和新增后所有的文件keys
            handleChange(addKeys, [...files.map(file => ({ name: file.name, key: file.key })), ...addKeys])
            autoUploadRef.current = [...files.map(file => ({ name: file.name, key: file.key })), ...addKeys]
            setFiles([...files, ...addFiles])
          } else {
            const addKeys = res.map(item => item.key)
            console.log(addKeys)
            const addfiles = addKeys.map(item => initImage(item))
            // 自动上传返回新增了那些key和新增后所有的key
            handleChange(addKeys, [...files, ...addfiles].map(file => file.key))
            autoUploadRef.current = [...files, ...addfiles].map(file => file.key)
            // 将新增的key展示到图片列表中
            setFiles([...files, ...addfiles])
          }
        }
      })
    } else {
      // 自定义上传就返回新选择的图片对象
      handleChange(fileLists)
    }
  };

  // 移除的回调
  const handleDelete = (file, e) => {
    e && e.stopPropagation()
    const newFiles = files.filter(item => item.uid !== file.uid)
    const filesKeys = uploadType === 'accessory' ?
      newFiles.map(item => ({ name: item.name, key: item.key })) :
      newFiles.map(item => item.key)
    if (autoUpload) {
      setFiles(newFiles)
      autoUploadRef.current = filesKeys
      if (uploadType === 'accessory') {
        handleRemove({ name: file.name, key: file.key }, filesKeys)
      } else {
        handleRemove(file.key, filesKeys)
      }
    } else {
      handleRemove(file, newFiles)
    }
  }

  const getAutoFileKeys = () => autoUploadRef.current

  useImperativeHandle(ref, () => ({
    getAutoFileKeys,
  }))

  const mgUploadProps = {
    files,
    inputRef,
    handleDelete,
    ...props
  }

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        multiple={multiple}
        files={files}
        onChange={onChange}
      />
      {uploadType === 'picture' ? <MgUploadImage {...mgUploadProps} /> : <MgUploadAccessory {...mgUploadProps} />}
    </>
  );
}

export default forwardRef(MgUpload);
