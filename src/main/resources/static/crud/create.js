$(document).ready(function () {

    insertNewUserTab_html();

});

function insertNewUserTab_html() {

    let newUserTab_html = `
                <!-- HTML вкладки New user начало-->
                <div class="tab-pane fade" id="new" role="tabpanel" aria-labelledby="new-tab">
                    <h5 class="d-flex ml-3 mt-1">Add new user</h5>
                    <div class="container-fluid bg-white px-5 py-3 vh-100 text-center">
                
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6">
                
                                <form id="add-new-user-form">
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="name">Name</label>
                                        <input type="text"
                                               name="name"
                                               class="form-control bg-warning required"
                                               id="name"
                                               placeholder="Name">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="surname">Surname</label>
                                        <input type="text"
                                               name="surname"
                                               class="form-control bg-warning required"
                                               id="surname"
                                               placeholder="Surname">                                         
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="phone">Phone</label>
                                        <input type="text"
                                               name="phone"
                                               class="form-control bg-warning required"
                                               id="phone"
                                               placeholder="Phone">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="email">Email</label>
                                        <input type="email"
                                               name="email"
                                               class="form-control bg-warning required"
                                               id="email"
                                               placeholder="Email, use pattern user@domain.com required"
                                               minlength="5">
                                    </div>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <div class="form-group">
                                        <label class="font-weight-bold required" for="age">Age</label>
                                        <input type="text"
                                               name="age"
                                               class="form-control bg-warning"
                                               id="age"
                                               placeholder="Age">
                                    </div>
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="password">Password</label>
                                        <input type="password"
                                               class="form-control required"
                                               name="password"
                                               id="password"
                                               placeholder="Password">
                                    </div>
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="roles">Roles</label>
                                        <select multiple size="2" class="form-control required" id="roles"
                                                name="rolesNames">
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <button id='button-create-user' class='btn btn-success'>Add new user</button>
                                    </div>
                                    
                                </form>
                                
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                    </div>
                
                </div>
                <!--HTML вкладки New user конец-->
`;

    // Добавляем HTML вкладки New user в Базовый HTML
    $("#myTabContent").append(newUserTab_html);

    getRolesList();


    //  Получение данных формы ============================== начало
    const createUserButton = document.getElementById("button-create-user");

    // Генерим userData из формы для последующего преобразования в json
    const getUserDataFromForm = () => {
        const form = document.getElementById("add-new-user-form");

        const {name, age, password, roles} = form;

        let rolesArr = [];

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].selected) {
                rolesArr.push(roles[i].value);
            }
        }

        let userData = {
            name: name.value,
            age: age.value,
            password: password.value,
            rolesNames: rolesArr
        };

        return userData;
    };

    const toJson = function (event) {
        event.preventDefault();

        const user = getUserDataFromForm();

        let json = JSON.stringify(user);
        console.log(json);

        // отправка данных формы в API
        $.ajax({
            url: "/api/admin/users",
            type: "POST",
            contentType: 'application/json',
            data: json,
            success: function (result) {
                // юзер был создан, вернуться к списку юзеров
                showAdminPanel();
                insertNewUserTab_html();
            },
            error: function (xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });
    };
//  Получение данных формы ============================== конец
    createUserButton.addEventListener('click', toJson);
};

// Получение списка ролей и добавление их в форму для нового юзера ================ начало
function getRolesList() {

    let options_html = '';

    $.getJSON("/api/users/new", function (blankUser) {
        console.log('Add rolesList to New user form ============ ');
        for (let i = 0; i < blankUser.roles.length; i++) {
            options_html += `<option>${blankUser.roles[i].role}</option>`;
        }
        console.log(options_html);
        $("#roles").append(options_html);
        // $("#roles").prop("required", true);

    });
}
