
import React, { Component, Children, ReactNode } from 'react';
import { TransitionMotion } from 'react-motion';
import {
  TransitionPlainStyle,
  TransitionStyle,
  Style,
  PlainStyle,
  OpaqueConfig,
} from 'react-motion/lib/Types';
import Backdrop, { BackdropTheme } from 'lib.components.backdrop';

import { getContentStyles } from './utils';
import ContentWrapper from './ContentWrapper';
import OuterWrapper from './OuterWrapper';
import PureWrapper from './PureWrapper';

export type Position = 'fixed' | 'absolute';
export type OrientationX = 'left' | 'center' | 'right';
export type OrientationY = 'top' | 'center' | 'bottom';

type Props = {
  children?: ReactNode | null;
  position?: Position;
  orientationX?: OrientationX;
  orientationY?: OrientationY;
  /** css length, default: '0' */
  outerOffsetTop?: string;
  /** css length, default: '0' */
  outerOffsetBottom?: string;
  /** spacing unit */
  spacingTop?: number;
  spacingRight?: number;
  spacingBottom?: number;
  spacingLeft?: number;
  /** css length */
  contentMaxHeight?: string;
  /** css length */
  contentMaxWidth?: string;
  /** spans content to available height inside outer container */
  growContent?: boolean;
  backdropTheme?: BackdropTheme | null;
  onBackdropClick?: (() => void) | null;
  zIndex?: number | string;

  initialStyle: {
    backdropOpacity?: number;
    opacity?: number;
    translateY?: number;
    scale?: number;
  };
  enterStyle: {
    backdropOpacity?: OpaqueConfig | number;
    opacity?: OpaqueConfig | number;
    translateY?: OpaqueConfig | number;
    scale?: OpaqueConfig | number;
  };
  leaveStyle: {
    backdropOpacity?: OpaqueConfig | number;
    opacity?: OpaqueConfig | number;
    translateY?: OpaqueConfig | number;
    scale?: OpaqueConfig | number;
  };
};

class RealWorld extends Component<Props> {
  get transitions(): Array<TransitionStyle> {
    const { children, enterStyle } = this.props;

    if (!children) {
      return [];
    }

    return [
      {
        key: 'animation-drawer',
        data: Children.toArray(children),
        style: enterStyle,
      },
    ];
  }

  handleEnter = (): PlainStyle => this.props.initialStyle;

  handleLeave = (): Style => this.props.leaveStyle;

  stopPropagation = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  renderComponent = (
    interpolations: Array<TransitionPlainStyle>,
  ): ReactNode => {
    if (interpolations.length === 0) {
      return null;
    }

    const {
      position = 'fixed',
      orientationX = 'center',
      orientationY = 'bottom',
      outerOffsetTop,
      outerOffsetBottom,
      spacingTop,
      spacingRight,
      spacingBottom,
      spacingLeft,
      contentMaxHeight,
      contentMaxWidth,
      growContent,
      backdropTheme = 'dark',
      onBackdropClick,
      zIndex,
    } = this.props;

    const [{ style, data }] = interpolations;
    const { backdropOpacity = null, ...restStyle } = style;

    const backdropStyle = {
      opacity: backdropOpacity !== null ? backdropOpacity : null,
    };

    // $FlowFixMe - StyleProperties is more defined than PlainStyle Type
    const contentStyle = getContentStyles(restStyle);

    return (
      <OuterWrapper
        position={position}
        outerOffsetTop={outerOffsetTop}
        outerOffsetBottom={outerOffsetBottom}
        orientationX={orientationX}
        orientationY={orientationY}
        spacingTop={spacingTop}
        spacingRight={spacingRight}
        spacingBottom={spacingBottom}
        spacingLeft={spacingLeft}
        zIndex={zIndex}
        onClick={onBackdropClick}
      >
        {backdropTheme && (
          // eslint-disable-next-line react/forbid-component-props
          <Backdrop style={backdropStyle} theme={backdropTheme} />
        )}

        <ContentWrapper
          contentMaxHeight={contentMaxHeight}
          contentMaxWidth={contentMaxWidth}
          growContent={growContent}
          onClick={this.stopPropagation}
          // eslint-disable-next-line react/forbid-component-props
          style={contentStyle}
        >
          <PureWrapper>{data}</PureWrapper>
        </ContentWrapper>
      </OuterWrapper>
    );
  };

  render(): ReactNode {
    return (
      <TransitionMotion
        styles={this.transitions}
        willEnter={this.handleEnter}
        willLeave={this.handleLeave}
      >
        {
          // Marking renderComponent as any because TransitionMotion doesn't take Node instead of Element yet.
          this.renderComponent as any
        }
      </TransitionMotion>
    );
  }
}

export default Foo;
