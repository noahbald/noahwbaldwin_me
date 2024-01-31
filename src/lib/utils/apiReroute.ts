const apiReroute = (bin: 'projects' | 'resume' | 'blogs', headers: Headers = new Headers()) => {
	headers = new Headers(headers);
	headers.set('Content-Type', 'application/json');

	return fetch(`${import.meta.env.VITE_BUCKET}/bins/${bin}.json`, { headers });
};
export default apiReroute;
