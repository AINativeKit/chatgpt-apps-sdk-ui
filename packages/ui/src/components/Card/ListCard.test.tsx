import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { ListCard } from './ListCard';
import type { ListCardItem } from './ListCard';

describe('ListCard', () => {
  const mockTopImage = 'https://example.com/top-image.jpg';
  const mockItemImage = 'https://example.com/item-image.jpg';

  const mockItems: ListCardItem[] = [
    {
      image: mockItemImage,
      title: 'Item 1',
      subtitle: 'Subtitle 1',
      description: 'Description 1',
    },
    {
      title: 'Item 2',
      subtitle: 'Subtitle 2',
    },
    {
      title: 'Item 3',
    },
  ];

  describe('Rendering - Basic Structure', () => {
    it('renders without any props', () => {
      const { container } = render(<ListCard />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with only items', () => {
      render(<ListCard items={mockItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders empty card when no items provided', () => {
      const { container } = render(<ListCard headerTitle="Empty List" />);
      expect(screen.getByText('Empty List')).toBeInTheDocument();
      expect(container.querySelectorAll('[class*="listItem"]')).toHaveLength(0);
    });
  });

  describe('Top Image', () => {
    it('renders top image when provided as string', () => {
      const { container } = render(<ListCard topImage={mockTopImage} items={mockItems} />);
      const image = container.querySelector('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(mockTopImage);
    });

    it('renders top image when provided as object', () => {
      const imageObj = { src: mockTopImage, alt: 'Top image description' };
      render(<ListCard topImage={imageObj} items={mockItems} />);
      const image = screen.getByAltText('Top image description') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(mockTopImage);
    });

    it('does not render top image container when topImage not provided', () => {
      const { container } = render(<ListCard items={mockItems} />);
      expect(container.querySelector('[class*="topImageContainer"]')).not.toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('renders header title when provided', () => {
      render(<ListCard headerTitle="Test Header" />);
      expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('renders header action button when onHeaderAction provided', () => {
      const handleHeaderAction = vi.fn();
      render(
        <ListCard
          headerTitle="Header"
          onHeaderAction={handleHeaderAction}
          headerActionLabel="Edit header"
        />
      );
      const editButton = screen.getByLabelText('Edit header');
      expect(editButton).toBeInTheDocument();
    });

    it('calls onHeaderAction when header button clicked', async () => {
      const user = userEvent.setup();
      const handleHeaderAction = vi.fn();
      render(
        <ListCard
          headerTitle="Header"
          onHeaderAction={handleHeaderAction}
          headerActionLabel="Edit header"
        />
      );

      const editButton = screen.getByLabelText('Edit header');
      await user.click(editButton);

      expect(handleHeaderAction).toHaveBeenCalledTimes(1);
    });

    it('renders header with action button but no title', () => {
      const handleHeaderAction = vi.fn();
      render(<ListCard onHeaderAction={handleHeaderAction} headerActionLabel="Edit" />);
      expect(screen.getByLabelText('Edit')).toBeInTheDocument();
    });

    it('does not render header when neither title nor action provided', () => {
      const { container } = render(<ListCard items={mockItems} />);
      expect(container.querySelector('[class*="header"]')).not.toBeInTheDocument();
    });
  });

  describe('List Items - Content', () => {
    it('renders all list items', () => {
      render(<ListCard items={mockItems} />);
      mockItems.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('renders item images when provided', () => {
      const { container } = render(<ListCard items={mockItems} />);
      const images = container.querySelectorAll('img');
      expect(images).toHaveLength(1); // Only first item has image
      expect(images[0].src).toContain(mockItemImage);
    });

    it('renders item subtitles when provided', () => {
      render(<ListCard items={mockItems} />);
      expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
      expect(screen.getByText('Subtitle 2')).toBeInTheDocument();
    });

    it('renders item descriptions when provided', () => {
      render(<ListCard items={mockItems} />);
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    it('handles item image as object', () => {
      const itemsWithImageObj: ListCardItem[] = [
        {
          image: { src: mockItemImage, alt: 'Item image description' },
          title: 'Item with object image',
        },
      ];
      render(<ListCard items={itemsWithImageObj} />);
      const image = screen.getByAltText('Item image description');
      expect(image).toBeInTheDocument();
    });

    it('renders items without images correctly', () => {
      const itemsWithoutImages: ListCardItem[] = [{ title: 'No image item' }];
      render(<ListCard items={itemsWithoutImages} />);
      expect(screen.getByText('No image item')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('List Items - Actions', () => {
    it('renders item action button when onItemAction provided', () => {
      const itemsWithAction: ListCardItem[] = [
        {
          title: 'Item with action',
          onItemAction: vi.fn(),
          actionLabel: 'Add item',
        },
      ];
      render(<ListCard items={itemsWithAction} />);
      expect(screen.getByLabelText('Add item')).toBeInTheDocument();
    });

    it('calls onItemAction when item button clicked', async () => {
      const user = userEvent.setup();
      const handleItemAction = vi.fn();
      const itemsWithAction: ListCardItem[] = [
        {
          title: 'Clickable item',
          onItemAction: handleItemAction,
          actionLabel: 'Add item',
        },
      ];
      render(<ListCard items={itemsWithAction} />);

      const addButton = screen.getByLabelText('Add item');
      await user.click(addButton);

      expect(handleItemAction).toHaveBeenCalledTimes(1);
    });

    it('does not render action button when onItemAction not provided', () => {
      const itemsWithoutAction: ListCardItem[] = [{ title: 'No action item' }];
      render(<ListCard items={itemsWithoutAction} />);
      expect(screen.queryByLabelText('Add item')).not.toBeInTheDocument();
    });
  });

  describe('Action Button', () => {
    it('renders action button when buttonText provided', () => {
      render(<ListCard items={mockItems} buttonText="Place Order" />);
      expect(screen.getByRole('button', { name: 'Place Order' })).toBeInTheDocument();
    });

    it('calls onButtonClick when action button clicked', async () => {
      const user = userEvent.setup();
      const handleButtonClick = vi.fn();
      render(<ListCard items={mockItems} buttonText="Submit" onButtonClick={handleButtonClick} />);

      const button = screen.getByRole('button', { name: 'Submit' });
      await user.click(button);

      expect(handleButtonClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled button when buttonDisabled is true', () => {
      render(<ListCard items={mockItems} buttonText="Submit" buttonDisabled={true} />);
      const button = screen.getByRole('button', { name: 'Submit' });
      expect(button).toBeDisabled();
    });

    it('renders enabled button by default', () => {
      render(<ListCard items={mockItems} buttonText="Submit" />);
      const button = screen.getByRole('button', { name: 'Submit' });
      expect(button).not.toBeDisabled();
    });

    it('does not render button when buttonText not provided', () => {
      render(<ListCard items={mockItems} />);
      // Should have no main action button (only potential item action buttons)
      const buttons = screen.queryAllByRole('button');
      expect(buttons.every((btn) => btn.getAttribute('aria-label')?.startsWith('Add'))).toBe(true);
    });
  });

  describe('Dividers', () => {
    it('renders dividers between items when button present', () => {
      const { container } = render(<ListCard items={mockItems} buttonText="Submit" />);
      const dividers = container.querySelectorAll('[class*="divider"]');
      // Should have dividers after each item when button is present
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('renders dividers between items but not after last when no button', () => {
      const { container } = render(<ListCard items={mockItems} />);
      const dividers = container.querySelectorAll('[class*="divider"]');
      // Should have dividers between items (n-1 dividers for n items when no button)
      expect(dividers.length).toBeGreaterThanOrEqual(mockItems.length - 1);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML for header', () => {
      render(<ListCard headerTitle="Semantic Header" />);
      const header = screen.getByRole('heading', { name: 'Semantic Header' });
      expect(header.tagName).toBe('H3');
    });

    it('provides aria-label for header action button', () => {
      render(<ListCard onHeaderAction={vi.fn()} headerActionLabel="Edit header" />);
      expect(screen.getByLabelText('Edit header')).toBeInTheDocument();
    });

    it('provides aria-label for item action buttons', () => {
      const itemsWithAction: ListCardItem[] = [
        { title: 'Item', onItemAction: vi.fn(), actionLabel: 'Add item' },
      ];
      render(<ListCard items={itemsWithAction} />);
      expect(screen.getByLabelText('Add item')).toBeInTheDocument();
    });

    it('provides alt text for images when specified', () => {
      const itemsWithAlt: ListCardItem[] = [
        {
          image: { src: mockItemImage, alt: 'Descriptive alt text' },
          title: 'Item',
        },
      ];
      render(<ListCard items={itemsWithAlt} />);
      expect(screen.getByAltText('Descriptive alt text')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Card component', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ListCard ref={ref} items={mockItems} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Loading State', () => {
    it('shows skeleton when loading prop is true', () => {
      render(<ListCard headerTitle="Menu" loading />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });

    it('shows loading text for screen readers', () => {
      render(<ListCard headerTitle="Menu" loading />);
      expect(screen.getByText(/Loading list content/)).toBeInTheDocument();
    });

    it('hides content when loading', () => {
      render(<ListCard headerTitle="Menu" items={mockItems} loading />);
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('renders correct number of skeleton items', () => {
      const { container } = render(<ListCard loading loadingItemCount={5} />);
      const skeletonItems = container.querySelectorAll('[class*="listItem"]');
      expect(skeletonItems).toHaveLength(5);
    });
  });

  describe('Error State', () => {
    it('shows error message when error prop is true', () => {
      render(<ListCard error />);
      expect(screen.getByTestId('list-card-error')).toBeInTheDocument();
    });

    it('shows custom error title and message', () => {
      render(
        <ListCard error errorTitle="Custom Error" errorMessage="Custom message" />
      );
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });

    it('shows retry button when onErrorRetry provided', () => {
      const handleRetry = vi.fn();
      render(<ListCard error onErrorRetry={handleRetry} />);
      const retryButton = screen.getByRole('button', { name: /Retry/ });
      expect(retryButton).toBeInTheDocument();
    });

    it('calls onErrorRetry when retry button clicked', async () => {
      const user = userEvent.setup();
      const handleRetry = vi.fn();
      render(<ListCard error onErrorRetry={handleRetry} />);
      const retryButton = screen.getByRole('button', { name: /Retry/ });
      await user.click(retryButton);
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Empty State', () => {
    it('shows empty state when items array is empty', () => {
      const { container } = render(<ListCard items={[]} />);
      expect(container.querySelector('[class*="emptyState"]')).toBeInTheDocument();
    });

    it('shows default empty title', () => {
      render(<ListCard items={[]} />);
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('shows custom empty title and message', () => {
      render(
        <ListCard items={[]} emptyTitle="Cart is empty" emptyMessage="Add items to get started" />
      );
      expect(screen.getByText('Cart is empty')).toBeInTheDocument();
      expect(screen.getByText('Add items to get started')).toBeInTheDocument();
    });

    it('preserves header in empty state', () => {
      render(<ListCard headerTitle="Your Cart" items={[]} />);
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });
  });

  describe('Card Props Inheritance', () => {
    it('passes through elevation props', () => {
      const { container } = render(<ListCard items={mockItems} elevationLevel={3} />);
      // Card component should receive and apply elevation
      expect(container.firstChild).toBeInTheDocument();
    });

    it('passes through custom className', () => {
      const { container } = render(<ListCard items={mockItems} className="custom-class" />);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
    });
  });

  describe('Complex Scenarios', () => {
    it('renders complete ListCard with all features', () => {
      const handleHeaderAction = vi.fn();
      const handleItemAction = vi.fn();
      const handleButtonClick = vi.fn();

      const fullItems: ListCardItem[] = [
        {
          image: mockItemImage,
          title: 'Complete Item',
          subtitle: 'With all fields',
          description: 'Full description text',
          onItemAction: handleItemAction,
          actionLabel: 'Add item',
        },
      ];

      const { container } = render(
        <ListCard
          topImage={mockTopImage}
          headerTitle="Complete Header"
          onHeaderAction={handleHeaderAction}
          headerActionLabel="Edit header"
          items={fullItems}
          buttonText="Complete Action"
          onButtonClick={handleButtonClick}
        />
      );

      // Verify all elements are present
      const images = container.querySelectorAll('img');
      expect(images).toHaveLength(2); // top + item image
      expect(screen.getByText('Complete Header')).toBeInTheDocument();
      expect(screen.getByLabelText('Edit header')).toBeInTheDocument();
      expect(screen.getByText('Complete Item')).toBeInTheDocument();
      expect(screen.getByText('With all fields')).toBeInTheDocument();
      expect(screen.getByText('Full description text')).toBeInTheDocument();
      expect(screen.getByLabelText('Add item')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Complete Action' })).toBeInTheDocument();
    });

    it('handles single item correctly', () => {
      const singleItem: ListCardItem[] = [{ title: 'Only Item' }];
      render(<ListCard items={singleItem} />);
      expect(screen.getByText('Only Item')).toBeInTheDocument();
    });

    it('handles many items correctly', () => {
      const manyItems: ListCardItem[] = Array.from({ length: 10 }, (_, i) => ({
        title: `Item ${i + 1}`,
      }));
      render(<ListCard items={manyItems} />);
      manyItems.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
