function checkRong(value, span) {
  const mess = document.querySelector(`${span}`);
  if (value.trim().length === 0) {
    mess.innerHTML = `Trường này không được để trống!`;
    return false;
  }
  return true;
}

function checkTrungMaNv(value, arr, span) {
  let valid = true;
  arr.forEach((item) => {
    const { maNv } = item;
    if (maNv === value) {
      const mess = document.querySelector(`${span}`);
      mess.innerHTML = `Mã nhân viên này đã tồn tại!`;
      valid = false;
    }
  });
  return valid;
}

function checkEmailValid(value, span) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!value.toLowerCase().match(re)) {
    const mess = document.querySelector(`${span}`);
    mess.innerHTML = `Trường này phải là email!`;
    return false;
  }
  return true;
}

function checkTrungMaNvEdit(value, arr, span, index) {
  let valid = true;
  const { maNv } = arr[index];
  if (value === maNv) return true;
  arr.forEach((item) => {
    const { maNv } = item;
    if (maNv === value) {
      const mess = document.querySelector(`${span}`);
      mess.innerHTML = `Mã nhân viên này đã tồn tại!`;
      valid = false;
    }
  });
  return valid;
}
