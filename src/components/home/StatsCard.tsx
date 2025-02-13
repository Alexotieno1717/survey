import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface StatsCardProps {
    amount: string,
    description: string,
    chart: React.ReactNode,
    urlLink?: string,
}

const StatsCard = ({amount, description, urlLink, chart}: StatsCardProps) => {
    return (
        <div className="bg-white rounded-[10px] shadow-lg p-6">
            <div className="flex justify-between">
                <h1 className="text-base font-medium">Today</h1>
                <button>
                <EllipsisVertical color="grey" size={24} />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-[27px]">
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold">{amount}</h1>
                    <p className="text-base text-[#475467] font-medium">{description}</p>
                    <Link className="pt-4 text-sm text-blue-400" href="#">{urlLink}</Link>
                </div>
                <div className="mt-[46px]">
                    {chart}
                </div>
            </div>
        </div>
    )
}

export default StatsCard
