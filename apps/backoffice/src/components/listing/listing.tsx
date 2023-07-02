import { LucideIcon } from 'lucide-react';

import { CONTROLE, CONTROLE_STATUS, IResponseRO } from '@big/types';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './components/data-table';

export interface TABLE_CONTROLE_STATUS {
    value: CONTROLE_STATUS;
    label: string;
    icon: LucideIcon;
    color: string;
}

type ListingProperties = {
    columns: ColumnDef<CONTROLE, any>[];
    siteId: string;
    options: { statuses: TABLE_CONTROLE_STATUS[] };
    getData: <T>({
        siteId,
        pageIndex,
        pageSize
    }: {
        siteId: string;
        pageIndex: number;
        pageSize: number;
    }) => Promise<IResponseRO<T>>;
};

export default function Listing({
    columns,
    options,
    getData,
    siteId
}: ListingProperties) {
    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable
                    columns={columns}
                    options={options}
                    siteId={siteId}
                    getData={getData}
                />
            </div>
        </>
    );
}
