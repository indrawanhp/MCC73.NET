//let title = document.getElementById("title");
//console.log(title);
//title.innerHTML =
//    `<div class="container bg-primary text-center mb-3">
//        <h1 style="color:white" class="fw-bold">
//            Latihan Javascript
//        </h1>
//    </div>`

//let paragraf = document.getElementsByTagName("p")[0];
//paragraf.style.backgroundColor = "grey";

//let variable = document.getElementsByClassName("list");

//function berubah() {
//    for (var i = 0; i < variable.length; i++) {
//        variable[i].innerHTML = `diubah dari onclick html`
//    }
//}

//let array = [1, 2, 3, 4];
////insert.last
//array.push("hallo");
//console.log(array);
////delete last
//array.pop();
//console.log(array);
////insert first
//array.unshift("test");
//console.log(array);
////delete first
//array.shift();
//console.log(array);


////array multi dimensi
//let arrayMulti = [1, 2, 3, ['hehe', 'haha'], 5];
//console.log(arrayMulti[3][1]);

//let tambah = (x, y) => { return x + y }
//console.log(tambah(1, 3));

////object
//let mhs = {
//    nama: "asep",
//    nim: "a11201623",
//    gender: "laki",
//    hoby: ["mancing", "baca", "ngegame"],
//    isActive: true,
//};

//console.log(mhs);

//const user = {};
//user.username = "budi";
//user.password = "asd";
//console.log(user);

////array of object
//let animals = [
//    { name: "budi", species: "dog", class: { name: "mamalia" } },
//    { name: "tono", species: "dog", class: { name: "mamalia" } },
//    { name: "nemo", species: "fish", class: { name: "innverebrata" } },
//    { name: "dory", species: "fish", class: { name: "innverebrata" } },
//    { name: "james", species: "dog", class: { name: "mamalia" } },
//]
//console.log(animals);

////function onlydog, yaitu looping ke animals => yang di ambil hanya species dog
//const onlyDog = [];
////for (var i = 0; i < animals.length; i++) {
////    if (animals[i].species == "dog") {
////        onlyDog.push(animals[i]);
////    }
////}
////console.log(onlyDog);


////jika species == fish => maka ubah class name menjadi non mamalia
////const Fish = [];
////for (var i = 0; i < animals.length; i++) {
////    if (animals[i].species == "fish") {
////        animals[i].class.name = "Non Mamalia";
////        Fish.push(animals[i])
////    }
////}
////console.log(Fish);

////onlyDog = animals.filter(animal => animal.species === "dog");
////console.log(onlyDog);

//let detailAnimal;
//detailAnimal = animals.map(animal => {
//    return {
//        name: animal.name,
//        species: animal.species,
//        isFish: animal.species == 'fish' ? true : false
//    }
//})

//console.log(detailAnimal);

//let data = {
//    series: [30, 20],
//    labels: ["cowok", "cewek"]
//}

//jquery
//$(document).click(function () {
//    $("title").html("berubah");
//})

//Ajax => asynchronous javascript and xml
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon",
    //success: function (result) {
    //    console.log(result);
    //}
}).done((res) => {
    console.log(res.results);
    let temp = ""

    $.each(res.results, function (key, val) {
        temp +=
            `<tr class="text-center">
                <td>${key + 1}</td>
                <td>${val.name[0].toUpperCase() + val.name.slice(1)}</td>
                <td><button class="btn btn-sm btn-info" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalPoke">Detail</button></td>
            </tr>`
    })
    $("#tablePoke").html(temp);




}).fail((err) => {
    console.log(err);
})

function detailPoke(stringUrl) {
    $.ajax({
        url: stringUrl,
        success: function (result) {
            console.log(result);
            const name = result.name[0].toUpperCase() + result.name.slice(1)
            const physic = `Height: <span class="fw-bold">${result.height}</span> Inches | Weight: <span class="fw-bold">${result.weight}</span> lbs`

            for (var i = 0; i < result.stats.length; i++) {
                stat_name = result.stats[i].stat.name;
                base_stat = result.stats[i].base_stat;
            }

            $('#modalTitle').html(name)
            $('#img-poke').attr('src', result.sprites.other["dream_world"].front_default)
            $('#poke-name').html(name);
            $('#physic-poke').html(physic)

            const colors = {
                fire: "#F08030",
                grass: "#78C850",
                electric: "#F8D030",
                water: "#6890F0",
                ground: "#e0c068",
                rock: "#b8a038",
                fairy: "#f0b6bc",
                poison: "#A040A0",
                bug: "#a8b820",
                dragon: "#7038f8",
                psychic: "#f85888",
                flying: "#a890f0",
                fighting: "#c03028",
                normal: "#a8a878",
            }
            const main_types = Object.keys(colors)

            let typebadge = ""
            let bgc = []

            const poke_types = result.types.map((type) => type.type.name)
            for (var i = 0; i < poke_types.length; i++) {
                type = main_types.find((x) => poke_types[i].indexOf(x) > -1)
                color = colors[type]
                bgc.push(colors[type])
                typebadge +=
                    `<span class="badge text-dark mx-1" style="background-color:${color}; box-shadow: 1px 2px;">${result.types[i].type.name}</span>`;
            }
            $("#poke-type").html(typebadge);

            const stat = 
                `
                <div class="poke-stats-name">HP: ${result.stats[0].base_stat}</div>
                 <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[0].base_stat}%, ${bgc[0]}71 ${result.stats[0].base_stat}%)"></div>

                <div class="poke-stats-name">Attack: ${result.stats[1].base_stat}</div>
                <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[1].base_stat}%, ${bgc[0]}71 ${result.stats[1].base_stat}%")></div>

                <div class="poke-stats-name">Defense: ${result.stats[2].base_stat}</div>
                <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[2].base_stat}%, ${bgc[0]}71 ${result.stats[2].base_stat}%)"></div>

                <div class="poke-stats-name">Special-Attack: ${result.stats[3].base_stat}</div>
                <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[3].base_stat}%, ${bgc[0]}71 ${result.stats[3].base_stat}%)"></div>

                <div class="poke-stats-name">Special-Defense: ${result.stats[4].base_stat}</div>
                <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[4].base_stat}%, ${bgc[0]}71 ${result.stats[4].base_stat}%)"></div>

                <div class="poke-stats-name">Speed: ${result.stats[5].base_stat}</div>
                <div class="poke-stats-bar" style="background: linear-gradient(to right, ${bgc[0]} ${result.stats[5].base_stat}%, ${bgc[0]}71 ${result.stats[5].base_stat}%)"></div>
                `
            $(".poke-stat").html(stat);
        }
    })
}