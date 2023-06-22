/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Loader2 } from 'lucide-react';
import React from 'react';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { ATELIER } from '@big/types';

import { useListAtelier } from '@backoffice/api/atelier';
import {
    SortableColumn,
    TablePagination
} from '@backoffice/components/commons';
import { formatDate } from '@backoffice/lib/utils';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from '@tanstack/react-table';

export default function Ateliers() {
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex : DEFAULT_PAGE_INDEX,
            pageSize  : DEFAULT_PAGE_SIZE
        });
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const {
        data: dataQuery,
        isLoading,
        isSuccess,
        isError
    } = useListAtelier({ pageIndex, pageSize });
    console.log({ isLoading, isSuccess, isError, dataQuery });

    // COLUMNS
    const columns = React.useMemo<ColumnDef<ATELIER>[]>(
        () => [
            {
                accessorKey : 'codeAtelier',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Code" column={column} />}
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-center font-medium">
                        {row.getValue('codeAtelier')}
                    </div>
                )
            },
            {
                accessorKey : 'libAtelier',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Libellé" column={column} />}
                    </div>
                )
            },
            {
                accessorKey : 'ordreAff',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Ordre Aff" column={column} />}
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-center">
                        {row.getValue('ordreAff')}
                    </div>
                )
            },
            {
                accessorKey : 'creaQuand',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Création" column={column} />}
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-center">
                        {formatDate(row.getValue('creaQuand'))}
                    </div>
                )
            },
            {
                accessorKey : 'creaQui',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Auteur" column={column} />}
                    </div>
                )
            },
            {
                accessorKey : 'modifQuand',
                header      : ({ column }) => (
                    <div className="text-center">
                        {
                            <SortableColumn
                                title="Modification"
                                column={column}
                            />
                        }
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-center">
                        {formatDate(row.getValue('modifQuand'))}
                    </div>
                )
            },
            {
                accessorKey : 'modifQui',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Par" column={column} />}
                    </div>
                )
            },
            {
                accessorKey : 'annuQuand',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Annulation" column={column} />}
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-center">
                        {formatDate(row.getValue('annuQuand'))}
                    </div>
                )
            },
            {
                accessorKey : 'annuQui',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Par" column={column} />}
                    </div>
                )
            }
        ],
        []
    );

    const defaultData = React.useMemo(() => [], []);

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data      : dataQuery?.data ?? defaultData,
        columns,
        pageCount : dataQuery?.totalCount
            ? Math.ceil(dataQuery?.totalCount / pageSize)
            : -1,
        state: {
            pagination,
            sorting
        },
        onPaginationChange    : setPagination,
        getCoreRowModel       : getCoreRowModel(),
        getPaginationRowModel : getPaginationRowModel(),
        onSortingChange       : setSorting,
        getSortedRowModel     : getSortedRowModel(),
        manualPagination      : true,
        debugTable            : false
    });

    return (
        <div className="m-4 p-2">
            <h1 className="m-4 text-lg font-extrabold">Ateliers</h1>
            {isLoading ? <Loader2 /> : null}
            {
                <>
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
                                                                header.getContext()
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
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <td key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
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
                    <TablePagination table={table} />
                </>
            }
        </div>
    );
}
