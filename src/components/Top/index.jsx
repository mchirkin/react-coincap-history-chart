import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 8px;
`;

const CoinName = styled.div`
  color: #41334b;
  font-size: 16px;
  font-weight: 600;
`;

const PeriodSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PeriodButton = styled.div`
  position: relative;
  margin-right: 12px;
  color: ${props => props.active ? '#000' : 'rgba(0, 0, 0, 0.5)'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.active
    ? `
      &::after {
        content: "";
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000;
      }
    `
    : ''}
`;

const Top = ({
  name,
  symbol,
  selectedPeriod,
  selectPeriod,
  locale,
  lang
}) => (
  <Wrapper>
    <CoinName>
      {`${name} (${symbol})`}
    </CoinName>
    <PeriodSelect>
      <PeriodButton
        active={selectedPeriod === '1day'}
        onClick={() => { selectPeriod('1day'); }}
      >
        {locale[lang].day}
      </PeriodButton>
      <PeriodButton
        active={selectedPeriod === '7day'}
        onClick={() => { selectPeriod('7day'); }}
      >
        {locale[lang].week}
      </PeriodButton>
      <PeriodButton
        active={selectedPeriod === '30day'}
        onClick={() => { selectPeriod('30day'); }}
      >
        {locale[lang].month}
      </PeriodButton>
      <PeriodButton
        active={selectedPeriod === '365day'}
        onClick={() => { selectPeriod('365day'); }}
      >
        {locale[lang].year}
      </PeriodButton>
      <PeriodButton
        active={selectedPeriod === 'all'}
        onClick={() => { selectPeriod('all'); }}
      >
        {locale[lang].allTime}
      </PeriodButton>
    </PeriodSelect>
  </Wrapper>
);

export default Top;
