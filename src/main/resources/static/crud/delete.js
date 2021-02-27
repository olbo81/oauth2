$(document).ready(function () {
    let userIdForDelete;
    $(document).on('click', '.delete-btn', function () {
        console.log('Pressing Delete-button ============================================')

        userIdForDelete = $(this).closest('tr').find('td[data-id]').text();
        console.log(userIdForDelete);

        $.getJSON("/api/admin/users/" + userIdForDelete, function (user) {

            $('#deleteId').val(user.id);
            $('#deleteName').val(user.name);
            $('#deleteSurname').val(user.surname);
            $('#deletePhone').val(user.phone);
            $('#deleteEmail').val(user.email);
            $('#deletePassword').val(user.password);
            $('#deleteLabel').text('Delete ' + user.id);

            let options_html = "";

            let userRoles = [];
            for (let i = 0; i < user.roles.length; i++) {
                userRoles.push(user.roles[i].role);
            }
            console.log(userRoles + '-----------------------------------');

            for (let i = 0; i < userRoles.length; i++) {
                options_html += `<option>${userRoles[i]}</option>`;
            }
            $("#deleteRoles").empty().append(options_html);
        });
    });

    const deleteUserButton = document.getElementById("button-delete-user");

    // Функция генерации userData из формы (получаем данные юзера из формы) для последующего преобразования в json
    function getUserDataFromForm() {
        const form = document.getElementById("edit-user-form");
        console.log(form);
        const {name, surname, phone, email, password, userRoles} = form;

        let rolesArr = [];

        for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].selected) {
                rolesArr.push(userRoles[i].value);
            }
        }

        let userData = {
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
            url: "/api/admin/users/" + userIdForDelete,
            type: "DELETE",
            contentType: 'application/json',
            data: json,
            success: function (result) {
                // юзер был отредактирован, вернуться к списку юзеров
                showAdminPanel();
                insertNewUserTab_html();
                $('#modal-delete').modal('hide');

            },
            error: function (xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });
    };

    deleteUserButton.addEventListener('click', userDataToJson);

});