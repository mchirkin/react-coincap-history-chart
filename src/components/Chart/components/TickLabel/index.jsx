// @flow
import * as React from 'react';

type Props = {
  x?: number,
  y?: number,
  color?: string,
  payload?: {
    value: string,
  },
};

const TickLabel = ({
  x,
  y,
  color,
  payload,
}: Props) => (
  <g
    transform={`translate(${x || 0},${y || 0})`}
  >
    <text
      x={0}
      y={0}
      dy={0}
      fontSize="10px"
      textAnchor="end"
      fill={color}
    >
      {payload && payload.value}
    </text>
  </g>
);

TickLabel.defaultProps = {
  x: 0,
  y: 0,
  color: '#000',
  payload: {
    value: '',
  },
};

export default TickLabel;
