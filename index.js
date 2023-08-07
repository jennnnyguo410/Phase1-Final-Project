
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
    const newThumbnail = document.getElementById("newThumbnail")
    const newPublisher = document.getElementById("newPublisher")
    const newDeveloper = document.getElementById("newDeveloper")
    const newReleaseDate = document.getElementById("newReleaseDate")
    const submitBtn = document.getElementById("submitBtn")


    // Function 1 Show the first game's detailed informatio when page loaded
    let games = []
    let currentIndex = 0



    fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                } else {
                    return 0;
                }
            })
            games = data
            currentIndex = 0
            gameList.innerHTML = " "
            games.forEach((game) => gameListInfo(game, games))
            mainPageInfo(games[currentIndex], currentIndex);

        })
        .catch(error => {
            console.error('Fetch error:', error);
        })

    function mainPageInfo(game, currentIndex) {

        poster.src = game.thumbnail
        title.textContent = game.title
        description.textContent = game.short_description
        genre.textContent = game.genre
        platform.textContent = game.platform
        publisher.textContent = game.publisher
        developer.textContent = game.developer
        release_date.textContent = game.release_date

        //clickable poster 
        const newClickHandler = () => {
            window.open(`${game.game_url}`, "_blank");
        }
        //remover old eventlistener
        if (poster.clickHandker) {
            poster.removeEventListener("click", poster.clickHandker)
        }
        poster.clickHandker = newClickHandler
        poster.addEventListener("click", poster.clickHandker)

        //when selected, change the title color
        document.querySelectorAll('.game-div').forEach((div, index) => {
            if (index === currentIndex) {
                div.classList.add('selected-game');
            } else {
                div.classList.remove('selected-game');
            }
        })

        leftBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + games.length) % games.length
            mainPageInfo(games[currentIndex], currentIndex)
        })
        rightBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % games.length
            mainPageInfo(games[currentIndex], currentIndex)
        })
    }

    // Function 2 the Game List & add Event Listner

    function gameListInfo(game, games) {
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
        const gameIndex = games.indexOf(game)
        gameDiv.addEventListener("click", () => {
            mainPageInfo(game, gameIndex)
            gameDiv.scrollIntoView({ block: 'nearest' })
        })
        gameList.appendChild(gameDiv)


        return gameDiv
    }

    //Function 3 Add new Game into list 
    newGameForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const newGame = {
            title: newName.value,
            short_description: newDesc.value,
            genre: newGenre.value,
            platform: newPlatform.value,
            game_url: newUrl.value,
            thumbnail: newThumbnail.value,
            publisher: newPublisher.value,
            developer: newDeveloper.value,
            release_date: newReleaseDate.value
        }

        fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGame)
        })
            .then(res => res.json())
            .then(newGame => {
                games.push(newGame)
                currentIndex = games.length - 1
                mainPageInfo(games[currentIndex], currentIndex)
                const newGameDiv = gameListInfo(newGame, games)
                newGameDiv.classList.add('selected-game')
                gameList.appendChild(newGameDiv)

                const scrollBar = document.getElementById('game-list')
                scrollBar.scrollTop = scrollBar.scrollHeight;
            })

            .catch(error => {
                console.log("Error", error)
            })

    })
})