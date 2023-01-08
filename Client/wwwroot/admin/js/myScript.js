let table = $('#myTable').DataTable({
    ajax: {
        url: "https://localhost:7234/api/Employees",
        dataType: "Json",
        dataSrc: "data"
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
                return `<a type="button" onclick="Delete(\'${data}\')" class="text-danger font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Delete</a>`
            }
        }
    ]
});

console.log("test");
$(document).ready(function () {
    $("#AddEmployeeForm").submit(function (e) {
        e.preventDefault()
        Insert()
    });
});

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
        url: "https://localhost:7234/api/Employees",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(employee),
    }).done((result) => {
        console.log("success");
        $("#modal-form-insert").modal("hide");
        Swal.fire({
            text: 'New Employee Created!',
            icon: 'success',
            timer: 5000,
            timerProgressBar: true
        });
        table.ajax.reload()
    }).fail((error) => {
        console.log("failed");
        $("#modal-form-insert").modal("hide");
        Swal.fire({
            text: 'Error Creating Project!',
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
                url: `https://localhost:7234/api/Employees/${id}`,
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