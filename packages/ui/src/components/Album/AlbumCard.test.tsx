import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlbumCard } from './AlbumCard';
import type { Album } from './types';

describe('AlbumCard', () => {
  const mockAlbum: Album = {
    id: '1',
    title: 'Test Album',
    cover: 'https://example.com/cover.jpg',
    photos: [
      { id: 'p1', url: 'https://example.com/photo1.jpg', alt: 'Photo 1' },
      { id: 'p2', url: 'https://example.com/photo2.jpg', alt: 'Photo 2' },
      { id: 'p3', url: 'https://example.com/photo3.jpg', alt: 'Photo 3' },
    ],
  };

  describe('Rendering', () => {
    it('renders album title', () => {
      render(<AlbumCard album={mockAlbum} />);
      expect(screen.getByText('Test Album')).toBeInTheDocument();
    });

    it('renders photo count', () => {
      render(<AlbumCard album={mockAlbum} />);
      expect(screen.getByText('3 photos')).toBeInTheDocument();
    });

    it('renders album cover image', () => {
      render(<AlbumCard album={mockAlbum} />);
      const img = screen.getByAltText('Test Album') as HTMLImageElement;
      expect(img.src).toBe('https://example.com/cover.jpg');
    });

    it('renders as a button', () => {
      render(<AlbumCard album={mockAlbum} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('Event Handling - preventDefault Behavior', () => {
    it('calls onSelect when onClick does NOT prevent default', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const handleClick = vi.fn((_event) => {
        // Intentionally NOT calling preventDefault
      });

      render(<AlbumCard album={mockAlbum} onSelect={handleSelect} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Both handlers should be called
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith(mockAlbum);
    });

    it('does NOT call onSelect when onClick prevents default', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const handleClick = vi.fn((event) => {
        event.preventDefault(); // Prevent default behavior
      });

      render(<AlbumCard album={mockAlbum} onSelect={handleSelect} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // onClick should be called, but NOT onSelect
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('calls onSelect when only onSelect is provided', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(<AlbumCard album={mockAlbum} onSelect={handleSelect} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith(mockAlbum);
    });

    it('calls onClick when only onClick is provided', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<AlbumCard album={mockAlbum} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does nothing when neither onClick nor onSelect is provided', async () => {
      const user = userEvent.setup();

      // Should not throw an error
      render(<AlbumCard album={mockAlbum} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // No assertions needed - just ensuring no errors
    });
  });

  describe('Event Propagation', () => {
    it('receives the correct event object in onClick', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<AlbumCard album={mockAlbum} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      const event = handleClick.mock.calls[0][0];
      expect(event).toBeInstanceOf(Object);
      expect(event.type).toBe('click');
    });

    it('allows parent to prevent selection via preventDefault', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const parentClick = vi.fn((event: React.MouseEvent) => {
        // Parent decides to prevent selection
        event.preventDefault();
      });

      render(<AlbumCard album={mockAlbum} onSelect={handleSelect} onClick={parentClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(parentClick).toHaveBeenCalledTimes(1);
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<AlbumCard ref={ref} album={mockAlbum} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<AlbumCard album={mockAlbum} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });

    it('applies custom width', () => {
      render(<AlbumCard album={mockAlbum} width="400px" />);
      const button = screen.getByRole('button');
      expect(button.style.width).toBe('400px');
    });

    it('uses default width when not provided', () => {
      render(<AlbumCard album={mockAlbum} />);
      const button = screen.getByRole('button');
      expect(button.style.width).toBe('272px');
    });

    it('passes through additional button props', () => {
      render(<AlbumCard album={mockAlbum} data-testid="custom-album" aria-label="Custom label" />);

      const button = screen.getByTestId('custom-album');
      expect(button).toBeInTheDocument();
      expect(button.getAttribute('aria-label')).toBe('Custom label');
    });
  });

  describe('Album Data Variations', () => {
    it('handles album with single photo', () => {
      const singlePhotoAlbum: Album = {
        ...mockAlbum,
        photos: [{ id: 'p1', url: 'https://example.com/photo1.jpg', alt: 'Photo 1' }],
      };

      render(<AlbumCard album={singlePhotoAlbum} />);
      expect(screen.getByText('1 photo')).toBeInTheDocument();
    });

    it('handles album with no photos', () => {
      const emptyAlbum: Album = {
        ...mockAlbum,
        photos: [],
      };

      render(<AlbumCard album={emptyAlbum} />);
      expect(screen.getByText('0 photos')).toBeInTheDocument();
    });

    it('handles album with many photos', () => {
      const manyPhotosAlbum: Album = {
        ...mockAlbum,
        photos: Array.from({ length: 50 }, (_, i) => ({
          id: `p${i}`,
          url: `https://example.com/photo${i}.jpg`,
          alt: `Photo ${i}`,
        })),
      };

      render(<AlbumCard album={manyPhotosAlbum} />);
      expect(screen.getByText('50 photos')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading skeleton when loading prop is true', () => {
      const { container } = render(<AlbumCard album={mockAlbum} loading={true} />);

      // Check for skeleton elements using class names
      const skeletons = container.querySelectorAll('[class*="skeleton"]');
      expect(skeletons.length).toBeGreaterThan(0);

      // Should announce loading for screen readers
      expect(screen.getByText('Loading album')).toBeInTheDocument();
    });

    it('hides content when loading', () => {
      render(<AlbumCard album={mockAlbum} loading={true} />);

      // Album content should not be visible
      expect(screen.queryByAltText('Test Album')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Album')).not.toBeInTheDocument();
    });

    it('has proper loading accessibility attributes', () => {
      const { container } = render(<AlbumCard album={mockAlbum} loading={true} />);

      const loadingCard = container.firstChild as HTMLElement;
      expect(loadingCard.getAttribute('role')).toBe('status');
      expect(loadingCard.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Error State', () => {
    it('shows error message when error prop is true', () => {
      render(<AlbumCard album={mockAlbum} error={true} />);

      // Default error title
      expect(screen.getByText('Album unavailable')).toBeInTheDocument();
    });

    it('shows custom error title and message', () => {
      render(
        <AlbumCard
          album={mockAlbum}
          error={true}
          errorTitle="Album Unavailable"
          errorMessage="This album could not be loaded"
        />
      );

      expect(screen.getByText('Album Unavailable')).toBeInTheDocument();
      expect(screen.getByText('This album could not be loaded')).toBeInTheDocument();
    });

    it('hides content when error is true', () => {
      render(<AlbumCard album={mockAlbum} error={true} />);

      expect(screen.queryByAltText('Test Album')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    const emptyAlbum: Album = {
      id: '',
      title: '',
      cover: '',
      photos: [],
    };

    it('shows empty state when album has no content', () => {
      render(<AlbumCard album={emptyAlbum} />);

      expect(screen.getByText('No album')).toBeInTheDocument();
    });

    it('shows custom empty title and message', () => {
      render(
        <AlbumCard
          album={emptyAlbum}
          emptyTitle="No photos yet"
          emptyMessage="Add photos to get started"
        />
      );

      expect(screen.getByText('No photos yet')).toBeInTheDocument();
      expect(screen.getByText('Add photos to get started')).toBeInTheDocument();
    });

    it('does not show empty state when album has content', () => {
      render(<AlbumCard album={mockAlbum} />);

      expect(screen.queryByText('No album')).not.toBeInTheDocument();
    });
  });

  describe('State Priority', () => {
    it('loading takes priority over error', () => {
      render(<AlbumCard album={mockAlbum} loading={true} error={true} />);

      // Should show loading, not error
      expect(screen.getByText('Loading album')).toBeInTheDocument();
      expect(screen.queryByText('Album unavailable')).not.toBeInTheDocument();
    });

    it('error takes priority over empty', () => {
      const emptyAlbum: Album = {
        id: '',
        title: '',
        cover: '',
        photos: [],
      };

      render(<AlbumCard album={emptyAlbum} error={true} />);

      // Should show error, not empty
      expect(screen.getByText('Album unavailable')).toBeInTheDocument();
      expect(screen.queryByText('No album')).not.toBeInTheDocument();
    });
  });

  describe('Lazy Loading', () => {
    it('enables lazy loading by default', () => {
      render(<AlbumCard album={mockAlbum} />);

      const img = screen.getByAltText('Test Album') as HTMLImageElement;
      expect(img.getAttribute('loading')).toBe('lazy');
    });

    it('uses eager loading when imageLoading is "eager"', () => {
      render(<AlbumCard album={mockAlbum} imageLoading="eager" />);

      const img = screen.getByAltText('Test Album') as HTMLImageElement;
      expect(img.getAttribute('loading')).toBe('eager');
    });
  });

  describe('Image Callbacks', () => {
    it('calls onImageLoad when cover image loads', async () => {
      const handleImageLoad = vi.fn();
      render(<AlbumCard album={mockAlbum} onImageLoad={handleImageLoad} />);

      const img = screen.getByAltText('Test Album') as HTMLImageElement;
      await act(async () => {
        img.dispatchEvent(new Event('load', { bubbles: true }));
      });

      expect(handleImageLoad).toHaveBeenCalledTimes(1);
    });

    it('calls onImageError when cover image fails', async () => {
      const handleImageError = vi.fn();
      render(<AlbumCard album={mockAlbum} onImageError={handleImageError} />);

      const img = screen.getByAltText('Test Album') as HTMLImageElement;
      await act(async () => {
        img.dispatchEvent(new Event('error', { bubbles: true }));
      });

      expect(handleImageError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Badge Support', () => {
    it('renders badge when badge prop provided', () => {
      render(<AlbumCard album={mockAlbum} badge="New" />);

      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders badge with number', () => {
      render(<AlbumCard album={mockAlbum} badge={42} />);

      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('positions badge at top-right by default', () => {
      const { container } = render(<AlbumCard album={mockAlbum} badge="New" />);

      const badgeContainer = container.querySelector('[class*="badge"]');
      expect(badgeContainer?.className).toContain('badgeTopRight');
    });

    it('positions badge at top-left when specified', () => {
      const { container } = render(
        <AlbumCard album={mockAlbum} badge="New" badgePosition="top-left" />
      );

      const badgeContainer = container.querySelector('[class*="badgeTopLeft"]');
      expect(badgeContainer).toBeInTheDocument();
    });

    it('does not render badge when not provided', () => {
      const { container } = render(<AlbumCard album={mockAlbum} />);

      const badgeContainer = container.querySelector('[class*="badge"]');
      expect(badgeContainer).not.toBeInTheDocument();
    });
  });

  describe('Multi-line Text', () => {
    it('uses single line for title by default', () => {
      const { container } = render(<AlbumCard album={mockAlbum} />);

      const title = container.querySelector('[class*="title"]');
      expect(title?.className).not.toContain('titleLines');
    });

    it('applies 2-line clamp to title when specified', () => {
      const { container } = render(<AlbumCard album={mockAlbum} titleLines={2} />);

      const title = container.querySelector('[class*="titleLines2"]');
      expect(title).toBeInTheDocument();
    });

    it('applies 3-line clamp to title when specified', () => {
      const { container } = render(<AlbumCard album={mockAlbum} titleLines={3} />);

      const title = container.querySelector('[class*="titleLines3"]');
      expect(title).toBeInTheDocument();
    });

    it('applies 2-line clamp to subtitle when specified', () => {
      const { container } = render(<AlbumCard album={mockAlbum} subtitleLines={2} />);

      const subtitle = container.querySelector('[class*="subtitleLines2"]');
      expect(subtitle).toBeInTheDocument();
    });
  });
});
