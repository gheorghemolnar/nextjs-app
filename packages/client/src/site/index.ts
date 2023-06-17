import { SITE } from '@big/types';

import { sleep } from '@client/index';

const sitesList: SITE[] = [];
export async function getSites(): Promise<SITE[]> {
    await sleep();
    return sitesList;
}
