/**
 * Unified error/empty state display component
 * Used by Map components to show consistent error and empty states
 */

import React from 'react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { Maps } from '@openai/apps-sdk-ui/components/Icon';

export interface ErrorStateDisplayProps {
  /**
   * State type to display
   */
  state: 'error' | 'empty';

  /**
   * Title text
   */
  title: string;

  /**
   * Message text (optional)
   */
  message?: string;

  /**
   * Action handler (for error state with retry)
   */
  onAction?: () => void;

  /**
   * Action button label
   */
  actionLabel?: string;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Container className
   */
  containerClassName?: string;
}

/**
 * Unified error/empty state display
 * Simplifies repetitive error/empty state rendering across Map components
 */
export const ErrorStateDisplay: React.FC<ErrorStateDisplayProps> = ({
  state,
  title,
  message,
  onAction,
  actionLabel,
  className,
  containerClassName,
}) => {
  // Error state uses Alert
  if (state === 'error') {
    const buttonLabel = actionLabel ?? 'Try again';

    return (
      <div className={containerClassName}>
        <Alert
          color="danger"
          variant="soft"
          title={title}
          description={message}
          actions={
            onAction ? (
              <Button color="primary" size="sm" variant="ghost" onClick={onAction}>
                {buttonLabel}
              </Button>
            ) : undefined
          }
          className={className}
        />
      </div>
    );
  }

  // Empty state uses EmptyMessage
  return (
    <div className={containerClassName}>
      <EmptyMessage fill="none" className={className}>
        <EmptyMessage.Icon>
          <Maps />
        </EmptyMessage.Icon>
        <EmptyMessage.Title>{title}</EmptyMessage.Title>
        {message && (
          <EmptyMessage.Description>
            <span style={{ whiteSpace: 'nowrap' }}>{message}</span>
          </EmptyMessage.Description>
        )}
      </EmptyMessage>
    </div>
  );
};

ErrorStateDisplay.displayName = 'ErrorStateDisplay';
