/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Loader2 } from 'lucide-react';
import React from 'react';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { ATELIER } from '@big/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@big/ui';

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
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {
                <>
                    <div
                        //className="m-4 rounded-md border border-slate-1600 hidden h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto"
                        className="container bg-white h-[500px] w-full m-4 rounded-md border border-slate-1600 hidden flex-1 flex-col space-y-8 p-8 md:flex overflow-auto"
                    >
                        <Table>
                            <TableHeader className="sticky top-0">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className="h-12 px-2"
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
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="p-1"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <TablePagination table={table} />
                    </div>
                </>
            }
        </div>
    );
}