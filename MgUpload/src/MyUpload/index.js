import React, { useState, useRef } from 'react';
// import MgUpload from '../MgUpload';
import MgUploadImage from '../MgUploadImage';
import MgUploadAccessory from '../MgUploadAccessory';
const imgBaseUrl = 'https://images.mogulinker.com';

const uploadType = 'accessory'

// const initFilelist = ['fT9je2IQin1597980063634.jpeg', 'iXmVdQwkx91597980063635.jpeg',]
const MyUpload = () => {

  // 上传图片测试
  // const [fileList, setFileList] = useState([
  //   'fT9je2IQin1597980063634.jpeg', 'iXmVdQwkx91597980063635.jpeg', 'LyfrK9JXss1597980063635.jpeg', 'VZqpry58ZS1597980063635.jpeg', '8wG8BzJJ7F1597980063635.jpeg'])

  // const handleChange = (addfiles, files) => {
  //   console.log(addfiles)
  //   console.log(files)
  //   // setFileList([...fileList, ...addfiles])
  // }

  // const handleRemove = (file, files) => {
  //   console.log(fileList)
  //   console.log(files)
  //   console.log(file)
  //   setFileList(files)
  // }


  // 上传附件测试
  const [fileList, setFileList] = useState([
    { name: '1.jpeg', key: 'fT9je2IQin1597980063634.jpeg' },
    { name: '2.jpeg', key: 'iXmVdQwkx91597980063635.jpeg' },
    { name: '3.jpeg', key: 'LyfrK9JXss1597980063635.jpeg' },
    { name: '4.jpeg', key: 'VZqpry58ZS1597980063635.jpeg' },
    { name: '5.jpeg', key: '8wG8BzJJ7F1597980063635.jpeg' },
  ])

  const uploadImageRef = useRef()

  const handleClick = () => {
    const keys = uploadImageRef.current.getAutoFileKeys()
    console.log(keys)
  }

  // const handleChange = (files) => {
  //   console.log([...fileList, ...files])
  //   setFileList([...fileList, ...files])
  // }

  // const handleRemove = (file, files) => {
  //   console.log(fileList)
  //   console.log(files)
  //   console.log(file)
  //   setFileList(files)
  // }
  return (
    <div style={{ width: 400, height: '100%', padding: 24 }}>
      {uploadType === 'picture' ? <MgUploadImage
        // handleChange={handleChange}
        // handleRemove={handleRemove}
        ref={uploadImageRef}
        uploadType='picture'
        multiple={true}
        length={5}
        isDownload={true}
        fileList={fileList}
        imgBaseUrl={imgBaseUrl}
        autoUpload={true}
      /> : <MgUploadAccessory
          // handleChange={handleChange}
          // handleRemove={handleRemove}
          ref={uploadImageRef}
          uploadType='picture'
          multiple={true}
          length={10}
          isDownload={true}
          fileList={fileList}
          imgBaseUrl={imgBaseUrl}
          autoUpload={true}
        />}
      {/* <button onClick={handleClick}>点击</button> */}
    </div>
  )
}

export default MyUpload;