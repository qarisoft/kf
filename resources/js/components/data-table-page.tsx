import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable, VisibilityState } from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';
import React, { ReactNode } from 'react';

export function selectColumn<T>(): ColumnDef<T> {
    return {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    };
}

type GetCelFunc<T> = (row: Row<T>) => ReactNode;

export function makeColumn<T>({ k: key, f: getCel, h: header }: { k: string; h?: string; f?: GetCelFunc<T> }): ColumnDef<T> {
    return {
        accessorKey: key,
        header: header ?? key,
        cell: ({ row }) => {
            if (getCel) {
                return getCel(row);
            }
            return <div className={'p-1.5'}>{`${row.getValue(key)}`.substring(0, 20)}</div>;
        },
    };
}

interface DataTablePageProps<T> {
    columns: ColumnDef<T>[];
    pageData: PaginatedData<T>;
    pagePath?: string;
    onCreate?: () => void;
}

function DataTablePage<T>({ columns, pageData,pagePath,onCreate }: DataTablePageProps<T>) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data: pageData.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
        },
    });

    const { url } = usePage();

    const paginate = (perPage: number) => {
        router.get(url, {
            perPage,
        });
    };
    return (
        <div className="overflow-aut flex h-full max-h-full flex-col gap-2">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter emails..."
                    // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    // onChange={(event) =>
                    //     table.getColumn("email")?.setFilterValue(event.target.value)
                    // }
                    className="max-w-sm"
                />

                <div className="ms-2 flex gap-2">
                {(pagePath || onCreate)&&(
                    <Button onClick={() => {
                        if (onCreate!=null){
                            onCreate()
                        }else {
                            router.get(route(`${pagePath}.create`));
                        }
                    }}>
                        <Plus />
                    </Button>
                ) }

                    <div className="hidden lg:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ms-auto">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <Table className={'relative'}>
                    <TableHeader className={''}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={''}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={'sticky top-0 z-[2] bg-gray-100 dark:bg-accent'}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-around space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                    <Label htmlFor="rows-per-page" className="text-sm font-medium">
                        Rows per page
                    </Label>
                    <Select
                        value={`${pageData.per_page}`}
                        onValueChange={(value) => {
                            paginate(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[15, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
            </div>
        </div>
    );
}

export default DataTablePage;
