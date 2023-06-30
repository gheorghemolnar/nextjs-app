import { EditIcon, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { Check, X } from 'lucide-react';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { CONTROLE } from '@big/types';
import {
    Button,
    cn,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@big/ui';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@big/ui';
import { Schema_Controle_Status } from '@big/validators';

import { useGetByIdControle, useListControle } from '@backoffice/api/controle';
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

import { ControleForm } from './forms/controle';
import { SortableColumn, TablePagination } from './commons';

export const statuses = [
    {
        value : Schema_Controle_Status.enum.C,
        label : 'Conforme',
        icon  : Check,
        color : 'text-green-900'
    },
    {
        value : Schema_Controle_Status.enum.NC,
        label : 'Non Conforme',
        icon  : X,
        color : 'text-red-900'
    },
    {
        value : Schema_Controle_Status.enum.NV,
        label : 'Non Vu',
        icon  : EyeOffIcon,
        color : 'text-black'
    }
];

export default function Listing() {
    const startPeriode = '2023-06-01T00:00:00.000Z';
    const endPeriode = '2023-06-30T00:00:00.000Z';
    const [searchParameters] = useSearchParams();
    const { resultatCtrl } = Object.fromEntries(searchParameters);

    const { typeControle = '', idSecteur = '', idAtelier = '' } = useParams();
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
    } = useListControle({
        typeGrille: typeControle.toUpperCase(),
        idSecteur,
        idAtelier,
        pageIndex,
        pageSize,
        startPeriode,
        endPeriode,
        resultatCtrl
    });
    console.log({ isLoading, isSuccess, isError, dataQuery });

    // COLUMNS
    const columns = React.useMemo<ColumnDef<CONTROLE>[]>(
        () => [
            {
                accessorKey : 'daHeCont',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Date Heure" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    const dt = formatDate(row.getValue('daHeCont'));
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[200px] truncate">{`${dt}`}</span>
                        </div>
                    );
                }
            },
            {
                accessorKey : 'grilleSite.paramSite.secteur.libSecteur',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Secteur" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    const cellValue =
                        row.original.grilleSite.enteteGrilleSite.paramSite
                            .secteur.libSecteur;
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {cellValue}
                            </span>
                        </div>
                    );
                }
            },
            {
                accessorKey : 'grilleSite.paramSite.atelier.libAtelier',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Atelier" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    const cellValue =
                        row.original.grilleSite.enteteGrilleSite.paramSite
                            .atelier.libAtelier ?? '';
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {cellValue}
                            </span>
                        </div>
                    );
                }
            },
            {
                accessorKey : 'grilleSite.grilleGroupe.libCtrl',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Contrôle" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    const cellValue =
                        row.original.grilleSite.grilleGroupe.libCtrl;
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[300px] truncate">
                                {cellValue}
                            </span>
                        </div>
                    );
                }
            },
            {
                accessorKey : 'resultatCtrl',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Statut" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    const status = statuses.find(
                        (status) =>
                            status.value === row.getValue('resultatCtrl')
                    );

                    if (!status) {
                        return null;
                    }

                    const color = status.color ?? '';
                    return (
                        <div className="flex items-start">
                            {status.icon && (
                                <status.icon
                                    className={cn('mr-2 h-6 w-6', color)}
                                />
                            )}
                            <span>{status.label}</span>
                        </div>
                    );
                },

                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id));
                }
            },
            {
                accessorKey : 'creaQui',
                header      : ({ column }) => (
                    <div className="text-center">
                        {<SortableColumn title="Qui" column={column} />}
                    </div>
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {row.getValue('creaQui')}
                            </span>
                        </div>
                    );
                }
            },
            {
                id     : 'actions',
                header : () => <div className="text-center">Actions</div>,
                cell   : ({ row }) => {
                    return (
                        <div className="flex items-center px-3 justify-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[625px] lg:max-w-[840px]">
                                    <ReadDialog
                                        controleId={row.original.idControle}
                                    />
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                    >
                                        <EditIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[625px]">
                                    <EditDialog
                                        controleId={row.original.idControle}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                }
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
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {
                <>
                    <h1 className="m-4 text-lg font-extrabold">Contrôles</h1>
                    <div
                        //className="m-4 p-3 bg-white rounded-md border border-slate-1600 hidden h-full flex-1 flex-col space-y-8 p-8 md:flex"
                        //className="m-4 p-4 bg-white rounded-md border border-slate-1600 hidden flex-1 flex-col space-y-6 md:flex"
                        className="container bg-white h-[550px] w-full m-4 rounded-md border border-slate-1600 hidden flex-1 flex-col space-y-8 p-8 md:flex overflow-auto"
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
                                                    className="h-12 px-2  bg-orange-200"
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
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

export function Loader({ className }: { className?: string }) {
    return (
        <DialogHeader>
            <DialogTitle>Chargement ...</DialogTitle>
            <DialogDescription
                className={cn('mx-auto flex items-center', className)}
            >
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-brand" />
            </DialogDescription>
        </DialogHeader>
    );
}

export function ReadDialog({ controleId }: EditProperties) {
    const { isLoading, isError, data } = useGetByIdControle(controleId);

    if (isLoading) {
        return <Loader />;
    }

    const controle = data?.data ?? {};
    console.log('DialogRead >', { isLoading, isError, controle });

    if (!controle) return null;

    return (
        <>
            <DialogHeader>
                <DialogTitle className={cn({ 'bg-orange-100 p-2': true })}>
                    Détails Contrôle
                </DialogTitle>
                <DialogDescription>
                    Contrôle <span className="font-bold">Matière</span> /
                    Secteur{' '}
                    <span className="font-bold">1ère Tranformation Boeuf</span>{' '}
                    / Atelier{' '}
                    <span className="font-bold">Mise en quartier</span> <br />{' '}
                    du 28/06/2023 à 04:30, par Titi Dupont.
                </DialogDescription>
            </DialogHeader>
            <div className="rounded-md p-6">
                <div className="grid grid-cols-2 gap-3">
                    <img src="/assets/pic01.jpg" />
                    <img src="/assets/pic02.jpg" />
                </div>
                <div>
                    <p className="text-extra-bold">Commentaire:</p>
                    <p className="text-sm text-muted-foreground">
                        Le commentaires du contrôles non conforme /vu seront
                        affichés ici.
                    </p>
                </div>
            </div>
        </>
    );
}

type EditProperties = {
    controleId: number;
};

export function EditDialog({ controleId }: EditProperties) {
    const { isLoading, isError, data } = useGetByIdControle(controleId);

    if (isLoading) {
        return <Loader />;
    }

    const controle = data?.data ?? null;
    console.log('DialogEdit >', { isLoading, isError, controle });
    if (!controle) {
        return null;
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="bg-orange-100 p-2">
                    Edition Contrôle
                </DialogTitle>
                <DialogDescription>
                    Contrôle <span className="font-bold">Matière</span> /
                    Secteur{' '}
                    <span className="font-bold">1ère Tranformation Boeuf</span>{' '}
                    / Atelier{' '}
                    <span className="font-bold">Mise en quartier</span> <br />{' '}
                    du 28/06/2023 à 04:30, par Titi Dupont.
                </DialogDescription>
            </DialogHeader>
            <div className="rounded-md p-6">
                <div className="grid grid-cols-1 gap-3">
                    <ControleForm controle={controle} />
                </div>
            </div>
        </>
    );
}
