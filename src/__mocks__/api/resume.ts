import type Resume from '../../lib/types/Resume';

const resume: Resume = {
	intro: 'Lorem ipsum dolor sit amet',
	items: [
		{
			title: 'Item 1',
			image: 'https://placehold.co/608x608',
			imageAlt: 'Example item image 1',
			uid: '1',
			contents: [
				{
					body: 'Lorem ipsum dolor sit amet.',
					icon: 'https://placehold.co/24x24',
					title: 'Item content 1',
					uid: '1',
				},
				{
					body: 'Consectetur adipiscing elit',
					icon: 'https://placehold.co/150x150',
					title: 'Item content 2',
					uid: '2',
				},
			],
		},
		{
			title: 'Item 2',
			image: 'https://placehold.co/200x100',
			imageAlt: 'Example item image 2',
			uid: '2',
			contents: [
				{
					body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
					icon: 'https://placehold.co/300x300',
					title: 'Item content 3',
					uid: '3',
				},
				{
					body: 'Magna sit amet purus gravida quis blandit',
					icon: 'https://placehold.co/300x300',
					title: 'Item content 4',
					uid: '4',
				},
			],
		},
		{
			title: 'Item 3',
			image: 'https://placehold.co/100x200',
			imageAlt: 'Example item image 3',
			uid: '3',
			contents: [
				{
					body: 'Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet',
					icon: 'https://placehold.co/100x200',
					title: 'Item content 5',
					uid: '5',
				},
				{
					body: 'Feugiat nibh sed pulvinar proin gravida hendrerit lectus',
					icon: 'https://placehold.co/199x100',
					title: 'Item content 6',
					uid: '6',
				},
			],
		},
	],
};
export default resume;
