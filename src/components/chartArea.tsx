import React from 'react';
import styled from 'styled-components';

import { IGraphProps } from 'components/graph';

const Canvas = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  grid-area: 1 / 2 / 2 / 3;
  border-left: 2px solid ${p => p.theme.colors.primary};
  border-bottom: 2px solid ${p => p.theme.colors.primary};
`;

const Grid = styled.div<IGrid>`
  width: 100%;
  height: 100%;
  background-size: 25px 25px;
  background-image: linear-gradient(to right, ${p => p.theme.colors.secondary} 1px, transparent 1px),
    linear-gradient(to bottom, ${p => p.theme.colors.secondary} 1px, transparent 1px);
  box-shadow: inset 0px 0px 10px 14px ${p => p.theme.colors.tertiary};
`;

const SVGCanvas = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

interface IGrid {
  width: number;
  height: number;
}

interface IChartArea {
  data: number[][];
  width: number;
  height: number;
}

export const ChartArea = ({ data, xAxis, yAxis, width, height }: IGraphProps) => {
  return (
    <Canvas>
      <Grid width={width} height={height} />
      <SVGCanvas width={width} height={height}>
        {data.map(color => {
          const [h, s, l] = color;
          const fill = `hsl(${h}, ${s}%, ${l}%)`;
          const maxVal = (channel: number) => (channel === 0 ? 360 : 100);

          const unscaledX = (width * color[xAxis.channel]) / maxVal(xAxis.channel);
          const unscaledY = (height * color[yAxis.channel]) / maxVal(yAxis.channel);

          const x = ((25 + unscaledX) * (width - 50)) / width;
          const y = ((height + 25 - unscaledY) * (height - 50)) / height;
          return (
            <g>
              <circle cx={x} cy={y} r="10" fill="white" />
              <circle cx={x} cy={y} r="8" fill={fill} />
            </g>
          );
        })}
      </SVGCanvas>
    </Canvas>
  );
};
