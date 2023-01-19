let table = $('#myTable').DataTable({
    responsive: true,
    dom: '<"row"B><lfrtip>',
    //dom: '<"top"Brf>t<"bottom"pli>',
    buttons: [
        {
            extend: 'excel',
            text: '<i class="fas fa-regular fa-file-excel text-lg"></i>',
            className: 'btn btn-sm btn-success',
            attr: {
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Export to Excel'
            },
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            extend: 'pdf',
            text: '<i class="fas fa-file-pdf text-lg" aria-hidden="true"></i>',
            className: 'btn btn-sm btn-danger',
            attr: {
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Export to PDF'
            },
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7]
            }
        }
    ],
    initComplete: () => {
        var btns = $('.dt-button');
        btns.removeClass('dt-button');

    },
    ajax: {
        type: "GET",
        url: "../Employees/GetAll",
        dataType: "Json",
        dataSrc: ""
    },
    columns: [
        {
            data: "nik",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "firstName",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "lastName",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "phone",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "birthDate",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${moment(data).format('DD/MM/YYYY')}</p>`
            }
        },
        {
            data: "salary",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "email",
            render: function (data, type, row) {
                return `<p class="text-xs mb-0">${data}</p>`
            }
        },
        {
            data: "gender",
            render: function (data, type, row) {
                return data == 0 ? `<p class="text-xs mb-0">Male</p>` : `<p class="text-xs mb-0">Female</p>`

            }
        },
        {
            data: "nik",
            render: function (data) {
                return `<a type="button" id="edit" onclick="Edit(\'${data}\')" class="text-warning font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user" data-bs-toggle="modal" data-bs-target="#modal-form">Edit</a> | <a type="button" onclick="Delete(\'${data}\')" class="text-danger font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">Delete</a>`
            }
        }
    ]
});

$(document).ready(function () {
    $('#EmployeeForm').validate({
        rules: {
            nik: {
                required: true,
                maxlength: 5
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            birthDate: {
                required: true
            },
            salary: {
                required: true
            },
            gender: {
                required: true
            }
        },
        messages: {
            nik: {
                required: "NIK is Required.",
                maxlength: "Max length is 5"
            },
            firstname: {
                required: "First Name is Required."
            },
            lastname: {
                required: "Last Name is Required."
            },
            email: {
                required: "Email is Required.",
                email: "Form must be email!"
            },
            phone: {
                required: "Phone Number is Required."
            },
            birthDate: {
                required: "Birth Date is Required."
            },
            salary: {
                required: "Salary is Required."
            },
            gender: {
                required: "Gender is Required."
            }
        },
        submitHandler: () => {
            if (!check) {
                Insert()
            } else {
                Update()
            }
        }
    });
});

let check

const Add = () => {
    check = false
    $('#nik').attr("disabled", false);
}

const Edit = (id) => {
    check = true
    $.ajax({
        url: `../Employees/Get/${id}`
    }).done((result) => {
        $('#nik').val(result.nik)
        $('#nik').attr("disabled", true);
        $('#firstname').val(result.firstName)
        $("#lastname").val(result.lastName)
        $("#email").val(result.email)
        $("#phone").val(result.phone)
        birthDate = (result.birthDate).substring(0, 10)
        $("#birth_date").val(birthDate)
        $("#salary").val(result.salary)
        $("#gender").val(result.gender)
    })
}

const Update = () => {
    let update_employee = {
        Nik: $('#nik').val(),
        FirstName: $("#firstname").val(),
        LastName: $("#lastname").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        BirthDate: $("#birth_date").val(),
        Salary: parseInt($("#salary").val()),
        Gender: parseInt($("#gender").val())
    }

    console.log(update_employee);

    $.ajax({
        url: "../Employees/Put",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(update_employee),
    }).done((result) => {
        console.log("success update");
        $("#modal-form").modal("hide");
        Swal.fire({
            text: 'Employee has been Updated!',
            icon: 'success',
            timer: 5000,
            timerProgressBar: true
        });
        table.ajax.reload()
    }).fail((error) => {
        console.log("failed update");
        $("#modal-form").modal("hide");
        Swal.fire({
            text: 'Error Updating Employee!',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
    })
}

const Insert = () => {
    let employee = {
        Nik: $('#nik').val(),
        FirstName: $("#firstname").val(),
        LastName: $("#lastname").val(),
        Email: $("#email").val(),
        Phone: $("#phone").val(),
        BirthDate: new Date($("#birth_date").val()).toISOString(),
        Salary: parseInt($("#salary").val()),
        Gender: parseInt($("#gender").val())
    }

    console.log(employee);

    $.ajax({
        url: "../Employees/Post",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(employee),
    }).done((result) => {
        console.log("success");
        $("#modal-form").modal("hide");
        Swal.fire({
            text: 'New Employee Created!',
            icon: 'success',
            timer: 5000,
            timerProgressBar: true
        });
        table.ajax.reload()
    }).fail((error) => {
        console.log("failed");
        $("#modal-form").modal("hide");
        Swal.fire({
            text: 'Error Creating Employee!',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
    })
};

const Delete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You wont able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: `../Employees/Delete/${id}`,
                success: () => {
                    Swal.fire(
                        'Deleted!',
                        'Employee has been deleted.',
                        'success'
                    )
                    table.ajax.reload()
                },
                error: () => {
                    Swal.fire(
                        'Failed!',
                        'Error deleting employee.',
                        'error'
                    )
                }
            })
        }
    })
}