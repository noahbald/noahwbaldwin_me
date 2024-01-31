import type { RequestHandler } from './$types';
import apiReroute from '$lib/utils/apiReroute';

export const GET: RequestHandler = async () => {
	return apiReroute('projects');
};
