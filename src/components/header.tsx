import React, { useState } from 'react';
import styled from 'styled-components';

import Octicon, { Info } from '@primer/octicons-react';

const Container = styled.header`
  padding: ${p => p.theme.sizing.large};
  padding-bottom: ${p => p.theme.sizing.medium};
  align-self: flex-start;
`;

const Title = styled.h1`
  font-size: ${p => p.theme.fonts.medium};
`;

const Description = styled.h2`
  font-weight: 400;
  font-size: ${p => p.theme.fonts.small};
  margin-bottom: ${p => p.theme.sizing.medium};
`;

const InfoLink = styled.a`
  font-style: italic;
  font-size: ${p => p.theme.fonts.small};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InfoIcon = styled(Octicon)``;

const InfoText = styled.span`
  padding-left: 0.5em;
`;

export const Header = () => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  return (
    <Container>
      <Title>Pickle</Title>
      <Description>Fine tuned control over your color palette</Description>
      <InfoLink onClick={() => setIsModalDisplayed(!isModalDisplayed)}>
        <InfoIcon icon={Info} verticalAlign="text-bottom" ariaLabel="Info" />
        <InfoText>What is this thing?</InfoText>
      </InfoLink>
      {/* <InfoModal visible={isModalDisplayed} /> */}
    </Container>
  );
};
