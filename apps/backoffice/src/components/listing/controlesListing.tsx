import { Check, XIcon } from 'lucide-react';

import { CONTROL, IResponseRO } from '@big/types';
import { Button, cn } from '@big/ui';
import { Schema_Control_Status } from '@big/validators';

import Listing from '@backoffice/components/listing/listing';
import { formatDate } from '@backoffice/lib/utils';
import { controlesData } from '@backoffice/tmp/data-controles';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

async function getClientControls({
    siteId,
    pageIndex,
    pageSize,
}: {
    siteId: string;
    pageIndex: number;
    pageSize: number;
}): Promise<IResponseRO<CONTROL>> {
    console.log({ siteId, pageIndex, pageSize });
    /*  const response = await fetch(
    `${URL_BASE}/api/controls/${siteId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const result: IResponseRO<CONTROL> = await response.json(); */
    const result = controlesData;
    console.log('🚀Result >', result);

    return result;
}

export const statuses = [
    {
        value : Schema_Control_Status.enum.C,
        label : 'Conforme',
        icon  : Check,
        color : 'text-green-900',
    },
    {
        value : Schema_Control_Status.enum.NC,
        label : 'NonConforme',
        icon  : XIcon,
        color : 'text-red-900',
    },
];

export const columns: ColumnDef<CONTROL, any>[] = [
    {
        accessorKey : 'DaHeCont',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Date Heure" />
        ),
        cell: ({ row }) => {
            const dt = formatDate(row.getValue('DaHeCont'));

            return (
                <div className="flex space-x-2">
                    <span className="max-w-[200px] truncate font-medium">{`${dt}`}</span>
                </div>
            );
        },
    },
    {
        accessorKey : 'LibSecteur',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Secteur" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('LibSecteur')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey : 'LibAtelier',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Atelier" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('LibAtelier')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey : 'LibCtrl',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Contrôle" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[300px] truncate font-medium">
                        {row.getValue('LibCtrl')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey : 'ResultCont',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Statut" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue('ResultCont'),
            );

            if (!status) {
                return null;
            }

            const color = status.color ?? '';
            return (
                <div className="flex w-[120px] items-center">
                    {status.icon && (
                        <status.icon className={cn('mr-2 h-6 w-6', color)} />
                    )}
                    <span>{status.label}</span>
                </div>
            );
        },

        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id     : 'details',
        header : () => (
            <div className="flex w-[80px] items-center justify-center">
                Détails
            </div>
        ),
        cell: ({ row, _table }) => {
            const rawPhotos =
                row.original?.Photos ||
                row.original.ResultCont === Schema_Control_Status.enum.NC;

            if (rawPhotos) {
                //TODO: Activate it
               /*  const tableMeta = table.options.meta; */
                return (
                    <div className="flex justify-center items-center">
                        <Button
                            className="px-2"
                            onClick={() => {
                                // TODO: Better TYPESCRIPT !!!
                                /*                 tableMeta?.setSelectedDialogRowData! &&
                  tableMeta.setSelectedDialogRowData(row.original);
                tableMeta?.showModal! && tableMeta.showModal(true); */
                            }}
                        >
                            Détails
                        </Button>
                    </div>
                );
            }

            return '';
        },
    },
    {
        accessorKey : 'CreaQui',
        header      : ({ column }) => (
            <DataTableColumnHeader column={column} title="Qui" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    {/*  {label && <Badge variant="outline">{label.label}</Badge>} */}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('CreaQui')}
                    </span>
                </div>
            );
        },
    },
    {
        id   : 'actions',
        cell : ({ row }) => <DataTableRowActions row={row} />,
    },
];

export default function ControlsListing() {
    return (
        <>
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="flex max-w-[1200px] flex-col items-start gap-2">
                    {/*           <h1 className="text-lg font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-1xl lg:text-2xl">
            {site.siteLabel}
          </h1> */}

                    {/*
          <p className="max-w-[700px] text-sm text-muted-foreground">
            ID site : {siteId} / Code RH: {site.code_RH} / Code BG:{" "}
            {site.code_BG}
            &nbsp;
          </p>
          */}
                </div>
                <Listing
                    siteId="01"
                    columns={columns}
                    options={{ statuses }}
                    getData={getClientControls}
                />
            </section>
        </>
    );
}
