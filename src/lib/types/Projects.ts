type IProjects = {
	externalLinks?: Record<string, string>;
	href: string;
	markdown: string;
	metadata: {
		year: number;
		topics: string[];
		client: string;
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
export default IProjects;
