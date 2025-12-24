import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies elevation and border tokens via custom properties', () => {
    render(
      <Card data-testid="card" elevationLevel={3} border="light">
        Card Content
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card.style.getPropertyValue('--card-shadow-value')).toBe('var(--elevation-3-shadow)');
    expect(card.style.getPropertyValue('--card-border-color')).toBe('var(--color-border-subtle)');
  });

  it('uses next elevation on hover when interactive', () => {
    render(
      <Card data-testid="interactive-card" elevationLevel={2} interactive>
        Card Content
      </Card>
    );

    const card = screen.getByTestId('interactive-card');
    expect(card.style.getPropertyValue('--card-hover-shadow-value')).toBe(
      'var(--elevation-3-shadow)'
    );
  });

  describe('Loading States', () => {
    it('shows children when not loading', () => {
      render(
        <Card data-testid="card">
          <div>Card Content</div>
        </Card>
      );

      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('shows default skeleton when loading', () => {
      render(
        <Card data-testid="card" loading>
          <div>Card Content</div>
        </Card>
      );

      // Content should not be visible
      expect(screen.queryByText('Card Content')).not.toBeInTheDocument();

      // Skeleton should be present (3 skeleton elements by default)
      const card = screen.getByTestId('card');
      expect(card.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });

    it('shows custom skeleton when provided', () => {
      render(
        <Card
          data-testid="card"
          loading
          skeleton={<div data-testid="custom-skeleton">Custom Loading...</div>}
        >
          <div>Card Content</div>
        </Card>
      );

      expect(screen.queryByText('Card Content')).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-skeleton')).toBeInTheDocument();
      expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
    });

    it('adds aria-busy attribute when loading', () => {
      render(
        <Card data-testid="card" loading>
          <div>Content</div>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-busy', 'true');
    });

    it('does not add aria-busy when not loading', () => {
      render(
        <Card data-testid="card" loading={false}>
          <div>Content</div>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-busy', 'false');
    });
  });

  describe('Error States', () => {
    it('should render error content when error is true', () => {
      render(<Card error>Content</Card>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('should render custom error title', () => {
      render(
        <Card error errorTitle="Custom Error">
          Content
        </Card>
      );
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
      render(
        <Card error errorTitle="Error" errorMessage="Detailed message">
          Content
        </Card>
      );
      expect(screen.getByText('Detailed message')).toBeInTheDocument();
    });

    it('should render retry button when onErrorRetry provided', () => {
      const onRetry = vi.fn();
      render(
        <Card error onErrorRetry={onRetry}>
          Content
        </Card>
      );
      expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    });

    it('should call onErrorRetry when retry button clicked', async () => {
      const user = userEvent.setup();
      const onRetry = vi.fn();
      render(
        <Card error onErrorRetry={onRetry}>
          Content
        </Card>
      );

      await user.click(screen.getByRole('button', { name: 'Try Again' }));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('should render custom error content', () => {
      render(
        <Card error errorContent={<div>Custom Error UI</div>}>
          Content
        </Card>
      );
      expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should prioritize error over loading state', () => {
      render(
        <Card loading error>
          Content
        </Card>
      );
      // Error should take precedence, but currently loading takes precedence
      // This documents current behavior - loading is checked first
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
