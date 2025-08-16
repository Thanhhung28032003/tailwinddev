// validation.js
// Kiểm tra form cho trang xe

function validateCarForm() {
	const name = document.getElementById('carName');
	if (!name || name.value.trim() === '') {
		alert('Vui lòng nhập tên xe!');
		return false;
	}
	return true;
}
