import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Icon from 'lib.components.icon';
import Text from 'lib.components.text';
import spacing from 'lib.utils.style.spacing';
import config from 'lib.config.style';

type Props = {
  label: string;
  icon: string;
  /**
   * - circle background color as css color string
   * - default: `config.colors.silent`
   */
  circleColor?: string;
};

const { colors } = config;

const Circle = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: ${spacing(3)};
  border-radius: 50%;
  transition: background 150ms ease-in;

  ${({ circleColor }: Props) =>
    circleColor &&
    `
    background-color: ${circleColor};
  `}
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: left;

  /* fake-darken Circle color on hover */
  &:hover ${Circle} {
    background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15));
  }
`;

const ShareButton = (props: Props): ReactNode => {
  const { icon, circleColor = colors.silent, label, ...rest } = props;

  // eslint-disable-next-line
  return (
    <button type="button" {...rest}>
      <FlexWrapper>
        <Circle circleColor={circleColor}>
          <Icon fill={colors.inverseText} symbol={icon} size="1.5rem" />
        </Circle>

        <Text size="lg" tagName="div">
          {label}
        </Text>
      </FlexWrapper>
    </button>
  );
};

export default ShareButton;
