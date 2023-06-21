import { X } from 'lucide-react';

import { Button } from '@big/ui';
import { Input } from '@big/ui';

import { DataTableViewOptions } from '@backoffice/components/listing/components/data-table-view-options';
import { TABLE_CONTROL_STATUS } from '@backoffice/components/listing/listing';
import { Table } from '@tanstack/react-table';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProperties<TData> {
    table: Table<TData>;
    options: { statuses: TABLE_CONTROL_STATUS[] };
}

export function DataTableToolbar<TData>({
    table,
    options: { statuses }
}: DataTableToolbarProperties<TData>) {
    const isFiltered =
        table.getPreFilteredRowModel().rows.length >
        table.getFilteredRowModel().rows.length;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filtrer sur le contrôle..."
                    value={
                        (table
                            .getColumn('LibCtrl')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('LibCtrl')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('ResultCont') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('ResultCont')}
                        title="Statut"
                        options={statuses}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Enlever
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
