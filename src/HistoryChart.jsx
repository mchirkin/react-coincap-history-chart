// @flow
import * as React from 'react';
import moment from 'moment';

import Wrapper from './components/Wrapper';
import Top from './components/Top';
import PriceInfo from './components/PriceInfo';
import Chart from './components/Chart';

const locale = {
  RU: {
    day: 'День',
    week: 'Неделя',
    month: 'Месяца',
    year: 'Год',
    allTime: 'Весь период',
  },
  EN: {
    day: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    allTime: 'All time',
  },
};

type Props = {
  /** Full coin name */
  coinName: string,
  /** Ticker symbol */
  coinSymbol: string,
  /** Language */
  lang?: 'RU' | 'EN',
};

type State = {
  data: Array<{
    name: string,
    uv: number,
  }>,
  selectedPeriod: string,
};

export default class CoinChart extends React.Component<Props, State> {
  static defaultProps = {
    lang: 'RU',
  };

  priceInfo: ?PriceInfo;

  state = {
    data: [],
    selectedPeriod: '7day',
  };

  componentDidMount() {
    const { selectedPeriod } = this.state;
    const { coinSymbol } = this.props;
    this.getCoinPriceHistory(coinSymbol, selectedPeriod);
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedPeriod } = this.state;
    const { coinSymbol } = this.props;

    if (prevProps.coinSymbol !== coinSymbol) {
      setTimeout(() => {
        this.getCoinPriceHistory(coinSymbol, selectedPeriod);
      }, 300);
    }
  }

  selectPeriod = (period: string): void => {
    const { coinSymbol } = this.props;

    this.setState({
      selectedPeriod: period,
    });

    this.getCoinPriceHistory(coinSymbol, period);
  }

  getCoinPriceHistory = (coin: string, period: string): void => {
    const url = period !== 'all'
      ? `https://coincap.io/history/${period}/${coin}`
      : `https://coincap.io/history/${coin}`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!json) {
          return [];
        }

        const { lang } = this.props;
        const price = json.price.map(price => {
          const [time, value] = price;

          let name = moment(time).format('DD.MM.YYYY HH:mm:ss');

          if (lang === 'EN') {
            name = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }

          return {
            name,
            uv: parseFloat(value.toFixed(2)),
          };
        });

        const lastPrice = price[price.length - 1];

        this.setState({
          data: price,
        }, () => {
          this.updatePriceInfo({
            time: lastPrice.name,
            rate: lastPrice.uv,
          });
        });
      });
  }

  updatePriceInfo = (info: ?{ time: string, rate: number }): void => {
    const { data } = this.state;

    if (info && info.time && this.priceInfo) {
      this.priceInfo.updatePriceData({
        time: info.time,
        rate: `${info.rate.toFixed(2)} $`,
      });

      return;
    }

    const lastPrice = data[data.length - 1];

    if (this.priceInfo) {
      this.priceInfo.updatePriceData({
        time: lastPrice.name,
        rate: `${lastPrice.uv.toFixed(2)} $`,
      });
    }
  }

  render() {
    const { data, selectedPeriod } = this.state;
    const { coinName, coinSymbol, lang } = this.props;

    return (
      <Wrapper>
        <Top
          name={coinName}
          symbol={coinSymbol}
          lang={lang}
          locale={locale}
          selectedPeriod={selectedPeriod}
          selectPeriod={this.selectPeriod}
        />
        <PriceInfo ref={c => { this.priceInfo = c; }} />
        <Chart
          data={data}
          updatePriceInfo={this.updatePriceInfo}
        />
      </Wrapper>
    );
  }
}
