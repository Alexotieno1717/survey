"use client"

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './table';
import { Button } from '../ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

interface Data {
  id: number;
  question: string;
  title: string;
  questionOrder: number;
  insertedAt: string;
}

const data: Data[] = [
  {
    id: 3456,
    question: 'Customer Satisfaction Survey 2024',
    title: 'Active',
    questionOrder: 20,
    insertedAt: '28 Dec 22 – 10 Jan 23',
  },
    {
        id: 3456,
        question: 'Customer Satisfaction Survey 2024',
        title: 'Active',
        questionOrder: 20,
        insertedAt: '28 Dec 22 – 10 Jan 23',
    },
    {
        id: 3456,
        question: 'Customer Satisfaction Survey 2024',
        title: 'Active',
        questionOrder: 20,
        insertedAt: '28 Dec 22 – 10 Jan 23',
    },
    {
        id: 3456,
        question: 'Customer Satisfaction Survey 2024',
        title: 'Active',
        questionOrder: 20,
        insertedAt: '28 Dec 22 – 10 Jan 23',
    },
];



export default function DataTable() {
  const columns = React.useMemo<ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'question',
        header: 'Survey title',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'title',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'questionOrder',
        header: 'Total Response',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'insertedAt',
        header: 'Date',
        cell: (info) => info.getValue(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="flex space-x-2">
            <Button variant="outline" size="icon"> <Eye className='text-green-400 size-5' /></Button>
            <Link href={`/dashboard/survey/questions/edit/1`}>
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
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}
