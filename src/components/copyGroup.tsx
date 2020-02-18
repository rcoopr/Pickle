import React, { useRef } from 'react';
import styled from 'styled-components';

import { swatchesHex, swatchesHSL, swatchesRGB, formatStringsToCopy } from 'utils/hslConvert';

const Container = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.li`
  width: 60%;
`;

const Button = styled.button`
  -webkit-appearance: none;
  background: none;
  border: 1px solid ${p => p.theme.colors.primary};
  border-radius: 4px;
  outline: none;
  width: 100%;
  height: ${p => p.theme.sizing.large};
  color: ${p => p.theme.colors.primary};
  font-weight: 700;
  opacity: 0.8;
  margin-top: ${p => p.theme.sizing.small};
  transition: 200ms all;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &:active {
    color: white;
    background: ${p => p.theme.colors.primary};
    transition: 40ms all;
  }
`;

const HiddenText = styled.textarea`
  position: absolute;
  top: -999em;
  left: -999em;
`;

interface CopyButton {
  string: string;
  format: string;
}

interface CopyGroup {
  swatches: number[][];
}

const CopyButton = ({ string, format }: CopyButton) => {
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  const copy = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current !== null) {
      const copyText = ref.current;
      copyText.select();
      document.execCommand('copy');
    }
  };

  return (
    <Wrapper>
      <HiddenText readOnly value={string} ref={TextAreaRef} />
      <Button onClick={() => copy(TextAreaRef)}>{`Copy ${format} values`}</Button>
    </Wrapper>
  );
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
