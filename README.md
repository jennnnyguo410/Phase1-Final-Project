## Free Games Directory Website

This is a website that showcases free games. 
The website uses the API provided by freetogame.com 
to fetch game information and presents it to the users in a user-friendly way.

## Core Deliverables

As a user, I can:

1. Game Detail Page: 
Upon loading the page, I can see detailed information about the first game, 
including the game's poster, title, developer, publisher, release platform, release date.

>fetch('https://www.freetogame.com/api/game?id=1')
>   .then(response => response.json())
>   .then(data => console.log(data));

2. Game List: 
There is a scrollable menu containing all games on the left side of the website. 
The games in the menu are sorted alphabetically. Clicking a game in the menu will update the Game Detail Page to show that game's information.

>fetch('https://www.freetogame.com/api/games')
>    .then(response => response.json())
>    .then(data => console.log(data));

3. Navigation and Pagination: 
Users can switch the displayed game by using the forward and backward buttons. 
The switching logic is based on the game's id.

4. Add New Game: 
Users can add new games to the website. 
A form is provided at the bottom of the page to input the game's information.
After submitting the form, a POST request is made to add the game to the database.

