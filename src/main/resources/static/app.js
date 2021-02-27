let allRolesArr = [];

jQuery(function ($) {
	let app_html = `
		<div id='navbar-content'></div>
		
		<div id='page-content'></div>
						`;
	navbarFilling();
	getAllRolesList();
	$("#app").html(app_html);
});

function navbarFilling() {
	$.getJSON("/api/user", function (data) {
		let roles = [];
		for (let i = 0; i < data.roles.length; i++) {
			roles.push(data.roles[i].role.substring(5))
		}
		let rolesList = roles.join(" ");
		let navbar_html = `
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    <span>
                        <span class="navbar-brand font-weight-bold">${data.email}</span>
                        <span class="navbar-brand font-weight-regular">with roles: ${rolesList}</span>
                    </span>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <small><a class="nav-link" href="/logout">Logout</a></small>
                        </li>
                    </ul>
                </nav>`;
        $("#navbar-content").html(navbar_html);
	});
}

function getAllRolesList() {
	$.getJSON("/api/users/new", function (data) {
		for (let i = 0; i < data.roles.length; i++) {
			allRolesArr.push(data.roles[i].role);
		}
		console.log(allRolesArr);
	});
}