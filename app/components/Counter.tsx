'use client'

import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {useState} from "react";

interface Props {
    name:string
}
export function Counter({name}:Props) {
    const [amount, setAmount] = useState(0)

    function increase() {
        setAmount(amount + 1)
    }

    function decrease() {
        if (amount === 0) return
        setAmount(amount - 1)
    }

    return (
        <div className={'flex items-center gap-x-4'}>
            <input type={'hidden'} name={name} value={amount}/>
            <Button disabled={amount === 0} variant={'outline'} size={'icon'} type={'button'} onClick={decrease}>
                <Minus className={'h4- w-4 text-primary'}/>
            </Button>
            <p className={'font-medium text-lg'}>{amount}</p>
            <Button variant={'outline'} size={'icon'} type={'button'} onClick={increase}>
                <Plus className={'h4- w-4 text-primary'}/>
            </Button>
        </div>
    )
}
