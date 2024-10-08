import React from 'react'
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
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image src="/assets/images/Illustration.png" alt="" width={300} height={300} className='mx-auto mb-[28px]' />
        <h1 className='text-2xl font-semibold mb-[11px]'>No {title} found</h1>
        <p className='text-[19px] mb-[45px]'>Start by creating a {title}</p>
        <Link href={pathToCreate}>
            <button className='px-8 py-3 text-white rounded-lg bg-survey-green'>Create {title}</button>
        </Link>
    </div>
  )
}
