import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
    test('test toggle', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10')
    });
});

describe('Counter increment', () => {
    test('test toggle', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        });
        userEvent.click(screen.getByTestId('increment-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('11')
    });
});

describe('Counter decrement', () => {
    test('test toggle', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        });
        userEvent.click(screen.getByTestId('decrement-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('9')
    });
});
