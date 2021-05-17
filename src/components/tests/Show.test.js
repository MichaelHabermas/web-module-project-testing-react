import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//add in approprate test data structure here.
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
		}
	]
};

test('renders testShow and no selected Season without errors', () => {
	//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
	render(<Show show={testShow} selectedSeason="none" />);
});

test('renders Loading component when prop show is null', () => {
	//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
	render(<Show selectedSeason="none" />);

	const loading = screen.queryByText(/Fetching data.../i);

	expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
	//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
	render(<Show show={testShow} selectedSeason="none" />);

	const seasons = screen.queryAllByTestId('season-option');

	expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
	//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.

	const handleSelect = jest.fn();

	render(<Show show={testShow} handleSelect={handleSelect} selectedSeason="none" />);

	const selector = screen.getByRole('combobox');
	const seasons = screen.queryAllByTestId('season-option');

	userEvent.selectOptions(selector, seasons[1]);

	expect(handleSelect).toBeCalledTimes(1);
	expect(handleSelect.mock.calls.length === 1).toBeTruthy();
	expect(handleSelect.mock.calls.length).toBe(1);
	expect(handleSelect.mock.calls).toHaveLength(1);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
	const { rerender } = render(<Show show={testShow} selectedSeason="none" />);
	const episodes = screen.queryByTestId('episodes-container');
	expect(episodes).toBeFalsy();

	rerender(<Show show={testShow} selectedSeason="1" />);
	expect(screen.getByTestId('episodes-container')).toBeTruthy();
});
