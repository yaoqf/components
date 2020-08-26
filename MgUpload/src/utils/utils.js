import axios from 'axios';
function uuids() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-';
  const uuid = s.join('');
  return uuid;
}

function getBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(xhr.response);
    }
  };
  xhr.send();
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement('a');
    var body = document.querySelector('body');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    body.appendChild(link);
    link.click();
    body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };
}

function download(url, filename) {
  getBlob(url, function (blob) {
    saveAs(blob, filename);
  });
};

function getRandomStr(length = 5) {
  const sourceStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ret = '';
  for (let i = 0; length > i; i += 1) {
    ret += sourceStr.charAt(Math.floor(Math.random() * sourceStr.length));
  }
  return ret;
}

const handleUpload = async (fileList) => {
  if (fileList.length === 0) {
    return [];
  }
  // const token = await dispatch({ type: 'common/getQiniuToken' });
  const token = "SZdLpkTZbnBNqtRVogocYy9v5qZNmyqrYOMq75p3:AHD6WkumY_rF9VoGyWb-Iu2NiuI=:eyJzY29wZSI6Im1nbGluayIsImRlYWRsaW5lIjoxNTk4NDEyNjM4fQ=="

  // 获取已存在的文件的key
  // const existKeys = fileList.filter(item => item.key).map(item => item.key);
  // 获取新增的文件
  const addImageList = fileList.filter(item => !item.key);
  // 获取所有新增的promise
  const promises = addImageList.map(file => {
    // add by Moriaty at 2020-8-16 start
    const { originFileObj, type } = file;
    // 获取后缀
    const suffix = type.split('/').reverse()[0];

    const formData = new FormData();
    const key = getRandomStr(10) + new Date().getTime();
    formData.append('file', originFileObj);
    formData.append('token', token);
    formData.append('key', `${key}.${suffix}`);
    return axios('https://up.qbox.me/', {
      method: 'POST',
      data: formData,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }).then(res => ({ ...res.data, name: file.name || '' }));
  });
  const imageSource = await Promise.all(promises);
  console.log(imageSource)
  return imageSource
  // 获取新增图片的keys
  // const addImageKeys = imageSource.map(item => {
  //   const { key } = item;
  //   return `${key}`;
  // });
  // // 获取所有图片keys
  // const imageKeysArr = existKeys.concat(addImageKeys);
  // return imageKeysArr;
};

export { uuids, download, handleUpload }