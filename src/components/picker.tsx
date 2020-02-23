import React from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';

import { hslStringToArray, hslArrayToString } from 'utils/hslConvert';
import { clamp } from 'utils/swatchColors';
import { CopyGroup } from 'components/copyGroup';

import { useSelector, useDispatch } from 'react-redux';
import { selectBaseColor, selectSwatches, setBaseColor } from 'redux/paletteSlice';

interface IColorRect {
  bg: string;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: ${p => p.theme.sizing.medium};
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

const ColorRect = styled.div.attrs<IColorRect>(p => ({
  style: {
    background: `${p.bg}`,
    marginBottom: `${p.theme.sizing.medium}`,
    height: `${p.theme.sizing.pickerHeight}px`,
    width: `${p.theme.sizing.pickerWidth}px`,
  },
}))<IColorRect>`
  position: relative;
  border-radius: 4px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 14px;
  width: 100%;
  padding: 15px;
`;

type ISliderProps = {
  hue?: number;
  saturation?: number;
  lightness?: number;
};

const HueSlider = styled(Slider)`
  background-image: linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgb(255, 255, 0) 17%,
    rgb(0, 255, 0) 33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 0, 255) 67%,
    rgb(255, 0, 255) 83%,
    rgb(255, 0, 0) 100%
  );
`;

const SaturationSlider = styled(Slider).attrs<ISliderProps>(p => ({
  style: {
    backgroundImage: `linear-gradient(to right, hsl(${p.hue}, 0%, ${p.lightness}%), hsl(${p.hue}, 100%, ${p.lightness}%))`,
  },
}))<ISliderProps>``;

const LightnessSlider = styled(Slider).attrs<ISliderProps>(p => ({
  style: {
    backgroundImage: `linear-gradient(
      to right,
      hsl(${p.hue}, ${p.saturation}%, 0%) 0%,
      hsl(${p.hue}, ${p.saturation}%, 50%) 50%,
      hsl(${p.hue}, ${p.saturation}%, 100%) 100%
    )`,
  },
}))<ISliderProps>``;

const EditableInput = styled.input`
  width: 4em;
  padding: 3px;
  margin-left: 25px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid ${p => p.theme.colors.primary};
  font: inherit;
  font-size: 0.8rem;
`;

const sliderStyles = {
  track: {
    width: '100%',
    borderRadius: '2px',
  },
  active: {
    backgroundColor: 'transparent',
  },
  thumb: {
    height: 18,
    width: 9,
    borderRadius: '2px',
    boxShadow: 'none',
    border: '1px solid rgba(210, 210, 210, 1)',
  },
};

export const Picker = () => {
  const baseColor = useSelector(selectBaseColor);
  const swatches = useSelector(selectSwatches);
  const dispatch = useDispatch();

  const color = hslStringToArray(baseColor);

  const handleChange = (val: number, channel: number) => {
    const [H, S, L] = color;
    let newColor: number[] = [];

    if (channel === 0) newColor = [clamp(val, 0, 359), S, L];
    if (channel === 1) newColor = [H, clamp(val, 0, 100), L];
    if (channel === 2) newColor = [H, S, clamp(val, 0, 100)];

    if (newColor[0] !== H || newColor[1] !== S || newColor[2] !== L) {
      const hsl = hslArrayToString(newColor);
      dispatch(setBaseColor(hsl));
    }
  };

  return (
    <Container>
      <ColorRect bg={hslArrayToString(color)} />
      <Bar>
        <HueSlider
          styles={sliderStyles}
          xmax={359}
          x={color[0]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 0)}
        />
        <EditableInput
          type="text"
          value={color[0]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 0)}
        />
      </Bar>
      <Bar>
        <SaturationSlider
          styles={sliderStyles}
          axis="x"
          x={color[1]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 1)}
          hue={color[0]}
          lightness={color[2]}
        />
        <EditableInput
          type="text"
          value={color[1]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 1)}
        />
      </Bar>
      <Bar>
        <LightnessSlider
          styles={sliderStyles}
          x={color[2]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 2)}
          hue={color[0]}
          saturation={color[1]}
        />
        <EditableInput
          type="text"
          value={color[2]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 2)}
        />
      </Bar>
      <CopyGroup swatches={swatches} />
    </Container>
  );
};
