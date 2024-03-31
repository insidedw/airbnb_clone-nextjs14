import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { createAirbnbHome } from '@/app/actions'

export async function UserNav() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const createHomeWithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={'rounded-full border px-2 py-2 lg:px-4 lg:py2 flex items-center gap-x-3'}>
          <MenuIcon className={'w-6 h-6 lg:w-5 lg:h-5'} />
          <img
            className={'rounded-full h-8 w-8 hidden lg:block'}
            src={
              user?.picture ??
              'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAowMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EADUQAAICAQIEAgcGBwEAAAAAAAABAgMEBREGITFBUWESE3GBkaGxQlJywdHhFCMlMjNigiL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmZev6XiScbMqEprrGtOe3wCumDi1cUaTZL0XfOHnOtpfE61F9ORWrMe2FkH0lCW6AyAAIAAAAAAAAAAAAAAAAAAAeLroUUzuumoVwW8pPsj2Q7jbUXO2Gn1SfoQ2nZt3fZP3cwOfrnEORqU5VUt1YvRQT2cvN/ocUAuIGxg52TgXeuxLHCffwftXc1wCLI0LWa9Wx29lC+H+Svw815HTKv0zNs07Nryat24f3RXdd0WbVZC6qFtb3hOKkn5PmRXsAAAAAAAAAAAAAAAAAAF1Ks1G+WTn5F8m252Sfu35fItPbfdeKKmtW1s14SYHkAGkAAKQLB4Qvd2hVRk93VKUF7N918mV8TvgmLWjzf3rn9EZVIAAAAAAAAAAAAAAAAAAARWWuY7xdXy6duXrHKPsfNfUs0jHGWlSvqjnY8d7Kl6NiXVw8fd9AIWBsDSAAIoWPwzjvG0PFjJbSnF2P/AKe/0aIXoGlz1PPhBx/kQfpWy7beHtZY6SSSSSS6eRB9AAAAAAAAAAAAAAAAAAAAARzVuFMfKsd2DNUWSe7ra3g3+RH7uGNWqk0sdWLxrmn8nzLCbSi5S5JeL5GpZqmn1P0bc7HT8PWICCQ4d1eT2/gpr8Uor8zp4HB983GWffGqHeNf/p/HoiTQ1jS5PZZ+On+M26bqr1vTbCxeNck/oBjw8OjBojRi1qFa8O/m/EzgAAAAAAAAAAAAAAAAAADm65rFOk0KU16d09/V177b+b8gNrNzMfBpduVaq4efV+xET1Hi++1uGn1qmHayxbyfu6I4Gdm5Gfe78qxzm+i7R8kuxrgZsrLycuXpZN1lr/3luYenToAXED7FuElKDcZL7S5M+AYOzgcS6jiNKdvr619m3m/j1RK9I4gxNTagm6b+9U319j7ldhPZprk1z3XZhYtsET4c4lcpQw9Rnu21Gu5/SX6ksIAAAAAAAAAAAAADV1LOq07DsybuaguUfvPsitc7MuzsqeRfLec348kuyXkdrjPUHkZ6xK5fysfrt9qfd+7l8yPAAAVKAAoAAAAABNuEdZeXV/BZMt7q1vCT6zj4e1EJMuLkW4uTXkUy2srkmmRVrAw4eTDLxasir+yyKkl4GYgAAAAAAAAGHLvjjYt2RPpVBzfnstzMcfiy11aFkbcvWOMPc3+zAr6yc7Zysse85tyb82eQCxKAAoAAAAAAAAAAiprwPlOzCuxZvd0z9KP4ZfuvmSYgvBFrhq1lfayl7+5p/qTogAAAAAAAAHA41f8ARkvG6H5n0AQIAFjIACqAAAAAAAAAADtcIPbXavOE/oWC+oBFgACAAAP/2Q=='
            }
            alt={'image of the user'}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className={'w-[200px]'}>
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={createHomeWithId} className={'w-full'}>
                <button type={'submit'} className={'w-full text-start'}>
                  Airbnb your Home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/my-homes'} className={'w-full'}>
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/favorites'} className={'w-full'}>
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/reservations'} className={'w-full'}>
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutLink className={'w-full'}>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className={'w-full'}>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className={'w-full'}>Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
