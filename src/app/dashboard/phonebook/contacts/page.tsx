"use client";

import { Button } from "@/components/ui/button";
import CustomizeButton from "@/components/ui/CustomizeButton";
import FilterButton from "@/components/ui/FilterButton";
import HeaderWithButton from "@/components/ui/HeaderWithButton";
import { useRouter } from "next/navigation";
import React from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import Table from '@/components/tables/table'

interface Data {
    names: string;
    phone_number: string;
    email: string;
    gender: string;
}

const data: Data[] = [
	{
	  'names': 'John Doe',
	  'phone_number': '0711223344',
	  'email': 'johndoe@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Sarah Doe',
	  'phone_number': '0711223344',
	  'email': 'sarah@example.com',
	  'gender': 'F'
	},
	{
	  'names': 'James Smith',
	  'phone_number': '0711445566',
	  'email': 'jamessmith@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Emily Johnson',
	  'phone_number': '0711335544',
	  'email': 'emilyj@example.com',
	  'gender': 'F'
	},
	{
	  'names': 'Michael Brown',
	  'phone_number': '0722112233',
	  'email': 'mbrown@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Jessica Williams',
	  'phone_number': '0733112233',
	  'email': 'jwilliams@example.com',
	  'gender': 'F'
	},
	{
	  'names': 'David Miller',
	  'phone_number': '0744223344',
	  'email': 'dmiller@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Sophia Davis',
	  'phone_number': '0755333344',
	  'email': 'sdavis@example.com',
	  'gender': 'F'
	},
	{
	  'names': 'William Garcia',
	  'phone_number': '0766444455',
	  'email': 'wgarcia@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Olivia Martinez',
	  'phone_number': '0777555566',
	  'email': 'omartinez@example.com',
	  'gender': 'F'
	},
	{
	  'names': 'Daniel Wilson',
	  'phone_number': '0788666677',
	  'email': 'dwilson@example.com',
	  'gender': 'M'
	},
	{
	  'names': 'Ava Taylor',
	  'phone_number': '0799777788',
	  'email': 'ataylor@example.com',
	  'gender': 'F'
	}
  ];
  


export default function Contacts() {
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
                accessorKey: 'names',
                header: 'names',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'phone_number',
                header: 'phone_number',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'email',
                header: 'email',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'gender',
                header: 'gender',
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
			<HeaderWithButton title="Contacts" showButton={false} />

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

			<div className="px-6 pb-6 border-t border-gray-200">
				<div className="flex items-end justify-end pt-[17px] space-x-3">
					<Button
						variant="outline"
						onClick={() =>
							router.push("/dashboard/phonebook/contacts/createcontact")
						}
					>
						Create Single contact
					</Button>
					<Button>Import contact</Button>
				</div>
			</div>

			<div>
				<Table columns={columns} data={data} />
			</div>
		</div>
	);
}
