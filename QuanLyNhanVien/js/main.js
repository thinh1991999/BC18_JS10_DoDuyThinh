var nhanVienList = [];

// lay du lieu tu storage
const nvListStorage = localStorage.getItem("nvList");
if (nvListStorage) {
  const arr = JSON.parse(nvListStorage);
  nhanVienList = [...arr];
  renderInfo();
}

// Thêm nhan vien
function themNhanVien() {
  const addBtn = document.querySelector(".add-btn");
  if (addBtn) {
    addBtn.onclick = () => {
      const messSuccess = document.querySelector(".mess-sucess");
      const maNv = document.querySelector("#mnv").value;
      const hoTen = document.querySelector("#hoTen").value;
      const email = document.querySelector("#email").value;
      const date = document.querySelector("#date").value;
      const chucVu = document.querySelector("#chucVu").value;
      const newNV = new NhanVien(maNv, hoTen, email, date, chucVu);
      const valid =
        checkRong(maNv, ".mess-mnv") &
        checkRong(hoTen, ".mess-hoTen") &
        checkEmailValid(email, ".mess-email") &
        checkRong(email, ".mess-email") &
        checkRong(date, ".mess-date") &
        checkRong(chucVu, ".mess-chucVu") &
        checkTrungMaNv(maNv, nhanVienList, ".mess-mnv");

      if (valid) {
        messSuccess.innerHTML = "Thêm nhân viên mới thành công!";
        nhanVienList.push(newNV);
        renderInfo();
        localStorage.setItem("nvList", JSON.stringify(nhanVienList));
        clearInputAll();
        deleteNv();
        showEditNv();
      } else {
        messSuccess.innerHTML = "";
      }
    };
  }
}

// render data
function renderInfo() {
  const infoBody = document.querySelector(".info-body");
  infoBody.innerHTML = ``;
  nhanVienList.forEach((item) => {
    const { maNv, hoTen, email, ngaySinh, chucVu } = item;
    infoBody.innerHTML += `<tr class="info-nv">
                                <th>${maNv}</th>
                                <td>${hoTen}</td>
                                <td>${email}</td>
                                <td>${ngaySinh}</td>
                                <td>${chucVu}</td>
                                <td>
                                <button type="button" class="btn btn-info edit"  data-toggle="modal"
                                data-target="#editNV">Edit</button>
                                <button type="button" class="btn btn-danger delete">Delete</button>
                                </td>
                            </tr>`;
  });
  deleteNv();
  showEditNv();
  searchNvByName();
}

// Xóa mess khi focus input
function clearMessFocus(input, span) {
  const inputBox = document.querySelector(`${input}`);
  const sucessMess = document.querySelector(".mess-sucess");
  const sucessMessEdit = document.querySelector(".mess-sucess-edit");
  inputBox.onfocus = () => {
    const mess = document.querySelector(`${span}`);
    mess.innerHTML = "";
    sucessMess.innerHTML = "";
    sucessMessEdit.innerHTML = "";
  };
}

// kich hoạt xóa tất cả mess khi focus
function clearMessFocusAll() {
  clearMessFocus("#mnv", ".mess-mnv");
  clearMessFocus("#hoTen", ".mess-hoTen");
  clearMessFocus("#email", ".mess-email");
  clearMessFocus("#date", ".mess-date");
  clearMessFocus("#chucVu", ".mess-chucVu");
  clearMessFocus("#mnv-edit", ".mess-mnv-edit");
  clearMessFocus("#hoTen-edit", ".mess-hoTen-edit");
  clearMessFocus("#email-edit", ".mess-email-edit");
  clearMessFocus("#date-edit", ".mess-date-edit");
  clearMessFocus("#chucVu-edit", ".mess-chucVu-edit");
}

// CLear tất cả input
function clearInputAll() {
  const inputArr = [
    "#mnv",
    "#hoTen",
    "#email",
    "#date",
    "#chucVu",
    "#searchInput",
  ];
  inputArr.forEach((item) => {
    const input = document.querySelector(`${item}`);
    input.value = "";
  });
}

// CLear tất cả mess
function clearMessAll() {
  const messArr = [
    ".mess-mnv",
    ".mess-hoTen",
    ".mess-email",
    ".mess-date",
    ".mess-chucVu",
    ".mess-sucess",
    ".mess-mnv-edit",
    ".mess-hoTen-edit",
    ".mess-email-edit",
    ".mess-date-edit",
    ".mess-chucVu-edit",
    ".mess-sucess-edit",
  ];
  messArr.forEach((item) => {
    const mess = document.querySelector(`${item}`);
    mess.innerHTML = "";
  });
}

// Xóa nhân viên
function deleteNv() {
  const deleteBtnAll = document.querySelectorAll(".delete");
  const searchInput = document.querySelector("#searchInput");
  deleteBtnAll.forEach((item, index) => {
    item.onclick = () => {
      nhanVienList.splice(index, 1);
      renderInfo();
      deleteNv();
      showEditNv();
      searchInput.value = ``;
      localStorage.setItem("nvList", JSON.stringify(nhanVienList));
    };
  });
}

// Show modal edit nhan vien
function showEditNv() {
  const editAll = document.querySelectorAll(".edit");
  editAll.forEach((item, index) => {
    item.onclick = () => {
      const maNvInput = document.querySelector("#mnv-edit");
      const hoTenInput = document.querySelector("#hoTen-edit");
      const emailInput = document.querySelector("#email-edit");
      const dateInput = document.querySelector("#date-edit");
      const chucVuInput = document.querySelector("#chucVu-edit");
      const { maNv, hoTen, email, ngaySinh, chucVu } = nhanVienList[index];
      maNvInput.value = maNv;
      hoTenInput.value = hoTen;
      emailInput.value = email;
      dateInput.value = ngaySinh;
      chucVuInput.value = chucVu;
      saveEditNv(index);
    };
  });
}

// Save edit thông tin nhân viên
function saveEditNv(index) {
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) {
    saveBtn.onclick = () => {
      const messSuccessEdit = document.querySelector(".mess-sucess-edit");
      const searchInput = document.querySelector("#searchInput");
      const maNv = document.querySelector("#mnv-edit").value;
      const hoTen = document.querySelector("#hoTen-edit").value;
      const email = document.querySelector("#email-edit").value;
      const date = document.querySelector("#date-edit").value;
      const chucVu = document.querySelector("#chucVu-edit").value;
      const valid =
        checkRong(maNv, ".mess-mnv-edit") &
        checkRong(hoTen, ".mess-hoTen-edit") &
        checkRong(email, ".mess-email-edit") &
        checkRong(date, ".mess-date-edit") &
        checkRong(chucVu, ".mess-chucVu-edit") &
        checkTrungMaNvEdit(maNv, nhanVienList, ".mess-mnv-edit", index) &
        checkEmailValid(email, ".mess-email-edit");
      if (valid) {
        messSuccessEdit.innerHTML = "Chỉnh sửa thành công!";
        searchInput.value = "";
        const newNv = new NhanVien(maNv, hoTen, email, date, chucVu);
        nhanVienList.splice(index, 1, newNv);
        localStorage.setItem("nvList", JSON.stringify(nhanVienList));
        renderInfo();
        deleteNv();
        showEditNv();
      }
    };
  }
}

// tim kiem nv bang ten
function searchNvByName() {
  const searchBtn = document.querySelector(".search");
  searchBtn.onclick = () => {
    const valueSearch = document.querySelector("#searchInput").value;
    const infoNvAll = document.querySelectorAll(".info-nv");
    if (valueSearch.trim() === "") {
      renderInfo();
      return;
    }
    const indexSearch = [];
    nhanVienList.forEach((item, index) => {
      const { hoTen } = item;
      if (hoTen.includes(valueSearch)) {
        indexSearch.push(index);
      }
    });
    infoNvAll.forEach((item, index) => {
      if (!indexSearch.includes(index)) {
        item.style.display = "none";
      } else {
        item.style.display = "";
      }
    });
  };
}

// kich hoat functions
themNhanVien();
clearMessFocusAll();
deleteNv();
showEditNv();
searchNvByName();
