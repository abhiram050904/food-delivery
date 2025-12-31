import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios;

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedAxios.post.mockClear();
    mockedNavigate.mockClear();
    // Ensure the defaults object is present for the test environment
    mockedAxios.defaults = { headers: { common: {} } };
  });

  test('renders the login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows an error message if fields are empty', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText('Both email and password are required.')).toBeInTheDocument();
  });

  test('calls the login function on submit and navigates on success', async () => {
    mockedAxios.post.mockResolvedValue({ data: { token: 'fake_token' } });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('shows an error message on failed login', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: { message: 'Invalid credentials' },
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});
