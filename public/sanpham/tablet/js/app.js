// app.js
// Xử lý logic hoặc tương tác cho trang xe

function toggleCarDetails(id) {
	const el = document.getElementById(id);
	if (el) {
		el.classList.toggle('hidden');
	}
}
