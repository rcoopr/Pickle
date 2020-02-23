import React from 'react';
import styled from 'styled-components';

import Color from 'color';
import useClipboard from 'react-use-clipboard';

const SwatchWrapper = styled.div`
  width: 7%;
  max-width: 65px;
`;

const Button = styled.button.attrs<Button>(p => ({
  style: {
    background: `${p.hex}`,
  },
}))<Button>``;

const StyledButton = styled(Button)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 99em;
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  -webkit-appearance: none;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms transform;

  &:hover {
    transform: scale(1.15);
  }
`;

const ButtonText = styled.span<ButtonText>`
  opacity: ${p => (p.isShown ? 1 : 0)};
  color: ${p => (p.textColor ? 'black' : 'white')};
  transition: 200ms transform;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  position: relative;
`;

const ToneValue = styled.div<ToneValue>`
  font-weight: 700;
  text-align: center;

  transform: ${p => p.isFaded && 'translateY(1em)'};
  font-size: ${p => p.theme.fonts.small};
  padding-top: ${p => p.theme.sizing.small};
  transition: 200ms transform;
`;

const ColorCode = styled.div<ColorCode>`
  text-align: center;
  border-radius: 1vw;
  transition: 200ms transform;

  transform-origin: center bottom;
  background: ${p => p.theme.colors.secondary};
  transform: ${p => p.isExpanded && 'scale(2)'};
  font-size: ${p => p.theme.fonts.smallest};
`;

interface ToneValue {
  isFaded: boolean;
}

interface ColorCode {
  isExpanded: boolean;
}

interface ButtonText {
  isShown: boolean;
  textColor: boolean;
}

interface Button {
  hex: string;
  onClick: () => void;
}

interface Swatch {
  hex: string;
  index: number;
}

export const Swatch = ({ hex, index }: Swatch) => {
  const [isCopied, setCopied] = useClipboard(hex, { successDuration: 600 });
  const isBackgroundLight = Color(hex).isLight();

  return (
    <SwatchWrapper>
      <ButtonWrapper>
        <StyledButton hex={hex} onClick={setCopied}>
          <ButtonText isShown={isCopied} textColor={isBackgroundLight}>
            Copied!
          </ButtonText>
        </StyledButton>
      </ButtonWrapper>
      <ToneValue isFaded={isCopied}>{(index + 1) * 100}</ToneValue>
      <ColorCode isExpanded={isCopied}>{hex}</ColorCode>
    </SwatchWrapper>
  );
};
