
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded!");
    const showPic = document.getElementById("showPic")
    const showName = document.getElementById("showName")

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

    fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(games => {
            mainPageInfo(games[0])

            let currentIndex = 0;
            leftBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + games.length) % games.length;
                mainPageInfo(games[currentIndex]);
            });

            rightBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % games.length;
                mainPageInfo(games[currentIndex]);
            });
        })



})