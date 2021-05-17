//1. Add in necessary imports and values to establish the testing suite.
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

//3. Rebuild or copy a show test data element as used in the previous set of tests.
const testShow = {
	name: 'Mash',
	summary: 'Military Comedy',
	seasons: [
		{
			id: 1,
			name: 's1',
			episodes: []
		},
		{
			id: 2,
			name: 's2',
			episodes: []
		},
		{
			id: 3,
			name: 's3',
			episodes: []
		},
		{
			id: 4,
			name: 's4',
			episodes: []
		}
	]
};

//2. Test that the Display component renders without any passed in props.
test('renders without errors', () => {
	render(<Display />);
});

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
test('renders without errors', async () => {
	render(<Display show={testShow} />);

	const button = screen.getByRole('button');

	userEvent.click(button);

	await waitFor(() => {
		const show = screen.queryByTestId('show-container');
		expect(show).toBeInTheDocument();
	});
});

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test('renders without errors', async () => {
	render(<Display show={testShow} />);
	const button = screen.getByRole('button');

	userEvent.click(button);

	await waitFor(() => {
		const show = screen.queryByTestId('show-container');
		expect(show).toBeInTheDocument();

		const seasons = screen.queryAllByTestId('season-option');
		// expect(seasons).toHaveLength(3);
		expect(seasons).toHaveLength(4);
	});
});

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
test('renders without errors', async () => {
	const mockFunc = jest.fn();

	render(<Display displayFunc={mockFunc} />);

	const button = screen.getByRole('button');

	userEvent.click(button);

	await waitFor(() => {
		expect(mockFunc).toBeCalledTimes(1);
	});
});
