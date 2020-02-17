import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  padding: ${p => p.theme.sizing.large};
  align-self: flex-start;
`;

const Title = styled.h1`
  font-size: ${p => p.theme.fonts.medium};
`;

const Description = styled.h2`
  font-weight: 400;
  font-size: ${p => p.theme.fonts.small};
`;

export const Header = () => (
  <Container>
    <Title>Color Picker</Title>
    <Description>Simple control over your color palette</Description>
  </Container>
);
