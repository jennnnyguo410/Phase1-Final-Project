
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded!");
    const gameList = document.getElementById("game-list")
    const leftBtn = document.getElementById("leftBtn")
    const rightBtn = document.getElementById("rightBtn")
    const poster = document.getElementById("poster")

    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const genre = document.getElementById("genre")
    const platform = document.getElementById("platform")
    const publisher = document.getElementById("publisher")
    const developer = document.getElementById("developer")
    const release_date = document.getElementById("release_date")

    const newGameForm = document.getElementById("game-form")
    const newName = document.getElementById("newName")
    const newDesc = document.getElementById("newDesc")
    const newGenre = document.getElementById("newGenre")
    const newPlatform = document.getElementById("newPlatform")
    const newUrl = document.getElementById("newUrl")
    const newPublisher = document.getElementById("newPublisher")
    const newDeveloper = document.getElementById("newDeveloper")
    const newReleaseDate = document.getElementById("newReleaseDate")
    const submitBtn = document.getElementById("submitBtn")


    // Function 1 Show the first game's detailed informatio when page loaded


    fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(games => {
            games.sort((a, b) => a.title.localeCompare(b.title));

            mainPageInfo(games[0])
            games.forEach((game) => gameListInfo(game))

        })
        .catch(error => {
            console.error('Fetch error:', error);
        })

    function mainPageInfo(game) {
        poster.src = game.thumbnail
        title.textContent = game.title
        description.textContent = game.short_description
        genre.textContent = game.genre
        platform.textContent = game.platform
        publisher.textContent = game.publisher
        developer.textContent = game.developer
        release_date.textContent = game.release_date
    }

    // Function 2 the Game List 

    function gameListInfo(game) {
        const gameDiv = document.createElement('div')
        const showPic = document.createElement('img')
        const showName = document.createElement('p')
        gameDiv.classList.add("game-div");
        showPic.src = game.thumbnail;
        showPic.classList.add("smallGameLogo");
        showPic.alt = "Game Logo";
        showName.textContent = game.title;
        showName.classList.add("game-name");

        gameDiv.appendChild(showPic);
        gameDiv.appendChild(showName);
        gameList.appendChild(gameDiv);
    }


})