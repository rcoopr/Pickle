import React from 'react';
import styled from 'styled-components';
import { Chart } from 'components/chart';

const Wrapper = styled.div`
  margin: ${p => p.theme.sizing.medium};
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 30px;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  width: 400px;
`;

const ChartContainer = styled.div`
  background: hsl(212, 31%, 90%);
  border-radius: 6px;
  padding: ${p => p.theme.sizing.medium};
  grid-area: 1 / 2 / 3 / 3;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 30px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const ChartArea = styled(Chart)`
  grid-area: 1 / 2 / 2 / 3;
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

export interface IChartProps {
  data: number[][];
  xAxis: {
    name: string;
    channel: number;
  };
  yAxis: {
    name: string;
    channel: number;
  };
  width: number;
  height: number;
}

interface IGraphProps extends IChartProps {
  children: React.ReactChild;
}

export const Graph = ({ data, xAxis, yAxis, width, height, children }: IGraphProps) => (
  <Wrapper>
    {children}
    <ChartContainer>
      <ChartArea data={data} xAxis={xAxis} yAxis={yAxis} width={width} height={height} />
      <YAxis>
        <LabelY>{yAxis.name}</LabelY>
      </YAxis>
      <XAxis>
        <LabelX>{xAxis.name}</LabelX>
      </XAxis>
    </ChartContainer>
  </Wrapper>
);
