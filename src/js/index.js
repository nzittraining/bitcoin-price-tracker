import 'bootstrap/dist/css/bootstrap';

class BitconFetcher {
  constructor(id) {
    this.targetContainerId = id;
  }

  getPriceList(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => this.generateList(res))
      .catch(console.error);
  }

  generateList({ chartName, disclaimer, time, bpi }) {
    const container = document.getElementById(this.targetContainerId);

    container.innerHTML = `
      <h1>${chartName}</h1>
      <p><small>Updated: ${time.updated}</small></p>
      <p>${disclaimer}</p>
      <table class="table table-striped table-bordered">
        <tr>
          <th>Currency</th>
          <th>Description</th>
          <th>Rate</th>
          <th>Symbol</th>
        </tr>
        ${Object.values(bpi).reduce((acc, item) => {
          const { code, description, rate, symbol } = item;

          acc += `<tr>
                    <td>${code}</td>
                    <td>${description}</td>
                    <td>${rate}</td>
                    <td>${symbol}</td>
                  </tr>`;
          return acc;
        }, '')}
      </table>`;
  }
}

const bitconHelper = new BitconFetcher('main');
bitconHelper.getPriceList('https://api.coindesk.com/v1/bpi/currentprice.json');
