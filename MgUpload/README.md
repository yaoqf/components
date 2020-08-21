## 1、引入组件

``` js
import MgUpload from '@/components/MgUpload';
```

## API

| 参数           | 说明               |           类型            | 默认值  |
| -------------- | ------------------ | :-----------------------: | :-----: |
| accept         | 接受上传的文件类型 |          String           |   无    |
| multiple       | 是否支持多选文件   |          Boolean          |  false  |
| uploadType     | 上传文件的类型     | String(picture/accessory) | picture |
| isPreview      | 是否支持预览效果   |          Boolean          |  false  |
| fileList       | 已上传文件列表     |           Array           |   []    |
| length         | 允许最大上传数量   |          Number           |   30    |
| autoUoload     | 是否自动上传到七牛 |          Boolean          |  true   |
| isDownload     | 是否支持下载       |          Boolean          |  false  |
|                |                    |                           |         |
|                |                    |                           |         |
|                |                    |                           |         |
| handleChange   | 选择图片的回调     |       Fun(fileList)       |    -    |
| handleRemove   | 点击移除文件的回调 |         Fun(file)         |    -    |
| handleDownload | 附件点击下载的回调 |         Fun(file)         |    -    |
| beforeUoload   | 上传之前的回调     |    Fun(file,fileList)     |    -    |
|                |                    |                           |         |
|                |                    |                           |         |
|                |                    |                           |         |
|                |                    |                           |         |



