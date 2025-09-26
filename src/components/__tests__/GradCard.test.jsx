import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GradCard from '../GradCard';

describe('GradCard', () => {
  it('renders children correctly', () => {
    render(
      <GradCard>
        <div>Test Content</div>
      </GradCard>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <GradCard className="custom-class">
        <div>Content</div>
      </GradCard>
    );
    
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('renders with different padding options', () => {
    const { rerender } = render(
      <GradCard padding="sm">
        <div>Small Padding</div>
      </GradCard>
    );
    
    let card = screen.getByText('Small Padding').closest('div');
    expect(card).toHaveClass('p-4');

    rerender(
      <GradCard padding="lg">
        <div>Large Padding</div>
      </GradCard>
    );
    
    card = screen.getByText('Large Padding').closest('div');
    expect(card).toHaveClass('p-8');
  });

  it('renders with different shadow options', () => {
    render(
      <GradCard shadow="lg">
        <div>Large Shadow</div>
      </GradCard>
    );
    
    const card = screen.getByText('Large Shadow').closest('div');
    expect(card).toHaveClass('shadow-lg');
  });

  it('renders header, body, and footer correctly', () => {
    render(
      <GradCard>
        <GradCard.Header>Header Content</GradCard.Header>
        <GradCard.Body>Body Content</GradCard.Body>
        <GradCard.Footer>Footer Content</GradCard.Footer>
      </GradCard>
    );
    
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders title and description correctly', () => {
    render(
      <GradCard>
        <GradCard.Title>Card Title</GradCard.Title>
        <GradCard.Description>Card Description</GradCard.Description>
      </GradCard>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('text-xl', 'font-bold', 'text-grad-primary');
  });
});