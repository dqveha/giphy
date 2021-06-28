import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function () {

  let trendRequest = new XMLHttpRequest();
  const trendURL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&offset=0&rating=g&lang=en`;

  function getTrending(trendResponse) {
    $('#trend1').html(`<img src="${trendResponse.data[0].images.original.url}">`);
    $('#trend2').html(`<img src="${trendResponse.data[1].images.original.url}">`);
    $('#trend3').html(`<img src="${trendResponse.data[2].images.original.url}">`);
  }
  trendRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const trendResponse = JSON.parse(this.responseText);
      getTrending(trendResponse);
    }
  }
  trendRequest.open("GET", trendURL, true);
  trendRequest.send();


  $('#gifSearch').click(function () {
    const searchInput = $('#search').val();
    $('#search').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchInput}&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showGIF').html(`<img src="${response.data[0].images.original.url}">`);
      $('.showGIF1').html(`<img src="${response.data[1].images.original.url}">`);
    }
  });
  $('#randomSearch').click(function () {
    let randomRequest = new XMLHttpRequest();
    const randomURL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;

    function randomGIFer(randomResponse) {
      $('#randomGIF').html(`<img src="${randomResponse.data.images.original.url}">`);
    }

    randomRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const randomResponse = JSON.parse(this.responseText);
        randomGIFer(randomResponse);
      }
    }

    randomRequest.open("GET", randomURL, true);
    randomRequest.send();

  });
});

