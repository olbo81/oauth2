jQuery(function ($) {
  showOneUser();
});

function showOneUser () {
  $.getJSON("/api/user/", function (user) {
    let oneUser = user;
     console.log(oneUser + ' Юзер, полученный с бэка');
    let roles = [];
    for (let i = 0; i < oneUser.roles.length; i++) {
      roles.push(oneUser.roles[i].role.substring(5));
    }
    let rolesList = roles.join(" ");
    console.log(rolesList + ' Список названий ролей юзера, полученного с бэка');
    let navbar_html = `
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
              <span>
                  <span class="navbar-brand font-weight-bold">${oneUser.email}</span>
                  <span class="navbar-brand font-weight-regular">with roles: ${rolesList}</span>
              </span>
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <small><a class="nav-link" href="/logout">Logout</a></small>
                  </li>
              </ul>
          </nav>`;

    $("#navbar-content-one-user").html(navbar_html);

    $('#oneUserId').text(oneUser.id);
    $('#oneUserName').text(oneUser.name);
    $('#oneUserSurname').text(oneUser.surname);
    $('#oneUserPhone').text(oneUser.phone);
    $('#oneUserEmail').text(oneUser.email);

    let roles_html = "";
    for (let i = 0; i < roles.length; i++) {
      roles_html += `<div>${roles[i]}</div>`;
    }

    $('#oneUserRolesNames').empty().append(roles_html);
  })
}
