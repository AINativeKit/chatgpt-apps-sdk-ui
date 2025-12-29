import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Compound Components', () => {
  describe('Card.Header', () => {
    it('should render header with children', () => {
      render(
        <Card>
          <Card.Header data-testid="card-header">Header Content</Card.Header>
        </Card>
      );

      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header Content');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Header data-testid="card-header" className="custom-class">
            Header
          </Card.Header>
        </Card>
      );

      expect(screen.getByTestId('card-header')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.Header ref={ref}>Header</Card.Header>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.Body', () => {
    it('should render body with children', () => {
      render(
        <Card>
          <Card.Body data-testid="card-body">Body Content</Card.Body>
        </Card>
      );

      const body = screen.getByTestId('card-body');
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent('Body Content');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Body data-testid="card-body" className="custom-class">
            Body
          </Card.Body>
        </Card>
      );

      expect(screen.getByTestId('card-body')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.Body ref={ref}>Body</Card.Body>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.Footer', () => {
    it('should render footer with children', () => {
      render(
        <Card>
          <Card.Footer data-testid="card-footer">Footer Content</Card.Footer>
        </Card>
      );

      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer Content');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Footer data-testid="card-footer" className="custom-class">
            Footer
          </Card.Footer>
        </Card>
      );

      expect(screen.getByTestId('card-footer')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.Footer ref={ref}>Footer</Card.Footer>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.Image', () => {
    it('should render image with src and alt', () => {
      render(
        <Card>
          <Card.Image
            src="https://example.com/image.jpg"
            alt="Test image"
            data-testid="card-image"
          />
        </Card>
      );

      const image = screen.getByTestId('card-image') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toBe('https://example.com/image.jpg');
      expect(image.alt).toBe('Test image');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Image
            src="https://example.com/image.jpg"
            alt="Test"
            className="custom-class"
            data-testid="card-image"
          />
        </Card>
      );

      expect(screen.getByTestId('card-image')).toHaveClass('custom-class');
    });

    it('should apply aspectRatio when provided', () => {
      render(
        <Card>
          <Card.Image
            src="https://example.com/image.jpg"
            alt="Test"
            aspectRatio="16 / 9"
            data-testid="card-image"
          />
        </Card>
      );

      const image = screen.getByTestId('card-image') as HTMLImageElement;
      expect(image.style.getPropertyValue('--card-image-aspect-ratio')).toBe('16 / 9');
    });

    it('should not apply aspectRatio CSS variable when not provided', () => {
      render(
        <Card>
          <Card.Image src="https://example.com/image.jpg" alt="Test" data-testid="card-image" />
        </Card>
      );

      const image = screen.getByTestId('card-image') as HTMLImageElement;
      expect(image.style.getPropertyValue('--card-image-aspect-ratio')).toBe('');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLImageElement | null };
      render(
        <Card>
          <Card.Image ref={ref} src="https://example.com/image.jpg" alt="Test" />
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe('Card.Actions', () => {
    it('should render actions with children', () => {
      render(
        <Card>
          <Card.Actions data-testid="card-actions">
            <button>Action 1</button>
            <button>Action 2</button>
          </Card.Actions>
        </Card>
      );

      const actions = screen.getByTestId('card-actions');
      expect(actions).toBeInTheDocument();
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });

    it('should default to end alignment', () => {
      render(
        <Card>
          <Card.Actions data-testid="card-actions">Actions</Card.Actions>
        </Card>
      );

      expect(screen.getByTestId('card-actions')).toHaveAttribute('data-align', 'end');
    });

    it('should apply custom alignment', () => {
      const alignments = ['start', 'center', 'end', 'stretch'] as const;

      alignments.forEach((align) => {
        const { container } = render(
          <Card>
            <Card.Actions align={align} data-testid={`actions-${align}`}>
              Actions
            </Card.Actions>
          </Card>
        );

        expect(screen.getByTestId(`actions-${align}`)).toHaveAttribute('data-align', align);
        container.remove();
      });
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Actions data-testid="card-actions" className="custom-class">
            Actions
          </Card.Actions>
        </Card>
      );

      expect(screen.getByTestId('card-actions')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.Actions ref={ref}>Actions</Card.Actions>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.Title', () => {
    it('should render title with children', () => {
      render(
        <Card>
          <Card.Title data-testid="card-title">Title Text</Card.Title>
        </Card>
      );

      const title = screen.getByTestId('card-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Title Text');
      expect(title.tagName).toBe('H2');
    });

    it('should render as custom element', () => {
      render(
        <Card>
          <Card.Title as="h1" data-testid="card-title">
            Title
          </Card.Title>
        </Card>
      );

      expect(screen.getByTestId('card-title').tagName).toBe('H1');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Title data-testid="card-title" className="custom-class">
            Title
          </Card.Title>
        </Card>
      );

      expect(screen.getByTestId('card-title')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLHeadingElement | null };
      render(
        <Card>
          <Card.Title ref={ref}>Title</Card.Title>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('Card.Description', () => {
    it('should render description with children', () => {
      render(
        <Card>
          <Card.Description data-testid="card-desc">Description Text</Card.Description>
        </Card>
      );

      const desc = screen.getByTestId('card-desc');
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveTextContent('Description Text');
      expect(desc.tagName).toBe('P');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Description data-testid="card-desc" className="custom-class">
            Description
          </Card.Description>
        </Card>
      );

      expect(screen.getByTestId('card-desc')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLParagraphElement | null };
      render(
        <Card>
          <Card.Description ref={ref}>Description</Card.Description>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('Card.Meta', () => {
    it('should render meta with children', () => {
      render(
        <Card>
          <Card.Meta data-testid="card-meta">Meta Text</Card.Meta>
        </Card>
      );

      const meta = screen.getByTestId('card-meta');
      expect(meta).toBeInTheDocument();
      expect(meta).toHaveTextContent('Meta Text');
      expect(meta.tagName).toBe('DIV');
    });

    it('should render metadata like read time and date', () => {
      render(
        <Card>
          <Card.Meta data-testid="card-meta">
            <span>5 min read</span> • <span>March 15, 2024</span>
          </Card.Meta>
        </Card>
      );

      const meta = screen.getByTestId('card-meta');
      expect(meta).toHaveTextContent('5 min read');
      expect(meta).toHaveTextContent('March 15, 2024');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Meta data-testid="card-meta" className="custom-class">
            Meta
          </Card.Meta>
        </Card>
      );

      expect(screen.getByTestId('card-meta')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.Meta ref={ref}>Meta</Card.Meta>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.BadgeGroup', () => {
    it('should render chip group with children', () => {
      render(
        <Card>
          <Card.BadgeGroup data-testid="card-chip-group">
            <Card.Badge>Chip 1</Card.Badge>
            <Card.Badge>Chip 2</Card.Badge>
          </Card.BadgeGroup>
        </Card>
      );

      const chipGroup = screen.getByTestId('card-chip-group');
      expect(chipGroup).toBeInTheDocument();
      expect(screen.getByText('Chip 1')).toBeInTheDocument();
      expect(screen.getByText('Chip 2')).toBeInTheDocument();
    });

    it('should render multiple chips', () => {
      render(
        <Card>
          <Card.BadgeGroup data-testid="card-chip-group">
            <Card.Badge variant="neutral" size="sm">
              Design
            </Card.Badge>
            <Card.Badge variant="neutral" size="sm">
              Systems
            </Card.Badge>
            <Card.Badge variant="success" size="sm">
              New
            </Card.Badge>
          </Card.BadgeGroup>
        </Card>
      );

      const chipGroup = screen.getByTestId('card-chip-group');
      expect(chipGroup).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Systems')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.BadgeGroup data-testid="card-chip-group" className="custom-class">
            Chip Group
          </Card.BadgeGroup>
        </Card>
      );

      expect(screen.getByTestId('card-chip-group')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Card>
          <Card.BadgeGroup ref={ref}>
            <Card.Badge>Chip</Card.Badge>
          </Card.BadgeGroup>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card.Badge', () => {
    it('should render badge with children', () => {
      render(
        <Card>
          <Card.Badge data-testid="card-badge">New</Card.Badge>
        </Card>
      );

      const badge = screen.getByTestId('card-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('New');
    });

    it('should support Badge variants', () => {
      render(
        <Card>
          <Card.Badge variant="success" data-testid="card-badge">
            Active
          </Card.Badge>
        </Card>
      );

      expect(screen.getByTestId('card-badge')).toBeInTheDocument();
    });

    // Note: CardBadge wraps apps-sdk-ui Badge which doesn't forward refs
  });

  describe('Card.ActionButton', () => {
    it('should render action button', () => {
      render(
        <Card>
          <Card.Actions>
            <Card.ActionButton data-testid="action-btn">Click Me</Card.ActionButton>
          </Card.Actions>
        </Card>
      );

      const button = screen.getByTestId('action-btn');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click Me');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should support Button variants', () => {
      render(
        <Card>
          <Card.Actions>
            <Card.ActionButton variant="primary" data-testid="action-btn">
              Primary
            </Card.ActionButton>
          </Card.Actions>
        </Card>
      );

      expect(screen.getByTestId('action-btn')).toBeInTheDocument();
    });

    // Note: CardActionButton wraps apps-sdk-ui Button which doesn't forward refs
  });

  describe('Card.Description', () => {
    it('should render description with children', () => {
      render(
        <Card>
          <Card.Description data-testid="card-desc">Description Text</Card.Description>
        </Card>
      );

      const desc = screen.getByTestId('card-desc');
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveTextContent('Description Text');
      expect(desc.tagName).toBe('P');
    });

    it('should apply custom className', () => {
      render(
        <Card>
          <Card.Description data-testid="card-desc" className="custom-class">
            Description
          </Card.Description>
        </Card>
      );

      expect(screen.getByTestId('card-desc')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = { current: null as HTMLParagraphElement | null };
      render(
        <Card>
          <Card.Description ref={ref}>Description</Card.Description>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('Compound Component Integration', () => {
    it('should compose all parts together', () => {
      render(
        <Card data-testid="card">
          <Card.Header data-testid="header">
            <Card.Title data-testid="title">Product Name</Card.Title>
          </Card.Header>
          <Card.Image src="https://example.com/product.jpg" alt="Product" data-testid="image" />
          <Card.Body data-testid="body">
            <Card.Description data-testid="desc">Product description goes here</Card.Description>
          </Card.Body>
          <Card.Footer data-testid="footer">
            <Card.Actions data-testid="actions">
              <button>Buy Now</button>
            </Card.Actions>
          </Card.Footer>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toHaveTextContent('Product Name');
      expect(screen.getByTestId('image')).toBeInTheDocument();
      expect(screen.getByTestId('body')).toBeInTheDocument();
      expect(screen.getByTestId('desc')).toHaveTextContent('Product description goes here');
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('actions')).toBeInTheDocument();
      expect(screen.getByText('Buy Now')).toBeInTheDocument();
    });

    it('should work with partial composition', () => {
      render(
        <Card>
          <Card.Title data-testid="title">Simple Card</Card.Title>
          <Card.Description data-testid="desc">Just title and description</Card.Description>
        </Card>
      );

      expect(screen.getByTestId('title')).toHaveTextContent('Simple Card');
      expect(screen.getByTestId('desc')).toHaveTextContent('Just title and description');
    });

    it('should support nested components', () => {
      render(
        <Card>
          <Card.Header>
            <div>
              <Card.Title data-testid="title">Nested Title</Card.Title>
              <span>Subtitle</span>
            </div>
          </Card.Header>
        </Card>
      );

      expect(screen.getByTestId('title')).toHaveTextContent('Nested Title');
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });
  });
});
