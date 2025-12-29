import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ExpandableText.module.css';

export interface ExpandableTextProps {
  /**
   * Text content to display.
   */
  text: string;

  /**
   * Maximum number of lines to show when collapsed
   * @default 5
   */
  maxLines?: number;

  /**
   * Label for expand button
   * @default 'view more'
   */
  expandLabel?: string;

  /**
   * Label for collapse button
   * @default 'view less'
   */
  collapseLabel?: string;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ExpandableText - Text component with CSS line-clamp and expand/collapse functionality.
 *
 * @example
 * ```tsx
 * <ExpandableText
 *   text="Long description text..."
 *   maxLines={3}
 *   expandLabel="Read more"
 *   collapseLabel="Read less"
 * />
 * ```
 */
export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLines = 5,
  expandLabel = 'view more',
  collapseLabel = 'view less',
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Check if text is actually clamped (scrollHeight > clientHeight)
  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [text, maxLines]);

  return (
    <div className={clsx(styles.expandableText, className)}>
      <div
        ref={textRef}
        className={clsx(styles.text, !expanded && styles.clamped)}
        style={{ '--max-lines': maxLines } as React.CSSProperties}
      >
        {text}
      </div>
      {(isClamped || expanded) && (
        <button
          className={styles.toggleButton}
          onClick={() => setExpanded(!expanded)}
          type="button"
          aria-expanded={expanded}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      )}
    </div>
  );
};

ExpandableText.displayName = 'ExpandableText';
