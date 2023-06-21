import React from 'react';

import { IResponseRO } from '@big/types';
import { Button } from '@big/ui';
/* import { ControlDetails } from "@big/ui/rti/controlDetails"; */
import { Skeleton } from '@big/ui';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@big/ui';

import { TABLE_CONTROL_STATUS } from '@backoffice/components/listing/listing';
/* import { formatDate } from '@backoffice/lib/utils'; */
import * as Dialog from '@radix-ui/react-dialog';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

import './styles.css';
/* import ModalControl from "@/components/modals/modalControl"; */

const pageIndexDefault = 0;
const pageSizeDefault = 20;
const pageCountDefault = -1;

interface DataTableProperties<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    options: { statuses: TABLE_CONTROL_STATUS[] };
    getData: <T>(options: {
        siteId: string;
        pageIndex: number;
        pageSize: number;
    }) => Promise<IResponseRO<T>>;
    siteId: string;
}

export function DataTable<TData, TValue>({
    columns,
    options,
}: /*     siteId,
    getData, */
DataTableProperties<TData, TValue>) {
    /** Modal */
    const [open, onOpenDialog] = React.useState(false);
    const [selectedDialogRowData, setSelectedDialogRowData] =
        React.useState<TData>();
    /** Modal */

    /**  Pagination*/
    const [dataFetched, _setDataFetched] = React.useState<IResponseRO<TData>>();

    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex : pageIndexDefault,
            pageSize  : pageSizeDefault,
        });

    /*
  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }
  */

    const pagination = React.useMemo(() => {
        return {
            pageIndex,
            pageSize,
        };
    }, [pageIndex, pageSize]);

    React.useEffect(() => {
        setIsLoading(true);

        /* TODO: !!! TO REWORK !!!
         const fetchData = async () => {
            try {
                const data = await getData<TData>({
                    siteId,
                    pageIndex,
                    pageSize,
                });

                setDataFetched(data);
            } catch (error) {
                console.log('Fetching Data ERROR:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData(); 
    */
    }, [pageIndex, pageSize]);

    const pageCount = dataFetched?.numberOfRecords
        ? Math.ceil(dataFetched?.numberOfRecords / pageSize)
        : pageCountDefault;

    /**  Pagination*/
    const [isLoading, setIsLoading] = React.useState(true);

    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        meta: {
            setSelectedDialogRowData,
            showModal: () => {
                onOpenDialog(true);
            },
        },
        data      : dataFetched?.data || [],
        columns,
        pageCount : pageCount ?? pageCountDefault,
        state     : {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection       : true,
        onRowSelectionChange     : setRowSelection,
        onSortingChange          : setSorting,
        onColumnFiltersChange    : setColumnFilters,
        onColumnVisibilityChange : setColumnVisibility,
        getCoreRowModel          : getCoreRowModel(),
        getFilteredRowModel      : getFilteredRowModel(),
        getPaginationRowModel    : getPaginationRowModel(),
        getSortedRowModel        : getSortedRowModel(),
        getFacetedRowModel       : getFacetedRowModel(),
        getFacetedUniqueValues   : getFacetedUniqueValues(),

        // Pagination
        manualPagination   : true,
        onPaginationChange : setPagination,
    });

    return (
        <div className="bg-white space-y-4">
            <Dialog.Root open={isLoading || open} onOpenChange={onOpenDialog}>
                <Dialog.Portal>
                    {(isLoading || open) && (
                        <>
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent">
                                {isLoading ? (
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                ) : (
                                    open &&
                                    selectedDialogRowData && (
                                        <>
                                            {/* // TODO: Better TYPESCRIPT !!! */}
                                            {/* <ModalControl data={selectedDialogRowData} /> */}
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    onOpenDialog(false)
                                                }
                                            >
                                                Fermer
                                            </Button>
                                        </>
                                    )
                                )}
                            </Dialog.Content>
                        </>
                    )}
                </Dialog.Portal>
            </Dialog.Root>

            <DataTableToolbar table={table} options={options} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
