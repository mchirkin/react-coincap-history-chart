// @flow
import * as React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  AreaChart,
  YAxis,
  XAxis,
  Area,
  Tooltip,
} from 'recharts';

import TickLabel from './components/TickLabel';
import CustomTooltip from './components/Tooltip';

const Wrapper = styled.div`
  position: absolute;
  bottom: -60px;
  width: 100%;
`;

type Props = {
  data: Array<{
    name: string,
    uv: number,
  }>,
  updatePriceInfo: () => mixed,
};

const Chart = ({
  data,
  updatePriceInfo,
}: Props) => (
  <Wrapper onMouseLeave={updatePriceInfo}>
    {data && data.length > 0 && (
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="15%" stopColor="#a2f4fb" stopOpacity={1} />
              <stop offset="34%" stopColor="#9ae1fc" stopOpacity={1} />
              <stop offset="52%" stopColor="#92fdfc" stopOpacity={1} />
              <stop offset="77%" stopColor="#4efac8" stopOpacity={1} />
              <stop offset="100%" stopColor="#80e8ff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <YAxis
            type="number"
            domain={['auto', 'auto']}
            hide
          />
          <XAxis
            dataKey="name"
            height={60}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tickCount={7}
            tick={<TickLabel />}
            allowDataOverflow
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="transparent"
            fillOpacity={1}
            fill="url(#colorUv)"
            activeDot={false}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 2 }}
            content={(
              <CustomTooltip updatePriceInfo={updatePriceInfo} />
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </Wrapper>
);

export default Chart;
