import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act } from 'react';
import { ImageCard } from './ImageCard';
import { PlusCircleAdd } from '@openai/apps-sdk-ui/components/Icon';

describe('ImageCard', () => {
  const mockImage = 'https://example.com/image.jpg';

  // Helper to simulate image load event
  const fireImageLoad = (container: HTMLElement) => {
    const img = container.querySelector('img');
    if (img) {
      act(() => {
        // Trigger onLoad event
        const event = new Event('load', { bubbles: true });
        img.dispatchEvent(event);
      });
    }
  };

  describe('Rendering', () => {
    it('renders with image only', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      const imageCard = container.firstChild as HTMLElement;
      expect(imageCard).toBeInTheDocument();
    });

    it('renders native img element with correct src', () => {
      const { container } = render(<ImageCard image={mockImage} />);

      // Check that the image element is rendered with correct src
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toHaveAttribute('src', mockImage);
      expect(img).toHaveAttribute('alt', 'Image');
    });

    it('accepts image as object with src and alt', () => {
      const imageObj = { src: mockImage, alt: 'Test image description' };
      const { container } = render(<ImageCard image={imageObj} />);
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toHaveAttribute('src', mockImage);
      expect(img).toHaveAttribute('aria-label', 'Test image description');
    });
  });

  describe('Content Rendering', () => {
    it('renders title when provided', () => {
      const { container } = render(<ImageCard image={mockImage} title="Test Title" />);
      fireImageLoad(container);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      const { container } = render(<ImageCard image={mockImage} subtitle="Test Subtitle" />);
      fireImageLoad(container);
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders both title and subtitle', () => {
      const { container } = render(
        <ImageCard image={mockImage} title="Test Title" subtitle="Test Subtitle" />
      );
      fireImageLoad(container);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('does not render content container when no title or subtitle', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      fireImageLoad(container);
      const content = container.querySelector('[class*="content"]');
      expect(content).not.toBeInTheDocument();
    });
  });

  describe('Action Button', () => {
    it('renders action button when actionIcon provided', () => {
      const { container } = render(
        <ImageCard image={mockImage} actionIcon={<PlusCircleAdd />} actionLabel="Add item" />
      );
      fireImageLoad(container);
      const button = screen.getByRole('button', { name: /Add item/ });
      expect(button).toBeInTheDocument();
    });

    it('does not render action button when no actionIcon', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      fireImageLoad(container);
      const button = screen.queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });

    it('calls onAction when button clicked', async () => {
      const user = userEvent.setup();
      const handleAction = vi.fn();
      const { container } = render(
        <ImageCard
          image={mockImage}
          actionIcon={<PlusCircleAdd />}
          actionLabel="Add"
          onAction={handleAction}
        />
      );
      fireImageLoad(container);
      const button = screen.getByRole('button', { name: /Add/ });
      await user.click(button);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('requires actionLabel when actionIcon is provided', () => {
      // In dev mode, console.error should be called
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ImageCard
          image={mockImage}
          actionIcon={<PlusCircleAdd />}
          actionLabel="" // Empty label should trigger warning
        />
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ImageCard: actionLabel is required')
      );

      consoleSpy.mockRestore();
    });

    it('does not render button when actionLabel is missing', () => {
      // Suppress expected console.error for this validation test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <ImageCard
          image={mockImage}
          actionIcon={<PlusCircleAdd />}
          actionLabel="" // Empty label
        />
      );

      fireImageLoad(container);
      // Button should not render without a valid label
      const button = screen.queryByRole('button');
      expect(button).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it('uses provided actionLabel for accessibility', () => {
      const { container } = render(
        <ImageCard
          image={mockImage}
          title="Pizza"
          actionIcon={<PlusCircleAdd />}
          actionLabel="Add to favorites"
        />
      );

      fireImageLoad(container);
      const button = screen.getByRole('button', { name: /Add to favorites for Pizza/ });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Image Positioning', () => {
    it('applies center position by default', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      const img = container.querySelector('img') as HTMLElement;
      expect(img).toHaveClass('imagePositionCenter');
    });

    it('applies top position when specified', () => {
      const { container } = render(<ImageCard image={mockImage} imagePosition="top" />);
      const img = container.querySelector('img') as HTMLElement;
      expect(img).toHaveClass('imagePositionTop');
    });

    it('applies bottom position when specified', () => {
      const { container } = render(<ImageCard image={mockImage} imagePosition="bottom" />);
      const img = container.querySelector('img') as HTMLElement;
      expect(img).toHaveClass('imagePositionBottom');
    });
  });

  describe('Gradient Overlay', () => {
    it('renders gradient overlay when content exists', () => {
      const { container } = render(<ImageCard image={mockImage} title="Test" />);
      fireImageLoad(container);
      const overlay = container.querySelector('[class*="gradientOverlay"]');
      expect(overlay).toBeInTheDocument();
    });

    it('renders gradient overlay when action button exists with valid label', () => {
      const { container } = render(
        <ImageCard image={mockImage} actionIcon={<PlusCircleAdd />} actionLabel="Add" />
      );
      fireImageLoad(container);
      const overlay = container.querySelector('[class*="gradientOverlay"]');
      expect(overlay).toBeInTheDocument();
    });

    it('does not render gradient overlay when no content or action', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      fireImageLoad(container);
      const overlay = container.querySelector('[class*="gradientOverlay"]');
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe('Card Props Inheritance', () => {
    it('forwards elevation prop to Card', () => {
      const { container } = render(<ImageCard image={mockImage} elevationLevel={3} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      // Card component applies elevation via CSS variables
    });

    it('forwards interactive prop to Card', () => {
      const { container } = render(<ImageCard image={mockImage} interactive />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('data-interactive', 'true');
    });

    it('forwards onClick to Card', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<ImageCard image={mockImage} onClick={handleClick} />);
      const card = container.firstChild as HTMLElement;
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<ImageCard image={mockImage} className="custom-class" />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      const { container } = render(<ImageCard image={mockImage} style={{ maxWidth: '300px' }} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({ maxWidth: '300px' });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ImageCard ref={ref} image={mockImage} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('provides proper aria-label for image element', () => {
      const { container } = render(
        <ImageCard image={{ src: mockImage, alt: 'Beautiful landscape' }} />
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('aria-label', 'Beautiful landscape');
    });

    it('renders semantic HTML structure', () => {
      const { container } = render(
        <ImageCard image={mockImage} title="Test Title" subtitle="Test Subtitle" />
      );
      fireImageLoad(container);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Test Title');
    });
  });

  // Phase 1: New Features Tests
  describe('Loading State', () => {
    it('shows skeleton when loading prop is true', () => {
      render(<ImageCard image={mockImage} loading />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });

    it('shows loading text for screen readers', () => {
      render(<ImageCard image={mockImage} title="Pizza" loading />);
      expect(screen.getByText(/Loading image: Pizza/)).toBeInTheDocument();
    });

    it('hides content when loading', () => {
      render(<ImageCard image={mockImage} title="Test" loading />);
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error message when error prop is true', () => {
      render(<ImageCard image={mockImage} error />);
      expect(screen.getByTestId('image-card-error')).toBeInTheDocument();
    });

    it('shows custom error title and message', () => {
      render(
        <ImageCard
          image={mockImage}
          error
          errorTitle="Custom Error"
          errorMessage="Custom message"
        />
      );
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });

    it('shows retry button when onErrorRetry provided', () => {
      const handleRetry = vi.fn();
      render(<ImageCard image={mockImage} error onErrorRetry={handleRetry} />);
      const retryButton = screen.getByRole('button', { name: /Try Again/ });
      expect(retryButton).toBeInTheDocument();
    });
  });

  describe('Badge Support', () => {
    it('renders badge when badge prop provided', () => {
      const { container } = render(<ImageCard image={mockImage} badge="New" />);
      fireImageLoad(container);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('positions badge top-right by default', () => {
      const { container } = render(<ImageCard image={mockImage} badge="Sale" />);
      fireImageLoad(container);
      const badge = container.querySelector('[class*="badge"]');
      expect(badge).toHaveClass('badgeTopRight');
    });

    it('positions badge top-left when specified', () => {
      const { container } = render(
        <ImageCard image={mockImage} badge="Hot" badgePosition="top-left" />
      );
      fireImageLoad(container);
      const badge = container.querySelector('[class*="badge"]');
      expect(badge).toHaveClass('badgeTopLeft');
    });
  });

  describe('Multi-line Text', () => {
    it('applies titleLines class', () => {
      const { container } = render(
        <ImageCard image={mockImage} title="Long Title" titleLines={2} />
      );
      fireImageLoad(container);
      const title = container.querySelector('[class*="title"]');
      expect(title).toHaveClass('titleLines2');
    });

    it('applies subtitleLines class', () => {
      const { container } = render(
        <ImageCard image={mockImage} subtitle="Long Subtitle" subtitleLines={3} />
      );
      fireImageLoad(container);
      const subtitle = container.querySelector('[class*="subtitle"]');
      expect(subtitle).toHaveClass('subtitleLines3');
    });
  });

  describe('Image Callbacks', () => {
    it('calls onImageLoad when image loads', () => {
      const handleLoad = vi.fn();
      const { container } = render(<ImageCard image={mockImage} onImageLoad={handleLoad} />);
      fireImageLoad(container);
      expect(handleLoad).toHaveBeenCalledTimes(1);
    });

    it('calls onImageError when image fails', () => {
      const handleError = vi.fn();
      const { container } = render(<ImageCard image={mockImage} onImageError={handleError} />);
      const img = container.querySelector('img');
      if (img) {
        act(() => {
          const event = new Event('error', { bubbles: true });
          img.dispatchEvent(event);
        });
      }
      expect(handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Lazy Loading', () => {
    it('enables lazy loading by default', () => {
      const { container } = render(<ImageCard image={mockImage} />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('disables lazy loading when lazy=false', () => {
      const { container } = render(<ImageCard image={mockImage} lazy={false} />);
      const img = container.querySelector('img');
      expect(img).not.toHaveAttribute('loading');
    });
  });
});
