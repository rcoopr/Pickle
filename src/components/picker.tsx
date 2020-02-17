import React from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';

import {
  hslStringToArray,
  hslArrayToString,
  swatchesHex,
  swatchesHSL,
  swatchesRGB,
  formatStringsToCopy,
} from 'utils/hslConvert';
import { useSelector, useDispatch } from 'react-redux';
import { updateStateIfDiff, selectBaseColor, selectSwatches } from 'redux/paletteSlice';

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

const ColorButton = styled.button<{ onClick: any }>``;

const HiddenText = styled.textarea`
  position: absolute;
  top: -999em;
  left: -999em;
`;

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
    const colorArray = color;
    let value = Number.isNaN(val) ? 0 : val;
    value = value < 0 ? 0 : value;
    if (channel === 0) {
      value = value > 359 ? 359 : value;
    } else {
      value = value > 100 ? 100 : value;
    }

    colorArray[channel] = value;
    const hsl = hslArrayToString(colorArray);
    dispatch(updateStateIfDiff(hsl));
  };

  const copyHex = formatStringsToCopy(swatchesHex(swatches));
  const copyHSL = formatStringsToCopy(swatchesHSL(swatches));
  const copyRGB = formatStringsToCopy(swatchesRGB(swatches));

  const copy = (selector: string) => {
    const copyText = document.querySelector(selector) as HTMLTextAreaElement;
    copyText.select();
    document.execCommand('copy');
  };

  return (
    <Container>
      <ColorRect bg={hslArrayToString(color)} />
      <Hue>
        <HueSlider
          styles={sliderStyles}
          xmax={359}
          x={color[0]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 0)}
        />
        <HueEditableInput
          type="text"
          value={color[0]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 0)}
        />
      </Hue>
      <Saturation>
        <SaturationSlider
          styles={sliderStyles}
          axis="x"
          x={color[1]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 1)}
          hue={color[0]}
          lightness={color[2]}
        />
        <SaturationEditableInput
          type="text"
          value={color[1]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 1)}
        />
      </Saturation>
      <Lightness>
        <LightnessSlider
          styles={sliderStyles}
          x={color[2]}
          xstep={1}
          onChange={({ x }) => handleChange(x, 2)}
          hue={color[0]}
          saturation={color[1]}
        />
        <LightnessEditableInput
          type="text"
          value={color[2]}
          onChange={e => handleChange(parseInt(e.target.value, 10), 2)}
        />
      </Lightness>
      <CopyButtons>
        <HiddenText className="copyHex" readOnly value={copyHex.join('\n').toString()} />
        <HexButton onClick={() => copy('.copyHex')}>Hex</HexButton>
        <HiddenText className="copyHSL" readOnly value={copyHSL.join('\n').toString()} />
        <HSLButton onClick={() => copy('.copyHSL')}>HSL</HSLButton>
        <HiddenText className="copyRGB" readOnly value={copyRGB.join('\n').toString()} />
        <RGBButton onClick={() => copy('.copyRGB')}>RGB</RGBButton>
      </CopyButtons>
    </Container>
  );
};
