import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ButtonProps, PrimitiveProps } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useStyles } from '../shared/styleUtils';

export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  PrimitiveProps<ButtonProps, 'button'>
>(
  (
    {
      ariaLabel,
      className,
      children,
      isFullWidth = false,
      isDisabled,
      isLoading,
      loadingText = '',
      size,
      style,
      type = 'button',
      variation,
      testId,
      ...rest
    },
    ref
  ) => {
    const { propStyles, nonStyleProps } = useStyles(rest, style);

    return (
      <button
        ref={ref}
        className={classNames(
          ComponentClassNames.Button,
          classNameModifier(ComponentClassNames.Button, size),
          classNameModifier(ComponentClassNames.Button, variation),
          className
        )}
        data-fullwidth={isFullWidth}
        data-loading={isLoading}
        data-size={size}
        data-variation={variation}
        disabled={isDisabled || isLoading}
        type={type}
        data-testid={testId}
        aria-label={ariaLabel}
        style={propStyles}
        {...nonStyleProps}
      >
        {children}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';
