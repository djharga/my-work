import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon', () => {
  it('should render correctly with default props', () => {
    render(<Icon name="home" />);
    const iconElement = screen.getByTestId('icon-svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('w-5 h-5'); // Default size
    expect(iconElement).toHaveClass('text-current'); // Default color
  });

  it('should render with custom size', () => {
    render(<Icon name="search" size="lg" />);
    const iconElement = screen.getByTestId('icon-svg');
    expect(iconElement).toHaveClass('w-6 h-6');
  });

  it('should render with custom color', () => {
    render(<Icon name="settings" color="red-500" />);
    const iconElement = screen.getByTestId('icon-svg');
    expect(iconElement).toHaveClass('text-red-500');
  });

  it('should pass other props to the svg element', () => {
    render(<Icon name="user" className="custom-class" aria-hidden="true" />);
    const iconElement = screen.getByTestId('icon-svg');
    expect(iconElement).toHaveClass('custom-class');
    expect(iconElement).toHaveAttribute('aria-hidden', 'true');
  });
});