$(document).ready(function () {
    let userIdForEdit;
    $(document).on('click', '.edit-btn', function () {
        console.log('Pressing Edit-button ============================================')

        userIdForEdit = $(this).closest('tr').find('td[data-id]').text();
        console.log(userIdForEdit);

        $.getJSON("/api/admin/users/" + userIdForEdit, function (user) {

            $('#showId').val(user.id);
            $('#editName').val(user.name);
            $('#editSurname').val(user.surname);
            $('#editPhone').val(user.phone);
            $('#editEmail').val(user.email);
            // $('#editPassword').val(user.password);
            $('#editPassword').val("");
            $('#editLabel').text('Edit ' + user.email);

            let options_html = "";

            let userRoles = [];
            for (let i = 0; i < user.roles.length; i++) {
                userRoles.push(user.roles[i].role);
            }
            console.log(userRoles + '-----------------------------------');
            console.log(allRolesArr + '-----------------------------------');


            for (let i = 0; i < allRolesArr.length; i++) {
                if (allRolesArr[i] === userRoles[0] || allRolesArr[i] === userRoles[1]) {
                    options_html += `<option selected>${allRolesArr[i]}</option>`;
                } else
                    options_html += `<option>${allRolesArr[i]}</option>`;
            }
            $("#editRoles").empty().append(options_html);
        });
    });

    const updateUserButton = document.getElementById("button-update-user");

    // Функция генерации userData из формы (получаем данные юзера из формы) для последующего преобразования в json
    function getUserDataFromForm() {
        const form = document.getElementById("edit-user-form");
        console.log(form);
        const {id, name, surname, phone, email, password, userRoles} = form;

        let rolesArr = [];

        for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].selected) {
                rolesArr.push(userRoles[i].value);
            }
        }

        let userData = {
            id: id.value,
            name: name.value,
            surname: surname.value,
            phone: phone.value,
            email: email.value,
            password: password.value,
            rolesNames: rolesArr
        };

        return userData;
    };

    const userDataToJson = function (event) {
        event.preventDefault();

        const user = getUserDataFromForm();

        let json = JSON.stringify(user);
        console.log(json);

        // отправка данных формы в API
        $.ajax({
            url: "/api/admin/users/" + userIdForEdit,
            type: "PUT",
            contentType: 'application/json',
            data: json,
            success: function (result) {
                // юзер был отредактирован, вернуться к списку юзеров
                showAdminPanel();
                insertNewUserTab_html();
                $('#modal-edit').modal('hide');

            },
            error: function (xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });
    };

    updateUserButton.addEventListener('click', userDataToJson);

});

function insertUpdate_html(userId) {

    let update_html = `
                <!-- Edit modal start-->
<div class="modal fade" th:id="${'Edit' + userId}" tabindex="-1" role="dialog"
     th:aria-labelledby="${'Edit' + userId + 'Label'}" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" th:id="${'Edit' + userId + 'Label'}" th:text="${'Edit ' + userId}">Edit user</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!--Body (edit) start-->
            <div class="modal-body text-center">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <form id="edit-user-form" th:action="@{/admin/users/{userId}}"
                              th:method="post"
                              th:id="${'EditForm' + userId}">
                              
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="showId">ID</label>
                                <input type="text"
                                       name="id"
                                       id="showId"
                                       class="form-control"
                                       th:value="${userId}"
                                       readonly>
                            </div>
                            
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editName">Name</label>
                                <input type="text"
                                       name="name"
                                       id="editName"
                                       class="form-control"
                                       th:value="${'user.name'}"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editSurname">Surname</label>
                                <input type="text"
                                       name="surname"
                                       id="editSurname"
                                       class="form-control"
                                       th:value="${'user.surname'}"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editPhone">Phone</label>
                                <input type="text"
                                       name="phone"
                                       id="editPhone"
                                       class="form-control"
                                       th:value="${'user.phone'}"
                                       required>
                            </div>
                            
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editEmail">Email</label>
                                <input type="email"
                                       name="email"
                                       id="editEmail"
                                       class="form-control"
                                       th:value="${'user.email'}"
                                       minlength="5"
                                       required>
                            </div>  
 
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editPassword">Password</label>
                                <input type="password"
                                       class="form-control"
                                       name="password"
                                       id="editPassword"
                                       value=""
                                       placeholder="New password">
                            </div>
                            
                            <div class="form-group">
                                <label class="font-weight-bold"
                                       for="editRoles">Roles</label>
                                <select multiple size="3" class="form-control"  id="editRoles"
                                        name="userRoles" required>
                                    <option>
                                    
                                    </option>
                                </select>
                            </div>
                            
                        </form>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
            <!--Body (edit) end-->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" th:form="${'EditForm' + 'user.id'}"
                        class="btn btn-primary">Edit
                </button>
            </div>
        </div>
    </div>
</div>
<!-- Edit modal end-->
`;

    $("#").html(update_html);
};


