'use client'

import {useFormStatus} from 'react-dom'
import {Button} from "@/components/ui/button";
import React from "react";
import {Heart, Loader2} from "lucide-react";

export function CreationSubmit() {
    const {pending} = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled size={'lg'}><Loader2 className={'mr-2 h-4 w-4 animate-spin'}/>Please Wait</Button>) : (
                <Button type={'submit'} size={'lg'}>Save</Button>)}
        </>
    )
}

export function AddToFavoriteButton() {
    const {pending} = useFormStatus()
    return (
        <>
            {pending ? (
                <div><Button variant={'outline'} size={'icon'} disabled={true} className={'bg-primary-foreground'}>
                    <Loader2 className={'h-4 w-4 animate-spin text-primary'}/></Button></div>) : (
                <Button variant={'outline'} size={'icon'} className={'bg-primary-foreground'} type={'submit'}>
                    <Heart className={'w-4 h-4'}/>
                </Button>)}
        </>
    )
}

export function DeleteToFavoriteButton() {
    const {pending} = useFormStatus()
    return (
        <>
            {pending ? (
                <div>
                    <Button variant={'outline'} size={'icon'} disabled={true} className={'bg-primary-foreground'}>
                        <Loader2 className={'h-4 w-4 animate-spin text-primary'}/>
                    </Button>
                </div>) : (
                <Button variant={'outline'} size={'icon'} className={'bg-primary-foreground'} type={'submit'}>
                    <Heart className={'w-4 h-4 text-primary'} fill={'#E21C49'}/>
                </Button>)}
        </>
    )
}

export function ReservationSubmitButton(){
    const {pending} = useFormStatus()

    if (pending) {
        return <Button className={'w-full'} disabled={true}><Loader2 className={'w-4 h-4 animate-spin mr-2'}/>Please wait...</Button>
    }

    return <Button className={'w-full'} type={'submit'}>Make a Reservation!</Button>
}
