import 'bootstrap/dist/css/bootstrap';
import $ from 'jquery';

import requestAdaptor from './request.js';

const request = new requestAdaptor();

const main = function() {
  let data = {};
  if (arguments[0]) data = arguments[0];
  const showChartName = data => {
    let name = 'Bitcoin';
    if (data.chartName) name = data.chartName;
    $('#chartname').html(name);
  };

  const showDate = data => {
    let date = '';
    if (data.time && data.time.updated) date = data.time.updated;
    $('#date-banner-data').html(date);
  };

  const showDisclaimer = data => {
    let disclmr = '';
    if (data.disclaimer) disclmr = data.disclaimer;
    $('#disclmr').html(disclmr);
  };
  const showGrid = data => {
    let prices = [];
    if (data.bpi) {
      let { bpi } = data;
      for (let index in bpi) {
        prices.push(bpi[index]);
      }
      prices.map((value, index) => {
        let row = index % 2 === 0 ? $('<tr/>') : $("<tr class= 'dark-row'/>");
        row.appendTo($('#price-data-table'));
        let currency = $('<td/>');
        currency.html(value.code);
        currency.appendTo(row);
        let des = $('<td/>');
        des.html(value.description);
        des.appendTo(row);
        let rate = $('<td/>');
        rate.html(value.rate_float);
        rate.appendTo(row);
        let sym = $('<td/>');
        sym.html(value.symbol);
        sym.appendTo(row);
      });
    }
  };

  return {
    build: function() {
      showChartName(data);
      showDate(data);
      showDisclaimer(data);
      showGrid(data);
      $('#main').removeClass('loading-mask');
    }
  };
};

(function app() {
  request.get('https://api.coindesk.com/v1/bpi/currentprice.json', data => {
    new main(data).build();
  });
})();
