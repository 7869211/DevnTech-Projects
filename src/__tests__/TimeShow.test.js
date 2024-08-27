import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeShow from '../Components/TimeShow';

describe('Time component', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('27 Aug 2024 02:12:00 GMT').getTime())
      });

      afterAll(() => {
        jest.useRealTimers();
      });

    test('renders current time', () => {
        render(<TimeShow />);

       
    })
});