import React from 'react';
import styled from 'styled-components';

import { ChartArea } from 'components/chartArea';
import { swatchesHSL } from 'utils/swatchColors';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 30px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: ${p => p.theme.sizing.medium};
  margin: ${p => p.theme.sizing.medium};
  background: hsl(212, 31%, 90%);
  border-radius: 6px;
`;

const Axis = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YAxis = styled(Axis)`
  grid-area: 1 / 1 / 2 / 2;
`;

const XAxis = styled(Axis)`
  grid-area: 2 / 2 / 3 / 3;
`;

const LabelY = styled.span`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  font-size: ${p => p.theme.fonts.small};
  text-transform: uppercase;
`;

const LabelX = styled.span`
  font-size: ${p => p.theme.fonts.small};
  text-transform: uppercase;
`;

const Intersection = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  text-align: right;
`;

export const Graph = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  return (
    <Container>
      <ChartArea data={swatchesHSL(baseColor)} width={300} height={200} />
      <YAxis>
        <LabelY>Saturation</LabelY>
      </YAxis>
      <XAxis>
        <LabelX>Lightness</LabelX>
      </XAxis>
      <Intersection>0</Intersection>
    </Container>
  );
};
