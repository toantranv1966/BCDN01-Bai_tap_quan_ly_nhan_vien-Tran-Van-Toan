/**
 * Các chức năng :
 * 1/ Thêm nhân viên
 * 2/ Xóa nhân viên
 * 3/ Cập nhật nhân viên
 */

// Biến toàn cục (Global Variable)
var dsnv = new DanhSachNhanVien();

var validation = new Validation();

// Hàm rút gọn cú pháp document.getElementById
function getELE(id){
    return document.getElementById(id);
}

// Hàm lưu dữ liệu xuống trình duyệt web
function setLocalStorage(){
    localStorage.setItem("DSNV",JSON.stringify(dsnv.mangNV));
}

// Hàm lấy dữ liệu từ Local Storage
function getLocalStorage(){
    if(localStorage.getItem("DSNV") != null){
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienthiTable(dsnv.mangNV);
    }
}
getLocalStorage();

function hienthiTable(mang){
    content = "";
    // Duyệt mãng để lấy thông tin từng nv trong mãng

    mang.map(function(item,index){
        content += `<tr>
        <td>${item.taiKhoanNV}</td>
        <td>${item.hoTenNV}</td>
        <td>${item.email}</td>
        <td>${item.ngayLam}</td>
        <td>${item.chucVu}</td>
        <td>${item.tongLuong}</td>
        <td>${item.loaiNV}</td>
        <td>
        <button class="btn btn-danger" onclick="xoaNV('${item.taiKhoanNV}')">Xóa</button>
        <button class="btn btn-info" onclick="xemChiTietNV('${item.taiKhoanNV}')">Xem</button>
    </td>
        </tr> `
    })
    getELE("tableDanhSach").innerHTML = content;
}

// Load Form thêm nhân viên & vô hiệu button btnCapNhat
function loadForm(){
    $('#myModal').modal(true);
    
    document.getElementById("btnCapNhat").disabled = true;
    document.getElementById("tbTKNV").className = "sp-thongbao";
    document.getElementById("tbTen").className = "sp-thongbao";
    document.getElementById("tbEmail").className = "sp-thongbao";
    document.getElementById("tbMatKhau").className = "sp-thongbao";
    document.getElementById("tbNgay").className = "sp-thongbao";
    document.getElementById("tbLuongCB").className = "sp-thongbao";
    document.getElementById("tbChucVu").className = "sp-thongbao";
    document.getElementById("tbGiolam").className = "sp-thongbao";
}

document.getElementById("btnThem").onclick = loadForm;

function themNV(){

    var taiKhoanNV = getELE("tknv").value;
    var hoTenNV = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngaylam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var giolam = getELE("gioLam").value;

// Validation (Kiểm tra dữ liệu trước khi nhập vào)

var isValid = true;

// Kiểm tra tài khoản nhân viên

isValid = validation.checkEmpty(taiKhoanNV,"tbTKNV","Tài khoản nhân viên không để trống") && validation.checkID(taiKhoanNV,"tbTKNV","Tài khoản nhân viên không được trùng",dsnv.mangNV);

// Kiểm tra họ tên

isValid &= validation.checkName(hoTenNV,"tbTen","Tên nhân viên là ký tự chữ & không để trống");

// Kiểm tra email

isValid &= validation.checkEmail(email,"tbEmail", "Email không đúng định dạng");

// Kiểm tra mật khẩu

isValid &= validation.checkPass(matKhau,"tbMatKhau","Mật khẩu không đúng yêu cầu");

// Kiểm tra ngày làm

isValid &= validation.checkDate(ngaylam,"tbNgay","Ngày làm không để trống");

// Kiểm tra lương cơ bản

isValid &= validation.checkEmpty(luongCB,"tbLuongCB","Lương không để trống") && validation.checkInterger(luongCB,"tbLuongCB","Lương phải là số nguyên") && validation.checkLuongCB(luongCB,"tbLuongCB","Lương không đúng quy định");

// Kiểm tra chức vụ

isValid &= validation.checkDropdown("chucvu","tbChucVu","Bạn chưa chọn chức vụ");

// Kiểm tra giờ làm

isValid &= validation.checkEmpty(giolam,"tbGiolam","Giờ làm không để trống") && validation.checkInterger(giolam,"tbGiolam","Giờ làm là số nguyên") && validation.checkGiolam(giolam,"tbGiolam","Giờ làm không đúng quy định");

if(isValid){
    // Nếu tất cả dữ liệu đều hợp lệ
    // B2 : Lưu thông tin vào lớp Nhân Viên

    var nv = new NhanVien(taiKhoanNV,hoTenNV,email,matKhau,ngaylam,parseInt(luongCB),chucVu,parseInt(giolam));

    // Tính tổng lương
    nv.tongLuong = nv.tinhTongLuong("chucvu");
    
    // Xếp loại nhân viên
    nv.loaiNV = nv.xepLoai();
    
    // B3 : Lưu nv vào danh sách nhân viên
    
    dsnv.themNhanVien(nv);
    
    // Lưu xuống local
    setLocalStorage();
    
    // B4: Hiển thị lên table
    
    hienthiTable(dsnv.mangNV);
    
    }else{
        alert("Dữ liệu không hợp lệ!");
    }
}

// Xóa nhân viên
function xoaNV(taikhoannv){
    dsnv.xoaNV(taikhoannv);
    hienthiTable(dsnv.mangNV)
    setLocalStorage();
}

// Xem chi tiết nhân viên

function xemChiTietNV(taikhoannv){

    loadForm();

    // Vô hiệu button Thêm nhân viên
    document.getElementById("btnThemNV").disabled = true;
    document.getElementById("btnCapNhat").disabled = false;

    getELE("tknv").disabled = true;
    getELE("header-title").innerHTML = "Xem / Sửa nhân viên";

    var viTri = dsnv.timVitri(taikhoannv);
    var nv = dsnv.mangNV[viTri];

    getELE("tknv").value = nv.taiKhoanNV;
    getELE("name").value = nv.hoTenNV;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCoban;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLam;
}

function capNhatNV(){

    var taiKhoanNV = getELE("tknv").value;
    var hoTenNV = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngaylam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var giolam = getELE("gioLam").value;
    
    // Validation (Kiểm tra dữ liệu trước khi cập nhật)

var isValid = true;

// Kiểm tra họ tên

isValid &= validation.checkName(hoTenNV,"tbTen","Tên nhân viên là ký tự chữ & không để trống");

// Kiểm tra email

isValid &= validation.checkEmail(email,"tbEmail", "Email không đúng định dạng");

// Kiểm tra mật khẩu

isValid &= validation.checkPass(matKhau,"tbMatKhau","Mật khẩu không đúng yêu cầu");

// Kiểm tra ngày làm

isValid &= validation.checkDate(ngaylam,"tbNgay","Ngày làm không để trống");

// Kiểm tra lương cơ bản

isValid &= validation.checkEmpty(luongCB,"tbLuongCB","Lương không để trống") && validation.checkInterger(luongCB,"tbLuongCB","Lương phải là số nguyên") && validation.checkLuongCB(luongCB,"tbLuongCB","Lương không đúng yêu cầu");

// Kiểm tra chức vụ

isValid &= validation.checkDropdown("chucvu","tbChucVu","Bạn chưa chọn chức vụ");

// Kiểm tra giờ làm

isValid &= validation.checkEmpty(giolam,"tbGiolam","Giờ làm không để trống") && validation.checkInterger(giolam,"tbGiolam","Giờ làm phải là số nguyên") && validation.checkGiolam(giolam,"tbGiolam","Giờ làm không đúng yêu cầu");

if(isValid){
    // Nếu tất cả dữ liệu đều hợp lệ
    // B2 : Cập nhật thông tin vào lớp Nhân Viên

    var nv = new NhanVien(taiKhoanNV,hoTenNV,email,matKhau,ngaylam,parseFloat(luongCB),chucVu,parseFloat(giolam));

    nv.tongLuong = nv.tinhTongLuong("chucvu");
    nv.loaiNV = nv.xepLoai();

    dsnv.capNhatNhanVien(nv);
    hienthiTable(dsnv.mangNV);
    setLocalStorage();

}else{
    alert("Dữ liệu không hợp lệ!");
}

}

// Tìm kiếm nhân viên theo loại nhân viên

function timKiemTheoLoai(tuKhoaLoai){
    var tuKhoaLoai = getELE("searchName").value;
    var mangKQ = dsnv.timKiem(tuKhoaLoai);
    hienthiTable(mangKQ);
}

document.getElementById("searchName").addEventListener("keyup",timKiemTheoLoai);

function closeFormNhap(){
    getELE("header-title").innerHTML = "Thêm nhân viên";
    document.getElementById("btnThemNV").disabled = false;

    getELE("formQLNV").reset();

    if(getELE("tknv").disabled == true){
       return getELE("tknv").disabled = false;
    }else 
    {
        return getELE("tknv").disabled = false;
    }

    $('#myModal').modal(false);
}   