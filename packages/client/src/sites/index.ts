import { SITE_RO } from '@big/types';

import { sleep } from '@client/index';

const sitesList: SITE_RO[] = [];
export async function getSites(): Promise<SITE_RO[]> {
    await sleep();
    return sitesList;
}
