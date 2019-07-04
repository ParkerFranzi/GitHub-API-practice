'use strict';

function getGithubRepo(handle) {
  fetch('https://api.github.com/users/'+ handle +'/repos')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  if (responseJson.status === 'success') {
    $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
   )
  }
  else {
    $('.results-img').replaceWith(`<p class="results-img">${responseJson.message}</p>`)
  
  }
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let handle = $("#githubHandle").val();
    getGithubRepo(handle);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});