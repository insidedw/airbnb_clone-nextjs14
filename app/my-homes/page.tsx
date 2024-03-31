import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { NoItems } from '@/app/components/NoItems'
import { ListingCard } from '@/app/components/ListingCard'
import { unstable_noStore } from 'next/cache'

async function getData(userId: string) {
  unstable_noStore()
  const data = await prisma.home.findMany({
    where: {
      userId,
      addedDescription: true,
      addedLocation: true,
      addedCategory: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) {
    return redirect('/')
  }

  const data = await getData(user.id)
  return (
    <section className={'container mx-auto px-5 lg:px-10 mt-10'}>
      <h2 className={'text-3xl font-semibold tracking-tight'}>Your Homes</h2>

      {data.length === 0 ? (
        <NoItems
          title={'You dont have any Homes listed'}
          description={'Please list a home on airbnb so that you can see it right here'}
        />
      ) : (
        <div className={'grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8'}>
          {data.map((item) => (
            <ListingCard
              key={item.id}
              id={item.id}
              photo={item.photo!}
              description={item.description!}
              country={item.country!}
              price={item.price!}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0}
              homeId={item.id}
              pathName={'/my-homes'}
            />
          ))}
        </div>
      )}
    </section>
  )
}
