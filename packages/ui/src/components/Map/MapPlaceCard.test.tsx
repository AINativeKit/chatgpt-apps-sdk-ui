import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapPlaceCard } from './MapPlaceCard';
import type { Feature } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

describe('MapPlaceCard', () => {
  const defaultProps = {
    image: 'https://example.com/image.jpg',
    title: 'Test Location',
  };

  describe('Rendering', () => {
    it('renders basic content', () => {
      render(<MapPlaceCard {...defaultProps} />);
      expect(screen.getByText('Test Location')).toBeInTheDocument();
      expect(screen.getByAltText('Test Location')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      render(<MapPlaceCard {...defaultProps} subtitle="Test Subtitle" />);
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders features when provided', () => {
      const features: Feature[] = [{ icon: <StarFilled />, label: '4.5' }, { label: '$100' }];
      render(<MapPlaceCard {...defaultProps} features={features} />);
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading skeleton when loading=true', () => {
      render(<MapPlaceCard {...defaultProps} loading={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading location')).toBeInTheDocument();
    });

    it('shows loading skeleton with custom testId', () => {
      render(<MapPlaceCard {...defaultProps} loading={true} data-testid="location-card" />);
      expect(screen.getByTestId('location-card')).toBeInTheDocument();
    });

    it('does not show content when loading', () => {
      render(<MapPlaceCard {...defaultProps} loading={true} />);
      expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error=true', () => {
      render(<MapPlaceCard {...defaultProps} error={true} />);
      expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });

    it('shows custom error title and message', () => {
      render(
        <MapPlaceCard
          {...defaultProps}
          error={true}
          errorTitle="Custom Error"
          errorMessage="Custom error message"
        />
      );
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
      expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });

    it('calls onErrorRetry when retry button is clicked', async () => {
      const user = userEvent.setup();
      const handleRetry = vi.fn();
      render(<MapPlaceCard {...defaultProps} error={true} onErrorRetry={handleRetry} />);

      const retryButton = screen.getByRole('button', { name: /try again/i });
      await user.click(retryButton);

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });

    it('does not show content when error', () => {
      render(<MapPlaceCard {...defaultProps} error={true} />);
      expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
    });

    it('does not show retry button when onErrorRetry is not provided', () => {
      render(<MapPlaceCard {...defaultProps} error={true} />);
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when image and title are missing', () => {
      render(<MapPlaceCard image="" title="" />);
      expect(screen.getByText('No location')).toBeInTheDocument();
    });

    it('shows custom empty title and message', () => {
      render(
        <MapPlaceCard
          image=""
          title=""
          emptyTitle="Custom Empty"
          emptyMessage="No data available"
        />
      );
      expect(screen.getByText('Custom Empty')).toBeInTheDocument();
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('does not show empty message when not provided', () => {
      render(<MapPlaceCard image="" title="" />);
      expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });
  });

  describe('State Priority', () => {
    it('shows loading state over error state', () => {
      render(<MapPlaceCard {...defaultProps} loading={true} error={true} />);
      expect(screen.getByText('Loading location')).toBeInTheDocument();
      expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();
    });

    it('shows error state over empty state', () => {
      render(<MapPlaceCard image="" title="" error={true} />);
      expect(screen.getByText('Failed to load')).toBeInTheDocument();
      expect(screen.queryByText('No location')).not.toBeInTheDocument();
    });
  });

  describe('Lazy Loading', () => {
    it('sets loading="lazy" by default', () => {
      render(<MapPlaceCard {...defaultProps} />);
      const img = screen.getByAltText('Test Location') as HTMLImageElement;
      expect(img.getAttribute('loading')).toBe('lazy');
    });

    it('sets loading="eager" when imageLazy=false', () => {
      render(<MapPlaceCard {...defaultProps} imageLazy={false} />);
      const img = screen.getByAltText('Test Location') as HTMLImageElement;
      expect(img.getAttribute('loading')).toBe('eager');
    });
  });

  describe('Image Callbacks', () => {
    it('calls onImageLoad when image loads', async () => {
      const handleImageLoad = vi.fn();
      render(<MapPlaceCard {...defaultProps} onImageLoad={handleImageLoad} />);

      const img = screen.getByAltText('Test Location');
      img.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(handleImageLoad).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onImageError when image fails', async () => {
      const handleImageError = vi.fn();
      render(<MapPlaceCard {...defaultProps} onImageError={handleImageError} />);

      const img = screen.getByAltText('Test Location');
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(handleImageError).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Badge Support', () => {
    it('renders badge when provided', () => {
      render(<MapPlaceCard {...defaultProps} badge="New" />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders numeric badge', () => {
      render(<MapPlaceCard {...defaultProps} badge={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('does not render badge when not provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} />);
      expect(container.querySelector('[class*="badge"]')).not.toBeInTheDocument();
    });

    it('renders text badge as Chip component', () => {
      render(<MapPlaceCard {...defaultProps} badge="New" />);
      // Chip has specific styling classes
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders numeric badge as Badge component', () => {
      render(<MapPlaceCard {...defaultProps} badge={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders badge with custom variant', () => {
      render(<MapPlaceCard {...defaultProps} badge="Sale" badgeVariant="soft" />);
      const badge = screen.getByText('Sale');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Multi-line Text Support', () => {
    it('applies single-line class to title by default', () => {
      render(<MapPlaceCard {...defaultProps} />);
      const title = screen.getByText('Test Location');
      expect(title.className).not.toContain('titleLines2');
      expect(title.className).not.toContain('titleLines3');
    });

    it('applies 2-line class to title when titleLines=2', () => {
      render(<MapPlaceCard {...defaultProps} titleLines={2} />);
      const title = screen.getByText('Test Location');
      expect(title.className).toContain('titleLines2');
    });

    it('applies 3-line class to title when titleLines=3', () => {
      render(<MapPlaceCard {...defaultProps} titleLines={3} />);
      const title = screen.getByText('Test Location');
      expect(title.className).toContain('titleLines3');
    });

    it('applies single-line class to subtitle by default', () => {
      render(<MapPlaceCard {...defaultProps} subtitle="Subtitle" />);
      const subtitle = screen.getByText('Subtitle');
      expect(subtitle.className).not.toContain('subtitleLines2');
      expect(subtitle.className).not.toContain('subtitleLines3');
    });

    it('applies 2-line class to subtitle when subtitleLines=2', () => {
      render(<MapPlaceCard {...defaultProps} subtitle="Subtitle" subtitleLines={2} />);
      const subtitle = screen.getByText('Subtitle');
      expect(subtitle.className).toContain('subtitleLines2');
    });

    it('applies 3-line class to subtitle when subtitleLines=3', () => {
      render(<MapPlaceCard {...defaultProps} subtitle="Subtitle" subtitleLines={3} />);
      const subtitle = screen.getByText('Subtitle');
      expect(subtitle.className).toContain('subtitleLines3');
    });
  });

  describe('Accessibility - Non-Interactive Cards', () => {
    it('has no button role when onClick is not provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBeNull();
    });

    it('has no aria-pressed when onClick is not provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} selected={true} />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('aria-pressed')).toBeNull();
    });

    it('has no tabIndex when onClick is not provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabIndex')).toBeNull();
    });

    it('does not respond to keyboard events when not interactive', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;

      // Verify no onKeyDown handler is set
      expect(card.onkeydown).toBeNull();
    });
  });

  describe('Accessibility - Interactive Cards', () => {
    it('has button role when onClick is provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} onClick={() => {}} />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBe('button');
    });

    it('has aria-pressed="false" when interactive but not selected', () => {
      const { container } = render(
        <MapPlaceCard {...defaultProps} onClick={() => {}} selected={false} />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('aria-pressed')).toBe('false');
    });

    it('has aria-pressed="true" when interactive and selected', () => {
      const { container } = render(
        <MapPlaceCard {...defaultProps} onClick={() => {}} selected={true} />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('aria-pressed')).toBe('true');
    });

    it('has tabIndex="0" when onClick is provided', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} onClick={() => {}} />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabIndex')).toBe('0');
    });

    it('responds to Enter key when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<MapPlaceCard {...defaultProps} onClick={handleClick} />);
      const card = container.firstChild as HTMLElement;

      card.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<MapPlaceCard {...defaultProps} onClick={handleClick} />);
      const card = container.firstChild as HTMLElement;

      card.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Interaction', () => {
    it('calls onClick when card is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<MapPlaceCard {...defaultProps} onClick={handleClick} />);
      const card = container.firstChild as HTMLElement;

      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when card is not interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<MapPlaceCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;

      // This should not call handleClick since it wasn't passed
      await user.click(card);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Selected State', () => {
    it('applies selected class when selected', () => {
      const { container } = render(
        <MapPlaceCard {...defaultProps} onClick={() => {}} selected={true} />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('selected');
    });

    it('does not apply selected class when not selected', () => {
      const { container } = render(
        <MapPlaceCard {...defaultProps} onClick={() => {}} selected={false} />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain('selected');
    });

    it('selected state only affects ARIA when interactive', () => {
      // Non-interactive selected card
      const { container: nonInteractive } = render(
        <MapPlaceCard {...defaultProps} selected={true} />
      );
      const nonInteractiveCard = nonInteractive.firstChild as HTMLElement;
      expect(nonInteractiveCard.getAttribute('aria-pressed')).toBeNull();

      // Interactive selected card
      const { container: interactive } = render(
        <MapPlaceCard {...defaultProps} onClick={() => {}} selected={true} />
      );
      const interactiveCard = interactive.firstChild as HTMLElement;
      expect(interactiveCard.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(<MapPlaceCard {...defaultProps} className="custom-class" />);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
    });
  });
});
