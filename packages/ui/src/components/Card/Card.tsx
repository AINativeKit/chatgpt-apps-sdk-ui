import React from 'react';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import styles from './Card.module.css';

/**
 * Elevation level for Card component (0-4)
 * Maps to apps-sdk-ui shadow tokens: --shadow-100 through --shadow-400
 */
export type ElevationLevel = 0 | 1 | 2 | 3 | 4;

import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardImage } from './CardImage';
import { CardActions, CardActionButton } from './CardActions';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';
import { CardMeta } from './CardMeta';
import { CardChipGroup } from './CardChipGroup';
import { CardBadge } from './CardBadge';
import { CardChip } from './CardChip';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Skeleton } from '../Skeleton';

/**
 * Maps elevation levels to apps-sdk-ui shadow tokens
 */
const ELEVATION_TO_SHADOW: Record<ElevationLevel, string> = {
  0: 'none',
  1: 'var(--shadow-100)',
  2: 'var(--shadow-200)',
  3: 'var(--shadow-300)',
  4: 'var(--shadow-400)',
};

export type CardBorder = 'light' | 'default' | 'heavy';

export interface CardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'color'> {
  /**
   * Elevation level for the card.
   * @default 1
   */
  elevationLevel?: ElevationLevel;
  /**
   * Border weight token.
   * @default 'heavy'
   */
  border?: CardBorder;
  /**
   * Elevation applied on hover when `interactive` is true.
   * Defaults to the next elevation level.
   */
  hoverElevationLevel?: ElevationLevel;
  /**
   * Enables hover affordance.
   * @default false
   */
  interactive?: boolean;
  /**
   * Padding for the card. Can be a CSS value string or number (in px).
   * @default '48px'
   */
  padding?: string | number;
  /**
   * Show loading skeleton state
   * @default false
   */
  loading?: boolean;
  /**
   * Custom skeleton content to show when loading
   * If not provided, shows default skeleton layout
   */
  skeleton?: React.ReactNode;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error title to display
   * @default 'Something went wrong'
   */
  errorTitle?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Retry handler for error state
   * When provided, shows a retry button
   */
  onErrorRetry?: () => void;
  /**
   * Custom error content to show when error is true
   * If not provided, shows default error message
   */
  errorContent?: React.ReactNode;
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

const BORDER_TOKENS: Record<CardBorder, string> = {
  light: 'var(--color-border-subtle)',
  default: 'var(--color-border)',
  heavy: 'var(--color-border-strong)',
};

const clampElevation = (level: number): ElevationLevel => {
  return Math.max(0, Math.min(4, level)) as ElevationLevel;
};

const CardBase = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    elevationLevel = 1,
    border = 'heavy',
    hoverElevationLevel,
    interactive = false,
    padding = 'calc(var(--spacing) * 4)',
    loading = false,
    skeleton,
    error = false,
    errorTitle,
    errorMessage,
    onErrorRetry,
    errorContent,
    className,
    style,
    children,
    'data-testid': testId,
    ...rest
  } = props;

  const hoverLevel = hoverElevationLevel ?? clampElevation(elevationLevel + (interactive ? 1 : 0));
  const elevationShadowVar = ELEVATION_TO_SHADOW[elevationLevel];
  const hoverShadowVar = ELEVATION_TO_SHADOW[hoverLevel];

  const baseStyle: CSSProperties = {
    '--card-border-color': BORDER_TOKENS[border],
    '--card-shadow-value': elevationShadowVar,
    '--card-hover-shadow-value': hoverShadowVar,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
  } as React.CSSProperties;

  const mergedStyle = { ...baseStyle, ...style } as CSSProperties;

  // Default skeleton layout if loading and no custom skeleton provided
  const defaultSkeleton = (
    <>
      <Skeleton height={200} style={{ marginBottom: 12 }} />
      <Skeleton height={16} width="60%" style={{ marginBottom: 8 }} />
      <Skeleton height={16} width="80%" />
    </>
  );

  // Default error layout if error and no custom error content provided
  const defaultError = (
    <Alert
      color="danger"
      variant="soft"
      title={errorTitle ?? 'Something went wrong'}
      description={errorMessage}
      actions={
        onErrorRetry ? (
          <Button color="primary" size="sm" variant="ghost" onClick={onErrorRetry}>
            Retry
          </Button>
        ) : undefined
      }
    />
  );

  // Determine what to render
  let content: React.ReactNode;
  if (loading) {
    content = skeleton ?? defaultSkeleton;
  } else if (error) {
    content = errorContent ?? defaultError;
  } else {
    content = children;
  }

  return (
    <div
      ref={ref}
      className={cn(styles.card, className)}
      style={mergedStyle}
      data-hover={interactive}
      data-interactive={interactive}
      data-testid={testId}
      aria-busy={loading}
      {...rest}
    >
      {content}
    </div>
  );
});

CardBase.displayName = 'Card';

// Compound Components
const CardWithCompounds = Object.assign(CardBase, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
  Actions: CardActions,
  ActionButton: CardActionButton,
  Title: CardTitle,
  Description: CardDescription,
  Meta: CardMeta,
  ChipGroup: CardChipGroup,
  Badge: CardBadge,
  Chip: CardChip,
});

export { CardWithCompounds as Card };
