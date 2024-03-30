'use server'

import prisma from "@/app/lib/db";
import {redirect} from "next/navigation";
import {supabase} from "@/app/lib/superbase";
import {revalidatePath} from "next/cache";

export async function createAirbnbHome({userId}: { userId: string }) {

    const data = await prisma.home.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (!data) {
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        })
        return redirect(`/create/${data.id}/structure`)
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`)
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`)
    } else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/address`)
    } else if (data.addedCategory && data.addedDescription && data.addedLocation) {
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        })
        return redirect(`/create/${data.id}/structure`)
    }
}

export async function createCategoryPage(formData: FormData) {

    const categoryName = formData.get('categoryName') as string
    const homeId = formData.get('homeId') as string
    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            categoryName,
            addedCategory: true,
        }
    })

    return redirect(`/create/${homeId}/description`)
}

export async function CreateDescription(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price')
    const imageFile = formData.get('image') as File
    const guest = formData.get('guest') as string
    const room = formData.get('room') as string
    const bathroom = formData.get('bathroom') as string

    const homeId = formData.get('homeId') as string

    const {data:imageData, error} = await supabase.storage.from('images').upload(`${imageFile.name}-${new Date().getTime()}`, imageFile, {
        cacheControl: '2592000',
        contentType: 'image/png'
    })

    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            title,
            description,
            price: Number(price),
            bedrooms: room,
            bathrooms: bathroom,
            guests: guest,
            photo: imageData?.path,
            addedDescription: true
        }
    })

    return redirect(`/create/${homeId}/address`)
}

export async function createLocation(formData: FormData){
    const homeId = formData.get('homeId') as string
    const countryValue = formData.get('countryValue') as string

    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            addedLocation:true,
            country:countryValue
        }
    })

    return redirect('/')
}

export async function addToFavorite(formData: FormData) {
    const homeId = formData.get('homeId') as string
    const userId = formData.get('userId') as string

    const pathName = formData.get('pathName') as string
    const data = await prisma.favorite.create({
        data: {
            homeId,
            userId
        }
    })
    revalidatePath(pathName)
}

export async function deleteFavorite(formData: FormData) {
    const userId = formData.get('userId') as string
    const pathName = formData.get('pathName') as string
    const favoriteId = formData.get('favoriteId') as string
    const data = await prisma.favorite.delete({
        where: {
            id: favoriteId,
            userId
        }
    })
    revalidatePath(pathName)
}

export async function createReservation(formData: FormData) {
    const userId = formData.get('userId') as string
    const homeId = formData.get('homeId') as string
    const startDate = formData.get('startDate') as string
    const endDate = formData.get('endDate') as string

    const data = await prisma.reservation.create({
        data: {
            userId,
            homeId,
            startDate,
            endDate
        }
    })
    return redirect('/')
}
