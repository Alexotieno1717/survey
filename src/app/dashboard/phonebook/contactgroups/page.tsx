"use client";
import { Button } from "@/components/ui/button";
import CustomizeButton from "@/components/ui/CustomizeButton";
import FilterButton from "@/components/ui/FilterButton";
import { useRouter } from "next/navigation";
import React from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import Table from '@/components/tables/table'


interface Data {
    name: string;
    client: string;
    status: string;
    inserted_at: string;
    updated_at: string;
}

const data: Data[] = [
	{
	  'name': 'Marketing Team',
	  'client': 'John Doe',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Sales Team',
	  'client': 'James Smith',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Development Team',
	  'client': 'Emily Johnson',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'HR Department',
	  'client': 'Michael Brown',
	  'status': 'INACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Customer Support',
	  'client': 'Jessica Williams',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'IT Team',
	  'client': 'David Miller',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Executive Team',
	  'client': 'Sophia Davis',
	  'status': 'INACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'R&D Team',
	  'client': 'William Garcia',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Design Team',
	  'client': 'Olivia Martinez',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Finance Department',
	  'client': 'Daniel Wilson',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Legal Team',
	  'client': 'Ava Taylor',
	  'status': 'INACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	},
	{
	  'name': 'Procurement Team',
	  'client': 'Chris Evans',
	  'status': 'ACTIVE',
	  'inserted_at': '2024-09-24 12:11:11',
	  'updated_at': '2024-09-24 12:11:11',
	}
  ];
  


function ContactGroups() {
	const router = useRouter();

	const columns = React.useMemo<ColumnDef<Data>[]>(
        () => [
            {
                id: 'id', // Unique ID for the column
                header: 'No',
                cell:(props)=>{

                  return props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row)+1;
                 }
            }         ,
            {
                accessorKey: 'name',
                header: 'name',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'client',
                header: 'client',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'status',
                header: 'status',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'inserted_at',
                header: 'inserted at',
                cell: (info) => info.getValue(),
            },
			{
                accessorKey: 'updated_at',
                header: 'updated at',
                cell: (info) => info.getValue(),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: () => (
                <div className="flex justify-center space-x-2">
                    <Link href={`/dashboard/phonebook/contactgroupmaps/view/1`}>
                        <Button variant="outline" size="icon"> <Eye className='text-green-400 size-5' /></Button>
                    </Link>
                    <Link href={`/dashboard/phonebook/contactgroupmaps/edit/1`}>
                        <Button variant="outline" size="icon"><Pencil className='text-yellow-400 size-5'/></Button>
                    </Link>
                    <Button variant="outline" size="icon"><Trash className='text-red-600 size-5'/></Button>
                </div>
                ),
            },
        ],
        []
      );

	return (
		<div className="md:p-4 pt-8 mt-12 space-y-4">
			<div className="flex justify-between">
				<h1 className="font-semibold text-4xl text-[#171725] leading-10">
					Contact Groups
				</h1>
				<Button
					onClick={() =>
						router.push(
							"/dashboard/phonebook/contactgroups/createcontactgroup"
						)
					}
				>
					Create Contact Group
				</Button>
			</div>

			<div className="p-6">
				<div className="flex space-x-4">
					<div className="relative flex-grow">
						<input
							type="text"
							className="w-full px-10 py-3 border border-gray-300 rounded-[8px] shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							placeholder="Search"
						/>
						<span className="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</span>
					</div>
					<FilterButton />
					<CustomizeButton />
				</div>
			</div>

			<div className="px-6">
				<form action="">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
						<div className="space-y-[6px]">
							<label className="text text-sm ">Name</label>
							<input
								placeholder="Select Client To Transfer To ...."
								className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>

						<div className="space-y-[6px]">
							<label className="text text-sm">Client</label>
							<select className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
								<option value="">Select Client To Transfer From ...</option>
								<option value="1">Survey 1</option>
								<option value="2">Survey 2</option>
								<option value="3">Survey 3</option>
							</select>
						</div>
					</div>

					<div className="flex items-end justify-end pt-[17px] space-x-3">
						<Button variant="outline">Reset</Button>
						<Button>Search</Button>
					</div>
				</form>
			</div>

			<div>
				<Table columns={columns} data={data} />
			</div>
		</div>
	);
}

export default ContactGroups;
