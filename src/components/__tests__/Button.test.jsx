import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from '../Button';

describe('Button', () => {
  it('should render correctly with default props', () => {
    render(<MemoryRouter><Button>Click Me</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r from-purple-500 to-indigo-600');
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2');
  });

  it('should render different variants', () => {
    const { rerender } = render(<MemoryRouter><Button variant="secondary">Secondary</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200 text-gray-800');

    rerender(<MemoryRouter><Button variant="danger">Danger</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
  });

  it('should render different sizes', () => {
    const { rerender } = render(<MemoryRouter><Button size="sm">Small</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1 text-sm');

    rerender(<MemoryRouter><Button size="lg">Large</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toHaveClass('px-5 py-3 text-lg');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<MemoryRouter><Button onClick={handleClick}>Clickable</Button></MemoryRouter>);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<MemoryRouter><Button disabled>Disabled</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should navigate to a different route when href is provided', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <Button href="/test">Go to Test</Button>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should not call onClick when href is provided', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Button href="/test" onClick={handleClick}>Clickable Link</Button>
      </MemoryRouter>
    );
    screen.getByRole('link').click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should display left icon if provided', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    render(<MemoryRouter><Button leftIcon={<LeftIcon />}>With Left Icon</Button></MemoryRouter>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should display right icon if provided', () => {
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    render(<MemoryRouter><Button rightIcon={<RightIcon />}>With Right Icon</Button></MemoryRouter>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should render full width button', () => {
    render(<MemoryRouter><Button fullWidth>Full Width</Button></MemoryRouter>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});