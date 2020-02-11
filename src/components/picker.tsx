import React from 'react';
import styled from 'styled-components';

import Slider from 'react-input-slider';

import { useSelector, useDispatch } from 'react-redux';
import { changeBaseColorIfDiff } from 'redux/paletteSlice';
import { RootState } from 'redux/rootReducer';
import Color from 'color';

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
  border: 1px solid #9b9b9b;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

const ColorRect = styled.div<IColorRect>`
  position: relative;
  width: 300px;
  height: 150px;
  margin-bottom: ${p => p.theme.sizing.medium};
  background: ${p => p.bg};
  border-radius: 4px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;

    background: rgba(0, 0, 0, 0)
      linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0)) repeat scroll 0% 0%;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;

    background: rgba(0, 0, 0, 0) linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)) repeat
      scroll 0% 0%;
  }
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

const Hue = styled(Bar)``;
const Saturation = styled(Bar)``;
const Lightness = styled(Bar)``;

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

// Old style, seems to cause too many classes being created by SC
// const SaturationSlider = styled(Slider)<ISliderProps>`
//   background-image: linear-gradient(
//     to right,
//     hsl(${p => p.hue}, 0%, ${p => p.lightness}%),
//     hsl(${p => p.hue}, 100%, ${p => p.lightness}%)
//   );
// `;

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
  border: 1px solid grey;
  font: inherit;
  font-size: 0.8rem;
`;

const HueEditableInput = styled(EditableInput)``;
const SaturationEditableInput = styled(EditableInput)``;
const LightnessEditableInput = styled(EditableInput)``;

const CopyButtons = styled.ul`
  list-style: none;
`;

const ColorButton = styled.button``;

const HexButton = styled(ColorButton)``;
const HSLButton = styled(ColorButton)``;
const RGBButton = styled(ColorButton)``;

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
    // height: 10,
    // width: 6,
    borderRadius: '2px',
    boxShadow: 'none',
    border: '1px solid rgba(210, 210, 210, 1)',
  },
};

export const Picker = () => {
  // TODO: Put in useEffect, dependent on color.hue, color.lightness
  // TODO: Also add one for lightness
  // const saturationBackgroundStyle = {
  //   backgroundImage: `linear-gradient(to right,
  //     hsl(${color.hue}, 0, ${color.lightness}%),
  //     hsl(${color.hue}, 100%, ${color.lightness}%)`,
  // };

  const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  const dispatch = useDispatch();

  const color = Color(baseColor);

  const handleChange = (val: number, channel: string) => {
    const prevColor = color.hsl().object();
    // eslint-disable-next-line prefer-const
    let newColor = { ...prevColor };
    let value = Number.isNaN(val) ? 0 : val;
    value = value < 0 ? 0 : value;
    if (channel === 'h') {
      value = value > 359 ? 359 : value;
    } else {
      value = value > 100 ? 100 : value;
    }

    newColor[channel] = value;

    const hsl = Color(newColor)
      .hsl()
      .toString();

    dispatch(changeBaseColorIfDiff(hsl));
  };

  return (
    <Container>
      <ColorRect bg={color.hsl().toString()} />
      <Hue>
        <HueSlider
          styles={sliderStyles}
          xmax={359}
          x={color.hue()}
          xstep={1}
          onChange={({ x }) => handleChange(x, 'h')}
        />
        <HueEditableInput
          type="text"
          value={color.hue()}
          onChange={e => handleChange(parseInt(e.target.value, 10), 'h')}
        />
      </Hue>
      <Saturation>
        <SaturationSlider
          styles={sliderStyles}
          axis="x"
          x={color.saturationl()}
          xstep={1}
          onChange={({ x }) => handleChange(x, 's')}
          hue={color.hue()}
          lightness={color.lightness()}
        />
        <SaturationEditableInput
          type="text"
          value={color.saturationl()}
          onChange={e => handleChange(parseInt(e.target.value, 10), 's')}
        />
      </Saturation>
      <Lightness>
        <LightnessSlider
          styles={sliderStyles}
          x={color.lightness()}
          xstep={1}
          onChange={({ x }) => handleChange(x, 'l')}
          hue={color.hue()}
          saturation={color.saturationl()}
        />
        <LightnessEditableInput
          type="text"
          value={color.lightness()}
          onChange={e => handleChange(parseInt(e.target.value, 10), 'l')}
        />
      </Lightness>
      <CopyButtons>
        <HexButton>Hex</HexButton>
        <HSLButton>HSL</HSLButton>
        <RGBButton>RGB</RGBButton>
      </CopyButtons>
    </Container>
  );
};
