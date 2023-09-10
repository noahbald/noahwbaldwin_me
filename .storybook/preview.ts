import type { Preview } from '@storybook/svelte';
import 'sanitize.css';
import '$lib/../routes/layout.css';
import { mockResume } from '$lib/../__mocks__/api';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
        mockData: [
            {
                url: '/api/resume',
                method: 'GET',
                status: 200,
                response: JSON.stringify(mockResume),
            }
        ],
	}
};

export default preview;
