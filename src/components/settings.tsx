import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import { swatchesHSL } from 'utils/swatchColors';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { Graph } from 'components/graph';

const Container = styled.section`
/* background: ${p => p.theme.colors.tertiary}; */
display: flex;
flex-direction: column;
`;

export const Settings = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  const data = swatchesHSL(Color(baseColor));

  const hue = {
    name: 'Hue',
    channel: 0,
  };
  const sat = {
    name: 'Saturation',
    channel: 1,
  };
  const lit = {
    name: 'Lightness',
    channel: 2,
  };

  return (
    <Container>
      <Graph xAxis={lit} yAxis={sat} data={data} width={300} height={200} />
      <Graph xAxis={lit} yAxis={hue} data={data} width={300} height={200} />
    </Container>
  );
};
