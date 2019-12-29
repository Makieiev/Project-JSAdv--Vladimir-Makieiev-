window.onload = function () {
    var base = 'https://swapi.co/api/people/?page=';
    var listAll = document.getElementById("list");
    var table = document.querySelector(".table");
    var character = document.querySelectorAll(".heroInfo");
    var nextButt = document.querySelector("#next");
    var backButt = document.querySelector("#back");
    var movies = document.querySelector(".movies");
    var account = 1;
    
    getHero();   

    function getHero() {
        fetch(base + account)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                if (account === 1) {
                    backButt.setAttribute("disabled", "true");
                    backButt.style.backgroundColor = "rgba(0, 0, 41, 0.05)";
                } else if (account === 9) {
                    nextButt.setAttribute("disabled", "true");
                    nextButt.style.backgroundColor = "rgba(0, 0, 41, 0.05)";
                } else {
                    backButt.removeAttribute("disabled");
                    nextButt.removeAttribute("disabled");
                    backButt.style.backgroundColor = "rgba(0, 0, 41, 0.05)";
                    nextButt.style.backgroundColor = "rgba(0, 0, 41, 0.05)";
                }

                for (var item of data.results) {
                    var links = document.createElement("LI");
                    links.classList.add("names");
                    links.style.listStyleType = "none";
                    listAll.appendChild(links);
                    links.innerHTML = item.name;
                    links.addEventListener("click", getInfo);
                }
            });
    }

    function getInfo(even) {
        var findUrl = "https://swapi.co/api/people/?search=";
        var findUser = even.target.innerHTML;
        fetch(findUrl + findUser)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                for (var item of data.results) {
                    character[0].innerHTML = item.name;
                    character[1].innerHTML = item.birth_year;
                    character[2].innerHTML = item.gender;

                    for (var film of item.films) {
                        fetch(film)
                            .then(function (answer) {
                                return answer.json()
                            })
                            .then(function (data) {
                                var movieName = document.createElement("LI");
                                movieName.style.listStyleType = "none";
                                movieName.classList.add("names");
                                movies.appendChild(movieName);
                                movieName.innerHTML = data.title;
                            })
                    }

                    fetch(item.homeworld)
                        .then(function (answer) {
                            return answer.json()
                        })
                        .then(function (data) {
                            character[4].innerHTML = data.name;
                        });

                    fetch(item.species)
                        .then(function (answer) {
                            return answer.json()
                        })
                        .then(function (data) {
                            character[5].innerHTML = data.name;
                        });
                }
            });
        table.classList.remove("covert");
    }

    var Exit = document.querySelector("#exitButton");
    exitButton.addEventListener("click", remove);

    function remove() {
        while (movies.firstChild) {
            movies.removeChild(movies.firstChild);
        }
        table.classList.add("covert");
    }
    nextButt.addEventListener("click", getNextList);
    backButt.addEventListener("click", getBackList);

    function getNextList() {
        while (listAll.firstChild) {
            listAll.removeChild(listAll.firstChild);
        }
        account++;
        getHero();
    }

    function getBackList() {
        while (listAll.firstChild) {
            listAll.removeChild(listAll.firstChild);
        }
        account--;
        getHero();
    }
};   