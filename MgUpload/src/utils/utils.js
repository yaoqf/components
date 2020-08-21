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

export { uuids, download }