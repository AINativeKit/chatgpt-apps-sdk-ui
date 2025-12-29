import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  /**
   * Whether the sidebar is open.
   */
  open: boolean;

  /**
   * Optional callback when close is requested.
   * If provided, you should handle closing the sidebar in your state.
   */
  onClose?: () => void;

  /**
   * Content to display inside the sidebar.
   */
  children: React.ReactNode;

  /**
   * Which side the sidebar appears on.
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Width of the sidebar. Can be a number (pixels) or string (CSS value).
   * Uses --sidebar-width token by default (356px).
   */
  width?: number | string;

  /**
   * Offset from the top edge.
   * Uses --sidebar-top token by default.
   */
  top?: string;

  /**
   * Offset from the bottom edge.
   * Uses --sidebar-bottom token by default.
   */
  bottom?: string;

  /**
   * Horizontal offset from the edge (left or right based on position).
   * Uses --sidebar-inset token by default.
   */
  inset?: string;

  /**
   * Additional class name for the sidebar container.
   */
  className?: string;

  /**
   * Additional class name for the content wrapper.
   */
  contentClassName?: string;
}

/**
 * Sidebar - An animated slide-in panel positioned on the left or right edge.
 * Useful for detail panels, navigation drawers, and inspector views.
 *
 * The sidebar uses absolute positioning by default, so it should be placed
 * inside a relatively positioned container.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  open,
  // onClose is passed through for parent components; sidebar itself has no close button
  onClose: _onClose,
  children,
  position = 'right',
  width,
  top,
  bottom,
  inset,
  className,
  contentClassName,
}) => {
  void _onClose; // Suppress unused variable warning

  const slideFrom = position === 'right' ? '100%' : '-100%';

  // Build override styles only for props that are explicitly set
  const overrideStyles: Record<string, string> = {};
  if (width !== undefined) {
    overrideStyles['--sidebar-width-override'] =
      typeof width === 'number' ? `${width}px` : width;
  }
  if (top !== undefined) {
    overrideStyles['--sidebar-top-override'] = top;
  }
  if (bottom !== undefined) {
    overrideStyles['--sidebar-bottom-override'] = bottom;
  }
  if (inset !== undefined) {
    overrideStyles['--sidebar-inset-override'] = inset;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: slideFrom }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideFrom }}
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
          className={clsx(
            styles.sidebar,
            position === 'left' ? styles.left : styles.right,
            className
          )}
          style={overrideStyles as React.CSSProperties}
        >
          <div className={clsx(styles.content, contentClassName)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Sidebar.displayName = 'Sidebar';
