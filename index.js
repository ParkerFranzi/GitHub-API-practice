'use strict';

function getGithubRepo(handle) {
  fetch('https://api.github.com/users/'+ handle +'/repos')
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response.json();
        }
        throw new Error(response.message);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => errorResults());
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i<responseJson.length; i++) {
      $('#results-list').append(
          `<li><p>Name: ${responseJson[i].name}</p>
          <p>Link: ${responseJson[i].html_url}</p>`
      )
  }
  //display the results section
  $('.results').removeClass('hidden');
}
function errorResults() {
    $('.results').removeClass('hidden');
    $('#results-list').html('<p class="error">Something went wrong please try again</p>')
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