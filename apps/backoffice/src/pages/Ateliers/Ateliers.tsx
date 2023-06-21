import { Loader2 } from 'lucide-react';
import React from 'react';

import { ATELIER } from '@big/types';

import { useListAtelier } from '@backoffice/api/atelier';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table';

export default function Ateliers() {
    const { data: dataQuery, isLoading, isSuccess, isError } = useListAtelier();
    console.log({ isLoading, isSuccess, isError, dataQuery });

    const columns = React.useMemo<ColumnDef<ATELIER>[]>(
        () => [
            {
                accessorKey : 'codeAtelier',
                header      : 'Code',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'libAtelier',
                header      : 'Libellé',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'ordreAff',
                header      : 'Order Aff',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'creaQuand',
                header      : 'Création',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'creaQui',
                header      : 'Auteur',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'modifQuand',
                header      : 'Modification',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'modifQui',
                header      : 'Par',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'annuQuand',
                header      : 'Annulation',
                footer      : (properties) => properties.column.id,
            },
            {
                accessorKey : 'annuQui',
                header      : 'Par',
                footer      : (properties) => properties.column.id,
            },
        ],
        [],
    );
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex : 0,
            pageSize  : 10,
        });

    const defaultData = React.useMemo(() => [], []);

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    );

    const table = useReactTable({
        data      : dataQuery ?? defaultData,
        columns,
        //pageCount : dataQuery.?pageCount ?? -1,
        pageCount : -1,
        state     : {
            pagination,
        },
        onPaginationChange : setPagination,
        getCoreRowModel    : getCoreRowModel(),
        manualPagination   : true,
        // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
        debugTable         : true,
    });

    /*
    {
        "idAtelier": 1,
        "codeAtelier": "1",
        "libAtelier": "Chaine d'abattage",
        "ordreAff": 10,
        "creaQuand": "2023-04-26T14:46:05.477172",
        "creaQui": "YP",
        "modifQuand": null,
        "modifQui": null,
        "annuQuand": null,
        "annuQui": null
    },
    */

    return (
        <div className="m-4 p-2">
            <h1 className="m-4 text-lg font-extrabold">Ateliers</h1>
            {isLoading ? <Loader2 /> : null}
            {
                <div className="m-4 p-3 rounded-md border border-slate-1600 hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <table>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
