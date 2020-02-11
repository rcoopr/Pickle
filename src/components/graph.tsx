import React from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';

import { useSelector, useDispatch } from 'react-redux';
import { setSaturationDelta } from 'redux/paletteSlice';
import { RootState } from 'redux/rootReducer';
import { Chart } from 'components/chart';

const Wrapper = styled.div`
  margin: ${p => p.theme.sizing.medium};
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 30px;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
`;

const Container = styled.div`
  background: hsl(212, 31%, 90%);
  border-radius: 6px;
`;

const SliderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 1 / 2 / 2;
`;

const ChartContainer = styled(Container)`
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

const Intersection = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const sliderStyles = {
  track: {
    backgroundColor: 'hsl(210, 38%, 95%)',
  },
  active: {
    backgroundColor: 'hsl(210, 38%, 95%)',
  },
  thumb: {
    height: 9,
    width: 18,
    borderRadius: '2px',
    boxShadow: 'none',
    border: '1px solid rgba(210, 210, 210, 1)',
  },
};

export interface IGraphProps {
  data: number[][];
  xAxis: {
    name: string;
    channel: number; // 0 | 1 | 2
  };
  yAxis: {
    name: string;
    channel: number;
  };
  width: number;
  height: number;
}

export const Graph = ({ data, xAxis, yAxis, width, height }: IGraphProps) => {
  const saturationDelta = useSelector((state: RootState) => state.palette.saturationDelta);
  const dispatch = useDispatch();

  const handleChange = (val: number) => dispatch(setSaturationDelta(val));

  return (
    <Wrapper>
      <SliderContainer>
        <Slider
          styles={sliderStyles}
          axis="y"
          y={saturationDelta}
          ystep={1}
          ymin={-50}
          ymax={50}
          onChange={({ y }) => handleChange(y)}
        />
      </SliderContainer>
      <ChartContainer>
        <ChartArea data={data} xAxis={xAxis} yAxis={yAxis} width={width} height={height} />
        <YAxis>
          <LabelY>{yAxis.name}</LabelY>
        </YAxis>
        <XAxis>
          <LabelX>{xAxis.name}</LabelX>
        </XAxis>
        <Intersection>0</Intersection>
      </ChartContainer>
    </Wrapper>
  );
};
