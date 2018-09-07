// @flow

type Props = {
  active?: boolean,
  payload?: Array<{
    payload: {
      name: string,
      uv: number,
    }
  }>,
  updatePriceInfo: ({ time: string, rate: number }) => mixed,
};

const Tooltip = ({
  active,
  payload,
  updatePriceInfo,
}: Props) => {
  if (active && payload) {
    const data = payload[0];

    updatePriceInfo({
      time: data.payload.name,
      rate: data.payload.uv,
    });
  }

  return null;
};

export default Tooltip;
