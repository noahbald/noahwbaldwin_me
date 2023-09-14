const apiReroute = (request: Request, bin: 'PROJECTS' | 'RESUME' | 'BLOGS') => {
	const headers = new Headers(request.headers);
	headers.set('X-Access-Key', import.meta.env.VITE_JSON_BIN_KEY);
	headers.set('Content-Type', 'application/json');

	return fetch(import.meta.env[`VITE_JSON_BIN_${bin}`], new Request(request, { headers }));
};
export default apiReroute;
