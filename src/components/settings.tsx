import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { Graph } from 'components/graph';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const channels = {
  hue: {
    name: 'Hue',
    channel: 0,
  },
  sat: {
    name: 'Saturation',
    channel: 1,
  },
  light: {
    name: 'Lightness',
    channel: 2,
  },
};

export const Settings = () => {
  const data = useSelector((state: RootState) => state.palette.swatches);

  return (
    <Container>
      <Graph xAxis={channels.light} yAxis={channels.sat} data={data} width={300} height={200} />
      <Graph xAxis={channels.light} yAxis={channels.hue} data={data} width={300} height={200} />
    </Container>
  );
};
