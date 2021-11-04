
//query selectors
const searchInput = document.querySelector('#search')
const button = document.querySelector('#submit');
const listOfUsers = document.querySelector('#user-list');
const listOfRepos = document.querySelector('#repos-list');

//Place to insert my data to be used everywhere
let searchResults;

//event listener on submission of a search term
button.addEventListener('click', (event) => {
event.preventDefault();
    fetch("https://api.github.com/search/users?q="+searchInput.value)
        .then((data) => data.json())
        .then((data) => {
            searchResults = data.items;
            render(searchResults);
            searchInput.value = '';
        })
});

//let login;

const render = (searchResults) => {
    let html = '';
    for(let item in searchResults) {
        let login = searchResults[item].login;
        let avatarUrl = searchResults[item].avatar_url;
        let profileUrl = searchResults[item].html_url;
    html = html + createHtml(login, avatarUrl, profileUrl, item);
    }
    listOfUsers.innerHTML = html;
    for (let i = 0; i < searchResults.length; i++) {
        const repoButton = document.getElementById(i);
        repoButton.addEventListener('click', (event) => {
            event.preventDefault();
            fetch(`https://api.github.com/users/${searchResults[i].login}/repos`)
                .then((data) => data.json())
                .then((data) => {
                renderRepo(data);
                })
        })
    }
};


function createHtml (login, avatarUrl, profileUrl, key) {
        return `<li>User Login: <button id=${key}>${login}</button></li>
        <li> <img src=${avatarUrl} height=100, width=100></li> 
        <li> <a href=${profileUrl}>Click here to see Github Profile</a></li><br><br>`
    };
    

const renderRepo = (data) => {
    let html = '';
    for(let item in data) {
        let name = data[item].name;
        let description = data[item].description;
        let language = data[item].language;
        let watchers = data[item].watchers;
        let url = data[item].html_url;
        let userLogin = data[item].owner.login;
    html = html + createRepoHtml(name, description, language, watchers, url, userLogin);
    }
    listOfRepos.innerHTML = html;
};

function createRepoHtml (name, description, language, watchers, url, userLogin) {
    return `<h3>Repos by ${userLogin}</h3> 
            <li>Repo name: ${name}</li>
            <li>Repo description: ${description}</li>
            <li>Repo language: ${language}</li>
            <li>Number of watchers: ${watchers}</li>
            <li> <a href=${url}>Click here to go to Repo on Github</a></li><br><br>`
};