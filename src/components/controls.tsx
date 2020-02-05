import React from 'react';
import styled from 'styled-components';

const Slider = styled.input`
  margin-top: ${p => p.theme.sizing.small};
`;

export const Controls = () => (
  <>
    <Slider type="range" name="hue" min="0" max="255" value="128" />
    <Slider type="range" name="sat" min="0" max="100" />
    <Slider type="range" name="lit" min="0" max="100" />
  </>
);
