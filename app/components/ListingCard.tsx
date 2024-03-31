import Image from 'next/image'
import Link from 'next/link'
import { useCountries } from '@/app/lib/getCountries'
import { AddToFavoriteButton, DeleteToFavoriteButton } from '@/app/components/SubmitButtons'
import { addToFavorite, deleteFavorite } from '@/app/actions'

interface Props {
  id: string
  photo: string
  description: string
  country: string
  price: number
  userId?: string
  homeId?: string
  isInFavoriteList: boolean
  favoriteId: string
  pathName: string
}
export function ListingCard({
  photo,
  description,
  country: countryProp,
  price,
  userId,
  favoriteId,
  isInFavoriteList,
  homeId,
  pathName,
}: Props) {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(countryProp)

  return (
    <div className={'flex flex-col'}>
      <div className={'relative h-72'}>
        <Image
          src={`https://firyawusvryqiujwcoma.supabase.co/storage/v1/object/public/images/${photo}`}
          alt={'image of house'}
          fill={true}
          className={'rounded-lg h-full object-cover'}
        />

        {userId && (
          <div className={'z-10 absolute top-2 right-2'}>
            {isInFavoriteList ? (
              <form action={deleteFavorite}>
                <input type={'hidden'} name={'favoriteId'} value={favoriteId} />
                <input type={'hidden'} name={'userId'} value={userId} />
                <input type={'hidden'} name={'pathName'} value={pathName} />
                <DeleteToFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type={'hidden'} name={'homeId'} value={homeId} />
                <input type={'hidden'} name={'userId'} value={userId} />
                <input type={'hidden'} name={'pathName'} value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className={'mt-2'}>
        <h3 className={'font-medium text-base'}>
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className={'text-muted-foreground text-sm line-clamp-2'}>{description}</p>
        <p className={'pt-2 text-muted-foreground'}>
          <span className={'font-medium text-black'}>${price}</span> Night
        </p>
      </Link>
    </div>
  )
}
