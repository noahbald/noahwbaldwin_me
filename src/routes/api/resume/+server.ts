import type { RequestHandler } from './$types';
import apiReroute from '$lib/utils/apiReroute';

export const GET: RequestHandler = (request) => {
	return apiReroute(request.request, 'RESUME');
};
