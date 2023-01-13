//$.ajax({
//    url: "https://localhost:7234/api/Employees"
//}).done((data) => {
//    console.log(data)
//    var gender = data.data.map(x => ({
//        gender: x.gender
//    }));

//    var { genderM, genderF } = gender.reduce((previous, current) => {
//        if (current.gender === 0) {
//            return { ...previous, genderM: previous.genderM + 1 }
//        }
//        else if (current.gender === 1) {
//            return { ...previous, genderF: previous.genderF + 1 }
//        }
//    }, { genderM: 0, genderF: 0 })


$.ajax({
    url: "https://localhost:7234/api/Employees",
}).done((data) => {
    console.log(data);
    var gender = data.data
        .map(x => ({ gender: x.gender }));
    var { genderM, genderF } = gender.reduce((previous, current) => {
        if (current.gender === 0) {
            return { ...previous, genderM: previous.genderM + 1 }
        } if (current.gender === 1) {
            return { ...previous, genderF: previous.genderF + 1 }
        }
    }, { genderM: 0, genderF: 0 })

    //Pie
    var options = {
        series: [genderM, genderF],
        chart: {
            width: 380,
            type: 'donut',
        },
        labels: ["Male", "Female"],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


    //Bar
    var options = {
        series: [{
            name: "Gender",
            data: [genderM, genderF]
        }],
        chart: {
            type: 'bar',
            height: 250
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                vertical: true,
            }
        },
        labels: ["Male", "Female"],
        xaxis: {
            categories: ['Male', 'Female'],
        }
    };

    var chart = new ApexCharts(document.querySelector("#bar"), options);
    chart.render();
})