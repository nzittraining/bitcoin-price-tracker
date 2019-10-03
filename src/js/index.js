import 'bootstrap/dist/css/bootstrap';
import $ from 'jquery';

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
fetch(url)
  .then(data => data.json())
  .then(res => {
    for (let key in res) {
      let detail = res[key];
      switch (key) {
        case 'chartName':
          $('#main h1').html(`${detail}`);
          break;
        case 'time':
          $('div.updatedTime').html(`Updated: ${detail.updated}`);
          break;
        case 'disclaimer':
          $('div.description').html(`${detail}`);
          break;
        case 'bpi':
          for (let k in res[key]) {
            $('#main table')
              .add(
                `
                        <tr>
                        <td>${detail[k].code}</td>
                        <td>${detail[k].description}</td>
                        <td>${detail[k].rate}</td>
                        <td>${detail[k].symbol}</td>
                        </tr>
                    `
              )
              .appendTo('#main table');
          }
          break;
      }
    }
  })
  .catch(err => {
    alert(err);
  });
