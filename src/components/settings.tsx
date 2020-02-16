import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { setSaturationDelta, setHueDelta } from 'redux/paletteSlice';
import { RootState } from 'redux/rootReducer';
import { Graph } from 'components/graph';
import Slider from 'react-input-slider';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const SliderContainer = styled.div`
  display: flex;
  background: hsl(212, 29%, 90%);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
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

export const Settings = () => {
  const data = useSelector((state: RootState) => state.swatches);
  const saturationDelta = useSelector((state: RootState) => state.saturationDelta);
  const hueDelta = useSelector((state: RootState) => state.hueDelta);

  const dispatch = useDispatch();

  const handleChangeSaturation = (val: number) => dispatch(setSaturationDelta(val));
  const handleChangeHue = (val: number) => dispatch(setHueDelta(val));

  return (
    <Container>
      <Graph xAxis={channels.light} yAxis={channels.sat} data={data} width={300} height={200}>
        <SliderContainer>
          <Slider
            styles={sliderStyles}
            axis="y"
            y={saturationDelta}
            ystep={1}
            ymin={-50}
            ymax={50}
            onChange={({ y }) => handleChangeSaturation(y)}
          />
        </SliderContainer>
      </Graph>
      <Graph xAxis={channels.light} yAxis={channels.hue} data={data} width={300} height={200}>
        <SliderContainer>
          <Slider
            styles={sliderStyles}
            axis="y"
            y={hueDelta}
            ystep={1}
            ymin={-100}
            ymax={100}
            onChange={({ y }) => handleChangeHue(y)}
          />
        </SliderContainer>
      </Graph>
    </Container>
  );
};
