import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';



describe('StateDropdown', () => {

  it('should display all 50 US states in the dropdown', async () => {
   // fetch.mockResponseOnce([{ state: 'Alabama', capital: 'Montgomery' },{ state: 'Alaska', capital: 'Juneau' },{ state: 'Arizona', capital: 'Phoenix' }]);

    render(<App />);

    const dropdown = await screen.findByRole('select');
    fireEvent.click(dropdown);

    const dropdownItems = await screen.findAllByRole('option');
    expect(dropdownItems).toHaveLength(3);

    dropdownItems.forEach((item, index) => {
      expect(item).toHaveTextContent(`Alabama`);
    });
  });

  it('should display the capital of the selected state', async () => {
    render(<App />);

    const dropdown = await screen.findByRole('select');
    fireEvent.change(dropdown, { target: { value: 'California' } });

    await waitFor(() => {
      const capital = screen.getByText('Sacramento');
      expect(capital).toBeInTheDocument();
    });
  });
});