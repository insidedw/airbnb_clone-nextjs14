import {MapFilterItems} from "@/app/components/MapFilterItems";
import prisma from "@/app/lib/db";
import {ListingCard} from "@/app/components/ListingCard";
import {Suspense} from "react";
import {SkeletonCard} from "@/app/components/SkeletonCard";
import {NoItems} from "@/app/components/NoItems";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {unstable_noStore} from "next/cache";


interface Favorite {
    id: string
    createdAt: number
    userId?: string
    homeId?: string
}

export interface ListingCardProps {
    id: string
    photo: string
    description: string
    country: string
    price: number
    favorite: Favorite[]

}

export interface SearchParams {
    filter?: string
    country?: string
    guests?: string
    room?: string
    bathroom?: string
}

async function getData({searchParams, userId}: { searchParams?: SearchParams, userId?: string }) {
    unstable_noStore()
    const data = await prisma.home.findMany({
        where: {
            addedCategory: true,
            addedLocation: true,
            addedDescription: true,
            categoryName: searchParams?.filter ?? undefined,
            country: searchParams?.country ?? undefined,
            guests: searchParams?.guests ?? undefined,
            bedrooms: searchParams?.room ?? undefined,
            bathrooms: searchParams?.bathroom ?? undefined
        },
        select: {
            photo: true,
            id: true,
            price: true,
            description: true,
            country: true,
            Favorite: {
                where: {
                    userId
                }
            }
        }
    })
    return data
}

export default function Home({searchParams}: { searchParams?: SearchParams }) {
    return (
        <div className={'container mx-auto px-5 lg:mx-5'}>
            <MapFilterItems/>
            <Suspense key={searchParams?.filter} fallback={<SkeletonLoading/>}>
                <ShowItems searchParams={searchParams}/>
            </Suspense>
        </div>
    )
}

async function ShowItems({searchParams}: { searchParams?: SearchParams }) {

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    const data = await getData({searchParams, userId: user?.id})

    if (data.length === 0) {
        return (
            <NoItems title={'Sorry no listing for this category found...'}
                     description={'Please check a other category or create your own listing!'}/>
        )
    }

    return (<div className={'grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'}>
        {data.map(item => {
            return <ListingCard key={item.id} id={item.id} photo={item.photo!} description={item.description!}
                                country={item.country!} price={item.price!} userId={user?.id}
                                favoriteId={item.Favorite[0]?.id} isInFavoriteList={item.Favorite.length > 0}
                                homeId={item.id} pathName={'/'}/>
        })}
    </div>)
}

function SkeletonLoading() {
    return (
        <div className={'grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'}>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </div>
    )
}
