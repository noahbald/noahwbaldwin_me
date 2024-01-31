import type { RequestHandler } from './$types';
import apiReroute from '$lib/utils/apiReroute';

export const GET: RequestHandler = async (request) => {
	return apiReroute('blogs');
};
