import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app component', () => { //tiene que decirme que estoy testeando
  render(<App />);
  const container = screen.getByTestId("app");
  expect(container).toBeInTheDocument();
});
