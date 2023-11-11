interface IBlogs {
	metadata: Record<string, unknown>;
	record: {
		href: string;
		markdown: string;
		metadata: {
			year: number;
			topics: string[];
			featured: boolean;
			hidden?: boolean;
		};
		src: string;
		alt?: string;
		subtitle: string;
		title: string;
		type: string;
		uid: string;
	}[];
}
export default IBlogs;
