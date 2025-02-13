import React from 'react'
import { Button } from '../ui/button';
import type { UrlObject } from 'url';
import Image from 'next/image';
import Link from 'next/link';

type Url = string | UrlObject;
interface NotFoundProps{
    title: string;
    pathToCreate: Url
}
export default function NotFound({title, pathToCreate}: NotFoundProps) {
  return (
    <div className="flex flex-col text-center justify-center">
        <Image src="/assets/images/Illustration.png" alt="" width={300} height={300} className='mx-auto mb-[28px]' />
        <h1 className='text-2xl font-semibold mb-[11px]'>No {title} found</h1>
        <p className='text-sm text-gray-500 mb-[45px]'>
            Start by creating a {title} now and gather valuable insights from your audience.
        </p>
        <Link href={pathToCreate}>
            <Button>Create {title}</Button>
        </Link>
    </div>
  )
}
