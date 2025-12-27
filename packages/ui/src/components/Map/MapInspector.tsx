import React from 'react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { CloseBold } from '@openai/apps-sdk-ui/components/Icon';
import { Features } from '../Feature';
import { PhotoCarousel } from '../PhotoCarousel';
import { ExpandableText } from '../ExpandableText';
import { Sidebar } from '../Sidebar';
import { Modal } from '../Modal';
import { AvatarList } from '../AvatarList';
import { useBreakpoint } from '@/hooks/useBreakpoint';
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

/**
 * Shared content component for MapInspector.
 */
const MapInspectorContent: React.FC<{
  location: LocationData;
  onClose: () => void;
}> = ({ location, onClose }) => (
  <>
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
              <Button
                key={index}
                color={action.variant === 'secondary' ? 'secondary' : 'primary'}
                variant={action.variant === 'secondary' ? 'outline' : 'solid'}
                size="xl"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
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

      {/* Lists Section */}
      {location.lists &&
        location.lists.map((list) => (
          <div key={list.title} className={styles.listSection}>
            <AvatarList title={list.title} items={list.items} />
          </div>
        ))}
    </div>
  </>
);

export const MapInspector: React.FC<MapInspectorProps> = ({ location, onClose, className }) => {
  const isDesktop = useBreakpoint('lg');
  const isMobile = !isDesktop;

  if (!location) return null;

  if (isMobile) {
    return (
      <Modal
        open={!!location}
        onClose={onClose}
        width={356}
        maxWidth="min(90vw, 356px)"
        maxHeight="min(85vh, 600px)"
        className={className}
        contentClassName={styles.content}
      >
        <MapInspectorContent location={location} onClose={onClose} />
      </Modal>
    );
  }

  return (
    <Sidebar
      open={!!location}
      onClose={onClose}
      position="right"
      width={356}
      top="calc(calc(var(--spacing) * 2) + calc(var(--spacing) * 3))"
      bottom="calc(var(--spacing) * 3)"
      inset="calc(calc(var(--spacing) * 2) + calc(var(--spacing) * 3))"
      className={className}
      contentClassName={styles.content}
    >
      <MapInspectorContent location={location} onClose={onClose} />
    </Sidebar>
  );
};

MapInspector.displayName = 'MapInspector';
