## 1、引入组件

``` js
import MgUpload from '@/components/MgUpload';
```

## API

| 参数            | 说明                      |           类型            | 默认值  |
| --------------- | ------------------------- | :-----------------------: | :-----: |
| accept          | 接受上传的文件类型        |          String           |   无    |
| multiple        | 是否支持多选文件          |          Boolean          |  false  |
| uploadType      | 上传文件的类型            | String(picture/accessory) | picture |
| isPreview       | 是否支持预览效果          |          Boolean          |  false  |
| fileList        | 已上传文件列表            |           Array           |   []    |
| length          | 允许最大上传数量          |          Number           |   30    |
| autoUpload      | 是否自动上传到七牛        |          Boolean          |  true   |
| isDownload      | 是否支持下载              |          Boolean          |  false  |
| handleChange    | 选择图片的回调            |       Fun(fileList)       |    -    |
| handleRemove    | 点击移除文件的回调        |         Fun(file)         |    -    |
| handleDownload  | 附件点击下载的回调        |         Fun(file)         |    -    |
| beforeUoload    | 上传之前的回调            |    Fun(file,fileList)     |    -    |
|                 |                           |                           |         |
|                 |                           |                           |         |
|                 |                           |                           |         |
|                 |                           |                           |         |
| ref             |                           |                           |         |
| getAutoFileKeys | 自动上传时，获取所有的key |                           |         |
|                 |                           |                           |         |



**上传附件示例**

Demo1-不自动上传

```javascript
import MgUpload from 'MgUpload';

const TestUpload = (props) => {
  // 上传附件fileList格式如下
  const [fileList,setFileList] = useState([
     	{ name: '1.jpeg', key: 'fT9je2IQin1597980063634.jpeg' },
     	{ name: '2.jpeg', key: 'iXmVdQwkx91597980063635.jpeg' },
    	{ name: '3.jpeg', key: 'LyfrK9JXss1597980063635.jpeg' },
    	{ name: '4.jpeg', key: 'VZqpry58ZS1597980063635.jpeg' },
    	{ name: '5.jpeg', key: '8wG8BzJJ7F1597980063635.jpeg' },
  ])
  
  const handleChange = (files) => {
    // 自定义上传，参数file是新选择的文件
    setFileList([...fileList, ...files])
  }
  
  const handleRemove = (file, files) => {
    // file是删除的文件
    // files是删除后还剩下的文件
    // 自定义上传
    setFileList(files)
  }
  
  return (
    <Upload
    	handleChange={handleChange}, // 选择附件的回调
      handleRemove={handleRemove},  // 删除附件的回调
    	fileList={fileList},  // 初始附件列表
      multiple={true}, // 是否支持多选
    	uploadType='accessory',  // 上传附件（accessory），上传图片（picture）
    	length={6},  // 允许最大上传数量
      isDownload={true}, // 是否支持下载
      imgBaseUrl='https://images.mogulinker.com',  // 文件/图片基准路径
			autoUpload={false},   // 是否自动上传到七牛
    />
  )
}
  
ReactDOM.render(<TestUpload />, mountNode);
```



Demo02-自动上传

```javascript
import MgUpload from 'MgUpload';

const TestUpload = (props) => {
  const uploadImageRef = useRef()
  // 上传附件fileList格式如下
  const [fileList,setFileList] = useState([
     	{ name: '1.jpeg', key: 'fT9je2IQin1597980063634.jpeg' },
     	{ name: '2.jpeg', key: 'iXmVdQwkx91597980063635.jpeg' },
    	{ name: '3.jpeg', key: 'LyfrK9JXss1597980063635.jpeg' },
    	{ name: '4.jpeg', key: 'VZqpry58ZS1597980063635.jpeg' },
    	{ name: '5.jpeg', key: '8wG8BzJJ7F1597980063635.jpeg' },
  ])
  
  
  /*
  	ref使用
  	const {getAutoFileKeys} = uploadImageRef.current
  	const keys = getAutoFileKeys()
  */
  
  
  return (
    <Upload
    	ref={uploadImageRef},  // 自动上传只传入ref即可获得新增和删除附件后的文件数据
    	fileList={fileList},  // 初始附件列表
      multiple={true}, // 是否支持多选
    	uploadType='accessory',  // 上传附件（accessory），上传图片（picture）
    	length={6},  // 允许最大上传数量
      isDownload={true}, // 是否支持下载
      imgBaseUrl='https://images.mogulinker.com',  // 文件/图片基准路径
			autoUpload={false},   // 是否自动上传到七牛
    />
  )
}
  
ReactDOM.render(<TestUpload />, mountNode);
```





**上传图片示例**

Demo01-不自动上传

```javascript
import MgUpload from 'MgUpload';

const TestUpload = (props) => {
  const uploadImageRef = useRef()
  // 上传图片fileList格式如下
  const [fileList,setFileList] = useState([
    'fT9je2IQin1597980063634.jpeg', 
    'iXmVdQwkx91597980063635.jpeg', 
    'LyfrK9JXss1597980063635.jpeg', 
    'VZqpry58ZS1597980063635.jpeg', 
    '8wG8BzJJ7F1597980063635.jpeg'
  ])
  
  const handleChange = (addfiles, files) => {
    // 自定义上传图片
    // addfiles新选择的图片
    // files初始的和新选择的图片
    setFileList([...fileList, ...addfiles])
  }

   const handleRemove = (file, files) => {
     // 自定义上传图片
     // file是上删除的文件
     // files是删除后剩余的文件
     setFileList(files)
   }
  
  
  return (
    <Upload
    	handleChange={handleChange},
      handleRemove={handleRemove},
    	ref={uploadImageRef},  // 自动上传只传入ref即可获得新增和删除附件后的文件数据
    	fileList={fileList},  // 初始附件列表
      multiple={true}, // 是否支持多选
    	uploadType='picture',  // 上传附件（accessory），上传图片（picture）
    	length={6},  // 允许最大上传数量
      imgBaseUrl='https://images.mogulinker.com',  // 文件/图片基准路径
			autoUpload={false},   // 是否自动上传到七牛
    />
  )
}
  
ReactDOM.render(<TestUpload />, mountNode);
```



Demo02-自动上传

```javascript
import MgUpload from 'MgUpload';

const TestUpload = (props) => {
  const uploadImageRef = useRef()
  // 上传附件fileList格式如下
  const [fileList,setFileList] = useState([
    'fT9je2IQin1597980063634.jpeg', 
    'iXmVdQwkx91597980063635.jpeg', 
    'LyfrK9JXss1597980063635.jpeg', 
    'VZqpry58ZS1597980063635.jpeg', 
    '8wG8BzJJ7F1597980063635.jpeg'
  ])
  
  
  /*
  	ref使用
  	const {getAutoFileKeys} = uploadImageRef.current
  	// 直接获取所有的keys
  	const keys = getAutoFileKeys()
  */
  
  
  return (
    <Upload
    	ref={uploadImageRef},  // 自动上传只传入ref即可获得新增和删除附件后的文件数据
    	fileList={fileList},  // 初始图片列表
      multiple={true}, // 是否支持多选
    	uploadType='picture',  // 上传附件（accessory），上传图片（picture）
    	length={6},  // 允许最大上传数量
      imgBaseUrl='https://images.mogulinker.com',  // 文件/图片基准路径
			autoUpload={true}   // 是否自动上传到七牛
    />
  )
}
  
ReactDOM.render(<TestUpload />, mountNode);
```

