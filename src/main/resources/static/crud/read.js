// jQuery(function ($) {
$(document).ready(function () {

    console.log('Start read.js =============')
    showAdminPanel();
});

//============================================================================

// Функция showAdminPanel() выводит страницу Admin panel со всеми Users (НАЧАЛО)
function showAdminPanel() {
    let admin_panel_html = `
<!--container for the whole page excluding navbar start-->
<div class="container-fluid">
 
    <!--row for both panels (left/right) start-->
    <div class="row">
        <!--container for the_left_side_panel_(vertical_menu) start-->
        <div class="col-sm-2">
            <br>
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    <a href="/admin" class="nav-link active">Admin</a>
                </li>
                <li class="nav-item">
                    <a href="/user" class="nav-link">User</a>
                </li>
            </ul>
        </div>
        <!--container for the_left_side_panel_(vertical_menu) end-->
        <!--container for the_right_side_panel_(tabs) start-->
        <div class="col-sm-10 bg-light px-5 vh-100">
            <br>
            <h1>Admin panel</h1>
            <!--сами вкладки (tabs) без содержимого начало-->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="users-tab" data-toggle="tab" href="#users" role="tab"
                       aria-controls="users" aria-selected="true">Users</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="new-tab" data-toggle="tab" href="#new" role="tab" aria-controls="new"
                       aria-selected="false">New user</a>
                </li>
            </ul>
            <!--сами вкладки (tabs) без содержимого конец-->
            <!--Содержимое вкладок начало-->
            <div class="tab-content" id="myTabContent">
                <!--Содержимое вкладки Users table начало-->
                <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <h5 class="d-flex ml-3 mt-1">All users</h5>
                    <!--сама таблица All users start-->
                    <table class="table table-striped bg-white">
                        <!--шапка таблицы All users start-->
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <!--шапка таблицы All users end-->
                        <tbody id='users-filling'>
                        </tbody>
                    </table>
                    <!--сама таблица All users end-->
                </div>
                <!--Содержимое вкладки Users table конец-->
            </div>
            <!--Содержимое вкладок конец-->
        </div>
        <!--container for the_right_side_panel_(tabs) end-->
    </div>
    <!--row for both panels (left/right) end-->
</div>
<!--container for the whole page excluding navbar end-->
        `;

    $("#page-content").html(admin_panel_html);

    readUsers();
}

// Функция showAdminPanel() выводит страницу Admin panel со всеми Users (КОНЕЦ)

//============================================================================

// Функция readUsers() считывает список юзеров из БД и заполняет таблицу Users (начало)
function readUsers() {
    let users_html;

    // получить список Users из api НАЧАЛО
    $.getJSON("/api/admin/users", function (data) {
        // перебор списка возвращаемых данных:
        // на каждой итерации сначала достаем роли текущего юзера (юзера этой итерации), парсим их, кладем в массив,
        // для красивого вывода джойним массив в список (rollerList), после формируем строку со всеми данными юзера;
        // каждая итерация формирует следующую строку со следующим юзером
        $.each(data, function (key, user) {
            let rolesArr = [];
            for (let i = 0; i < user.roles.length; i++) {
                rolesArr.push(user.roles[i].role.substring(5));
            }
            let rolesList = rolesArr.join(" ");

            // создание новой строки таблицы для каждой записи (для каждого юзера)
            users_html += `
                        <tr>
                            <td data-id>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.phone}</td>
                            <td>${user.email}</td>
                            <td>
                                <div>
                                    <span class="text-uppercase">${rolesList}</span>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-info edit-btn" 
                                        data-toggle="modal"
                                        data-target="#modal-edit">Edit
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger delete-btn"
                                        data-toggle="modal"
                                        data-target="#modal-delete">Delete
                                </button>
                            </td>
<!--Код модалок является частью кода таблицы и строки (tr),
в которой расположены кнопки Edit/Delete (которые вызывают модалки при нажатии на них) 
Код модалок пока убрал! Он будет добавлен соответствующими скриптами. -->
                        </tr>`
        });

        $("#users-filling").html(users_html);
    });
    // получить список Users из api КОНЕЦ
}
// Функция readUsers() считывает список юзеров из БД и заполняет таблицу Users (конец)