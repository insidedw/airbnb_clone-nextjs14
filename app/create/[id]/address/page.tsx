'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCountries } from '@/app/lib/getCountries'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { CreationButtonBar } from '@/app/components/CreationButtonBar'
import { useState } from 'react'
import { createLocation } from '@/app/actions'

export default function AddressRoute({ params }: { params: { id: string } }) {
  const LazyMap = dynamic(() => import('@/app/components/Map'), {
    ssr: false,
    loading: () => <Skeleton className={'h=[50vh] w-full'} />,
  })

  const { getAllCountries } = useCountries()
  const [location, setLocation] = useState('')

  return (
    <>
      <div className={'w-3/5 mx-auto'}>
        <h2 className={'text-3xl font-semibold tracking-tight transition-colors mb-10'}>Where is your Home located?</h2>
      </div>
      <form action={createLocation}>
        <input type={'hidden'} name={'homeId'} value={params.id} />
        <input type={'hidden'} name={'countryValue'} value={location} />
        <div className={'w-3/5 mx-auto mb-36'}>
          <div className={'mb-5'}>
            <Select required={true} onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className={'w-full'}>
                <SelectValue placeholder={'Select a Country'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} / {item.region}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap location={location} />
        </div>

        <CreationButtonBar />
      </form>
    </>
  )
}
