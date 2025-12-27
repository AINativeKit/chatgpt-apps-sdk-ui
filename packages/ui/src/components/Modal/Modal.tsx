import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import styles from './Modal.module.css';

export interface ModalProps {
  /**
   * Whether the modal is open.
   */
  open: boolean;

  /**
   * Callback when the modal should close.
   * Called when backdrop is clicked (if closeOnBackdropClick is true)
   * or when Escape key is pressed.
   */
  onClose: () => void;

  /**
   * Content to display inside the modal.
   */
  children: React.ReactNode;

  /**
   * Width of the modal. Can be a number (pixels) or string (CSS value).
   * Uses --modal-width token by default (356px).
   */
  width?: number | string;

  /**
   * Maximum width of the modal.
   * Uses --modal-max-width token by default (90vw).
   */
  maxWidth?: string;

  /**
   * Maximum height of the modal.
   * Uses --modal-max-height token by default.
   */
  maxHeight?: string;

  /**
   * Whether to show the backdrop.
   * @default true
   */
  showBackdrop?: boolean;

  /**
   * Whether clicking the backdrop closes the modal.
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing Escape closes the modal.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to prevent body scroll when modal is open.
   * @default true
   */
  lockBodyScroll?: boolean;

  /**
   * Whether to use absolute positioning within a container instead of fixed.
   * Useful for embedding modals in contained areas like Storybook stories.
   * @default false
   */
  contained?: boolean;

  /**
   * Additional class name for the modal container.
   */
  className?: string;

  /**
   * Additional class name for the content wrapper.
   */
  contentClassName?: string;
}

/**
 * Modal - A centered overlay panel with backdrop.
 * Useful for dialogs, detail views, and focused interactions.
 *
 * Features:
 * - Animated entrance/exit with fade and scale
 * - Backdrop with blur effect
 * - Click outside to close (optional)
 * - Escape key to close (optional)
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  width,
  maxWidth,
  maxHeight,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  lockBodyScroll = true,
  contained = false,
  className,
  contentClassName,
}) => {
  // Build override styles only for props that are explicitly set
  const overrideStyles: Record<string, string> = {};
  if (width !== undefined) {
    overrideStyles['--modal-width-override'] =
      typeof width === 'number' ? `${width}px` : width;
  }
  if (maxWidth !== undefined) {
    overrideStyles['--modal-max-width-override'] = maxWidth;
  }
  if (maxHeight !== undefined) {
    overrideStyles['--modal-max-height-override'] = maxHeight;
  }

  // Handle Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Prevent body scroll when modal is open (disabled in contained mode)
  const shouldLockScroll = lockBodyScroll && !contained;
  useEffect(() => {
    if (open && shouldLockScroll) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open, shouldLockScroll]);

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {showBackdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
              className={cn(styles.backdrop, contained && styles.contained)}
              onClick={handleBackdropClick}
              role="presentation"
            />
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
            className={cn(styles.modal, contained && styles.contained, className)}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className={cn(styles.content, contentClassName)}
              style={overrideStyles as React.CSSProperties}
              onClick={handleContentClick}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';
