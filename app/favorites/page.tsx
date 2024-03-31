import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { NoItems } from '@/app/components/NoItems'
import { ListingCard } from '@/app/components/ListingCard'
import { unstable_noStore } from 'next/cache'

async function getData(userId: string) {
  unstable_noStore()
  const data = await prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  })

  return data
}

export default async function FavoritesRoute() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect('/')

  const data = await getData(user.id)

  return (
    <section className={'container mx-auto py-5 lg:px-10 mt-10'}>
      <h2 className={'text-3xl font-semibold tracking-tight'}>Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          title={'Hey, you dont have any favorites'}
          description={'Please add favorites to see them right here...'}
        />
      ) : (
        <div className={'grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8'}>
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id!}
              id={item.Home?.id!}
              photo={item.Home?.photo!}
              description={item.Home?.description!}
              country={item.Home?.country!}
              price={item.Home?.price!}
              isInFavoriteList={(item.Home?.Favorite.length as number) > 0}
              favoriteId={item.Home?.Favorite[0].id as string}
              pathName={'/favorites'}
              userId={user.id}
              homeId={item.Home?.id!}
            />
          ))}
        </div>
      )}
    </section>
  )
}
