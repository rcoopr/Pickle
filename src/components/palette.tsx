import React from 'react';
import styled from 'styled-components';

import { hslArrayToString } from 'utils/hslConvert';
import { useSelector } from 'react-redux';
import { selectSwatches } from 'redux/paletteSlice';

interface Swatch {
  bg: string;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10vw;
  height: ${p => p.theme.sizing.palette}px;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05),
    0 0.9px 2.2px rgba(0, 0, 0, 0.017), 0 2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 5.3px 13.5px rgba(0, 0, 0, 0.033), 0 23px 54px rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 6%;
  height: 80%;
`;

const Swatch = styled.div.attrs<Swatch>(p => ({
  style: {
    background: `${p.bg}`,
  },
}))<Swatch>`
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  border-radius: 4px;
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ToneValue = styled.div`
  font-size: ${p => p.theme.fonts.small};
  font-weight: 700;
  padding-top: ${p => p.theme.sizing.small};
`;

const ColorCode = styled.div`
  font-size: ${p => p.theme.fonts.smallest};
  text-align: center;
`;

export const Palette = () => {
  const swatches = useSelector(selectSwatches);

  return (
    <Container>
      {swatches.map(([H, S, L], i) => {
        const [hue, sat, light] = [H, S, L].map(each => Math.round(each));
        const colorString = hslArrayToString([H, S, L]);

        return (
          <Wrapper key={colorString}>
            <Swatch bg={colorString} />
            <ToneValue>{(i + 1) * 100}</ToneValue>
            <ColorCode>{`[${hue} ${sat} ${light}]`}</ColorCode>
          </Wrapper>
        );
      })}
    </Container>
  );
};
