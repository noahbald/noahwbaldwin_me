import type { RequestHandler } from './$types';
import apiReroute from '$lib/utils/apiReroute';

export const GET: RequestHandler = () => {
	return apiReroute('resume');
};
