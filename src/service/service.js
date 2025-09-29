import { jwtDecode } from "jwt-decode";

// Xóa dấu tiếng Việt
export function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "-"); // Nên dùng regex để thay tất cả khoảng trắng
}

// Kiểm tra token hết hạn
export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export function checkLogin() {
  const token = sessionStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return false;
  }
  return true;
}
export function formatPriceVND(price) {
  const number = parseFloat(price);
  if (isNaN(number)) return price;
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
