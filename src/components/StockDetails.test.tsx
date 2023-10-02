import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StockDetails from './StockDetails';

// Mock the onBuyStock function
const mockOnBuyStock = jest.fn();

const mockData = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  description: 'A tech giant',
  price: 150,
  // ... other data properties ...
};

describe('StockDetails Component Tests', () => {
  it('renders StockDetails component with basic information', () => {
    const { getByText } = render(<StockDetails data={mockData} onBuyStock={mockOnBuyStock} />);
    
    // Check if the component renders the stock name and symbol.
    expect(getByText('Apple Inc. (AAPL)')).toBeInTheDocument();

    // Check if the Buy button is present.
    expect(getByText('Buy')).toBeInTheDocument();
  });

  it('handles quantity and purchase price input correctly', () => {
    const { getByLabelText, getByText } = render(<StockDetails data={mockData} onBuyStock={mockOnBuyStock} />);
    
    // Find the quantity and purchase price input fields.
    const quantityInput = getByLabelText('Quantity:');
    const priceInput = getByLabelText('Purchase Price:');

    // Simulate user input.
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.change(priceInput, { target: { value: '150.50' } });

    // Check if the input values are updated correctly.
    expect(quantityInput.value).toBe('10');
    expect(priceInput.value).toBe('150.50');
  });

  it('handles the Buy button click and calls onBuyStock function', () => {
    const { getByText } = render(<StockDetails data={mockData} onBuyStock={mockOnBuyStock} />);
    
    // Find the Buy button and click it.
    const buyButton = getByText('Buy');
    fireEvent.click(buyButton);

    // Check if the onBuyStock function is called with the correct parameters.
    expect(mockOnBuyStock).toHaveBeenCalledWith(
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 10, // Adjust as per your test case
        purchasePrice: 150.50, // Adjust as per your test case
        currentPrice: 150, // Adjust as per your mock data
      },
      10 * 150.50 // Total cost
    );
  });

  it('expands and collapses the News section', () => {
    const { getByText } = render(<StockDetails data={mockData} onBuyStock={mockOnBuyStock} />);
    
    // Find the News section and its button.
    const newsButton = getByText('News');
    const newsContent = getByText('Apple News 1'); // Replace with an actual news item from your mock data.

    // Initially, the content should be hidden.
    expect(newsContent).not.toBeVisible();

    // Click the News button to expand.
    fireEvent.click(newsButton);

    // After clicking, the content should be visible.
    expect(newsContent).toBeVisible();

    // Click the News button again to collapse.
    fireEvent.click(newsButton);

    // After clicking again, the content should be hidden.
    expect(newsContent).not.toBeVisible();
  });

  // Similar test cases can be written for Analyst Ratings and Time Series sections.
});
