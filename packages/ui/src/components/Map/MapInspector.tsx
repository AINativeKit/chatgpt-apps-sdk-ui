import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { CloseBold } from '@openai/apps-sdk-ui/components/Icon';
import { Features } from '../Feature';
import { PhotoCarousel } from '../PhotoCarousel';
import { ExpandableText } from '../ExpandableText';
import { cn } from '../../utils/cn';
import { GenericList } from './GenericList';
import type { LocationData } from './types';
import styles from './MapInspector.module.css';

export interface MapInspectorProps {
  /**
   * Location data to display.
   */
  location: LocationData;

  /**
   * Callback when the close button is clicked.
   */
  onClose: () => void;

  /**
   * Additional class name.
   */
  className?: string;
}

export const MapInspector: React.FC<MapInspectorProps> = ({ location, onClose, className }) => {
  // Mobile detection for responsive behavior
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with matchMedia for more reliable detection
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 1023px)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Use the modern addEventListener API if available, fallback to deprecated addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  if (!location) return null;

  // Animation variants
  const modalVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
          className={styles.backdrop}
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Inspector with responsive layout */}
      <motion.div
        key={`${location.id}-${isMobile}`}
        initial={isMobile ? modalVariants.initial : { opacity: 0, x: '100%' }}
        animate={isMobile ? modalVariants.animate : { opacity: 1, x: 0 }}
        exit={isMobile ? modalVariants.exit : { opacity: 0, x: '100%' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
        className={cn(styles.inspector, isMobile ? styles.modal : styles.sidebar, className)}
      >
        <motion.div
          className={styles.content}
          initial={cardVariants.initial}
          animate={cardVariants.animate}
          exit={cardVariants.exit}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        >
          <Button
            color="secondary"
            variant="ghost"
            uniform
            size="sm"
            aria-label="Close details"
            className={styles.closeButton}
            onClick={onClose}
          >
            <CloseBold />
          </Button>
          <div className={styles.scrollableContent}>
            {/* Photo Carousel or Single Image */}
            {location.images && location.images.length > 0 ? (
              <PhotoCarousel
                images={location.images}
                topOverlay={location.topOverlay}
                aspectRatio="5/4"
                showDots
                showArrows
                className={styles.photoCarousel}
              />
            ) : (
              <div className={styles.imageContainer}>
                <img src={location.thumbnail} alt={location.name} className={styles.heroImage} />
              </div>
            )}

            <div className={styles.detailsSection}>
              <div className={styles.title}>{location.name}</div>
              {location.subtitle && <div className={styles.subtitle}>{location.subtitle}</div>}
              {location.features && location.features.length > 0 && (
                <Features items={location.features} iconSize={14} className={styles.features} />
              )}
              {location.actions && location.actions.length > 0 && (
                <div className={styles.actions}>
                  {location.actions.map((action, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={action.onClick}
                      className={
                        action.variant === 'secondary'
                          ? styles.secondaryButton
                          : styles.primaryButton
                      }
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              {location.headline && <div className={styles.headline}>{location.headline}</div>}
              {location.description && (
                <ExpandableText
                  text={location.description}
                  maxLines={5}
                  className={styles.description}
                />
              )}
              {location.bottomAction && (
                <div className={styles.bottomAction}>
                  <Button
                    color="secondary"
                    variant="outline"
                    onClick={location.bottomAction.onClick}
                    className={styles.bottomActionButton}
                  >
                    {location.bottomAction.label}
                  </Button>
                </div>
              )}
            </div>

            {/* Generic Lists Section */}
            {location.lists &&
              location.lists.map((list) => <GenericList key={list.title} list={list} />)}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

MapInspector.displayName = 'MapInspector';
