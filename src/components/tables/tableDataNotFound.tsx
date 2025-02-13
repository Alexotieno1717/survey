import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';

interface ITableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

export default function TableDataNotFound<T>({ data, columns }: ITableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <div className="p-4">
            <div className="relative sm:rounded-lg overflow-x-auto">
                <table id="react-table" className="w-full min-w-max table-auto text-left shadow-lg rounded-lg divide-y divide-gray-200">
                    <thead className="text-lg uppercase">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-center px-1 py-2  text-base font-medium text-gray-500 uppercase tracking-wider"
                                    colSpan={header.colSpan}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200 h-48 relative">
                    <tr>
                        <td>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-center text-2xl font-black">No results found.</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
            <div className="border-t border-gray-200" />
        </div>
    );
}
