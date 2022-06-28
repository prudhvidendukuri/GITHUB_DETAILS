var inputName, url, followers_url, repository_url;
var inputNameEvent = document.getElementById('text').addEventListener('keydown',testofreload);
function testofreload(){
    if(event.keyCode == 8){
        location.reload();
       
    }
    
}
var profileDetails = [];
var profileFollowersDetails = [];
var profileRepos = [];
document.getElementById('search').addEventListener('click', extract);
document.getElementById('hidden_display').style.display = 'none';


async function extract() {
    inputName = document.getElementById('text').value;
    url = `https://api.github.com/users/${inputName}`;
    followers_url = `https://api.github.com/users/${inputName}/followers`
    repository_url = `https://api.github.com/users/${inputName}/repos`
    try {
        const response = await fetch(url);
        profileDetails = await response.json();
        const responseFollowers = await fetch(followers_url);
        profileFollowersDetails = await responseFollowers.json();
        const responserepos = await fetch(repository_url);
        profileRepos = await responserepos.json();
    } catch (e) {
        console.log(e);
    }

    document.getElementById('image').setAttribute('src', profileDetails.avatar_url);
    document.getElementById('link').setAttribute('href', profileDetails.html_url);
    document.getElementById('name').innerText = profileDetails.name;
    document.getElementById('username').innerText = profileDetails.login + "(username)";
    document.getElementById('followers').innerText = "followers" + ": " + profileDetails.followers;
    document.getElementById('following').innerText = "following" + ": " + profileDetails.following;
    document.getElementById('hidden_display').style.display = 'flex';
    calling_repos();
    calling_followers();


}
function calling_repos() {
    let length = profileRepos.length;
    for (i = 0; i < length; i++) {
        let div = document.createElement('div');
        let texts = document.createTextNode(profileRepos[i].name);
        div.appendChild(texts);
        document.getElementById('cards').appendChild(div);
    }


}
function calling_followers() {
    let length = profileFollowersDetails.length;
    for (i = 0; i < length; i++) {
        let div = document.createElement('div');
        let texts = document.createTextNode(profileFollowersDetails[i].login);
        div.appendChild(texts);
        document.getElementById('follower_cards').appendChild(div);
    }
}