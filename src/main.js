import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './giphy.js';

$(document).ready(function () {

  let promise = GiphyService.getTrending();
  promise.then(function(response) {
    const body = JSON.parse(response);
    $('#trend1').html(`<img src="${body.data[0].images.original.url}">`);
    $('#trend2').html(`<img src="${body.data[1].images.original.url}">`);
    $('#trend3').html(`<img src="${body.data[2].images.original.url}">`);
  }, function(error) {
    $('#trend1').text(`Sorry, it's not working.`);
    $('#trend2').text(`Sorry, it's not working.`);
    $('#trend3').text(`Sorry, it's not working.`);
  })
  
  $('#gifSearch').click(function () {
    const searchInput = $('#search').val();
    let promise = GiphyService.getSearchGiphy(searchInput);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showGIF').html(`<img src="${body.data[0].images.original.url}">`);
      $('.showGIF1').html(`<img src="${body.data[1].images.original.url}">`);
    }, function(error) {
      $('.showGIF').text(`Sorry, it's not working.`);
    });
  });
  
  $('#randomSearch').click(function () {
    let promise = GiphyService.getRandomSearch();
    promise.then(function(response) {
      const body1 = JSON.parse(response);
      $('#randomGIF').html(`<img src="${body1.data.images.original.url}">`);
    }, function(error) {
      $('#randomGIF').text(`Sorry, it's not working.`);
    });
  });

});
