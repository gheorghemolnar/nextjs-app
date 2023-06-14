import { ATELIER_RO } from '@big/types';

import { sleep } from '..'; // @client/index is also valid like in sites/index example

const atelierList: ATELIER_RO[] = [];
export async function getAteliers(): Promise<ATELIER_RO[]> {
    await sleep();
    return atelierList;
}
