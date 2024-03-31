'use client'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import { eachDayOfInterval } from 'date-fns' // theme css file

interface Props {
  reservation?: { startDate: Date; endDate: Date }[]
}

export function SelectCalendar({ reservation }: Props) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  let disabledDate: Date[] = []
  reservation?.forEach((item) => {
    const dateRange = eachDayOfInterval({
      start: new Date(item.startDate),
      end: new Date(item.endDate),
    })
    disabledDate = [...disabledDate, ...dateRange]
  })
  return (
    <>
      <input type={'hidden'} name={'startDate'} value={state[0].startDate.toISOString()} />
      <input type={'hidden'} name={'endDate'} value={state[0].endDate.toISOString()} />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={['#FF5A5F']}
        ranges={state}
        onChange={(item) => setState([item.selection] as never)}
        minDate={new Date()}
        direction={'vertical'}
        disabledDates={disabledDate}
      />
    </>
  )
}
