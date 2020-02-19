import React from 'react';
import styled from 'styled-components';
import useClipboard from 'react-use-clipboard';

import { swatchesHex, swatchesHSL, swatchesRGB, formatStringsToCopy } from 'utils/hslConvert';

const Container = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  -webkit-appearance: none;
  background-color: white;
  border: 1px solid ${p => p.theme.colors.primary};
  border-radius: 4px;
  outline: none;
  width: 60%;
  height: ${p => p.theme.sizing.large};
  color: ${p => p.theme.colors.primary};
  font-weight: 700;
  margin-top: ${p => p.theme.sizing.small};
  transition: color 400ms 1000ms ease, background-color 400ms 1000ms ease, transform 200ms;

  &:hover {
    background-color: white;
    color: ${p => p.theme.colors.primary};
    border-color: ${p => p.theme.colors.accent};
    opacity: 1;
    transform: scale(1.05);
    transition: 200ms transform, color 400ms 1000ms, 400ms 1000ms background-color;
  }

  &:active {
    color: white;
    background-color: ${p => p.theme.colors.primary};
    transition: 40ms all;
  }
`;

interface CopyButton {
  string: string;
  format: string;
}

interface CopyGroup {
  swatches: number[][];
}

const CopyButton = ({ string, format }: CopyButton) => {
  const [isCopied, setCopied] = useClipboard(string, { successDuration: 1000 });

  return <Button onClick={setCopied}>{isCopied ? 'Copied!' : `Copy ${format} values`}</Button>;
};

export const CopyGroup = ({ swatches }: CopyGroup) => {
  const formats = ['Hex', 'HSL', 'RGB'];
  const formatters = [swatchesHex, swatchesHSL, swatchesRGB];

  const copyStrings = formatters.map(formatter => formatStringsToCopy(formatter(swatches)));

  return (
    <Container>
      {copyStrings.map((string, i) => (
        <CopyButton string={string.join('\n').toString()} format={formats[i]} key={formats[i]} />
      ))}
    </Container>
  );
};
