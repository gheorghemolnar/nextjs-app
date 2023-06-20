import { LucideIcon } from 'lucide-react';

import { CONTROL, CONTROL_STATUS,IResponseRO } from '@big/types';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './components/data-table';

type ListingProperties = {
    columns: ColumnDef<CONTROL, any>[];
    siteId: string;
    options: { statuses: TABLE_CONTROL_STATUS[] };
    getData: <T>({
        siteId,
        pageIndex,
        pageSize,
    }: {
        siteId: string;
        pageIndex: number;
        pageSize: number;
    }) => Promise<IResponseRO<T>>;
};

export interface TABLE_CONTROL_STATUS {
    value: CONTROL_STATUS;
    label: string;
    icon: LucideIcon;
    color: string;
}

export default function Listing({
    columns,
    options,
    getData,
    siteId,
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
