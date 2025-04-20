import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/app/(auth)/login/page.jsx'; // Adjust the path to your Login component
import '@testing-library/jest-dom/extend-expect';

describe('Login Component', () => {
  test('renders login form and submits', () => {
    const mockLoginHandler = jest.fn();

    render(<Login onLogin={mockLoginHandler} />);

    // Check form fields
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Expect the handler to be called with email & password
    expect(mockLoginHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
