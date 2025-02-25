"use client"

import { Button } from '@/components/ui/button'
import CustomizeButton from '@/components/ui/CustomizeButton'
import FilterButton from '@/components/ui/FilterButton'
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import Table from '@/components/tables/table'

interface Data {
    group: string;
    phone_number: string;
    status: string;
    inserted_at: string;
}

const data: Data[] = [
    {
        'group' : 'otm',
        'phone_number' : '0711223344',
        'status' : 'ACTIVE',
        'inserted_at' : '2024-09-24 12:11:11'
    },
    {
        'group' : 'otm',
        'phone_number' : '0711223344',
        'status' : 'ACTIVE',
        'inserted_at' : '2024-09-24 12:11:11'
    }
]

export default function ContactGroupMaps() {
    const router = useRouter()

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
                accessorKey: 'group',
                header: 'group',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'phone_number',
                header: 'phone_number',
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
        <HeaderWithButton title='Contacts' showButton={false} />
        
        <div className='p-6'>
            <div className='flex space-x-4'>
                <div className="relative flex-grow">
                    <input 
                    type="text" 
                    className="w-full px-10 py-3 border border-gray-300 rounded-[8px] shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" 
                    placeholder='Search' 
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    </span>
                </div>
                <FilterButton />
                <CustomizeButton />
            </div>
        </div>

        <div className='px-6 pb-6 border-t border-gray-200'>
            <div className='flex items-end justify-end pt-[17px] space-x-3'>
                <Button  variant="outline" onClick={() => router.push('/dashboard/phonebook/contacts/createcontact')}>Create Single contact</Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/phonebook/contactgroups/createcontactgroup')}>Create Contact Group</Button>
                <Button onClick={() => router.push('/dashboard/phonebook/contactgroupmaps/createcontactgroupmaps')}>Create Contact Group Map</Button>
            </div>
        </div>

        <div>
            <Table columns={columns} data={data} />
         </div>
    </div>
  )
}

//src/app/dashboard/phonebook/contactgroupmaps/createcontactgroupmaps/page.tsx