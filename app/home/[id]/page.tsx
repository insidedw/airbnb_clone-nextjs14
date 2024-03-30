import prisma from "@/app/lib/db";
import Image from "next/image";
import {useCountries} from "@/app/lib/getCountries";
import {Separator} from "@/components/ui/separator";
import {CategoryShowcase} from "@/app/components/CategoryShowcase";
import {HomeMap} from "@/app/components/HomeMap";
import {SelectCalendar} from "@/app/components/SelectCalendar";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {createReservation} from "@/app/actions";
import {ReservationSubmitButton} from "@/app/components/SubmitButtons";

async function getData(homeId: string) {
    const data = await prisma.home.findUnique({
        where: {
            id: homeId
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country:true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true
                }
            },
            Reservation: {
                where: {
                    homeId
                }
            }
        }
    })
    return data
}

export default async function HomeIdRoute({params}: { params: { id: string } }) {
    const data = await getData(params.id)
    const {getCountryByValue} =useCountries()
    const country = getCountryByValue(data?.country!)
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    return <div className={'w-[75%] mx-auto mt-10'}>
        <h1 className={'font-medium text-2xl mb-5'}>{data?.title}</h1>
        <div className={'relative h-[550px]'}>
            <Image src={`https://firyawusvryqiujwcoma.supabase.co/storage/v1/object/public/images/${data?.photo}`} alt={'Image of Home'} fill={true}
            className={'rounded-lg h-full object-cover w-full'}/>
        </div>

        <div className={'flex justify-between gap-x-24 mt-8 mb-12'}>
            <div className={'w-2/3'}>
                <h3 className={'text-xl font-medium'}>{country?.flag} {country?.label} / {country?.region}</h3>
                <div className={'flex gap-x-2 text-muted-foreground'}>
                    <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
                </div>
                <div className={'flex items-center mt-6'}>
                    <img className={'w-11 h-11 rounded-full'} src={data?.User?.profileImage ?? 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAowMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EADUQAAICAQIEAgcGBwEAAAAAAAABAgMEBREGITFBUWESE3GBkaGxQlJywdHhFCMlMjNigiL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmZev6XiScbMqEprrGtOe3wCumDi1cUaTZL0XfOHnOtpfE61F9ORWrMe2FkH0lCW6AyAAIAAAAAAAAAAAAAAAAAAAeLroUUzuumoVwW8pPsj2Q7jbUXO2Gn1SfoQ2nZt3fZP3cwOfrnEORqU5VUt1YvRQT2cvN/ocUAuIGxg52TgXeuxLHCffwftXc1wCLI0LWa9Wx29lC+H+Svw815HTKv0zNs07Nryat24f3RXdd0WbVZC6qFtb3hOKkn5PmRXsAAAAAAAAAAAAAAAAAAF1Ks1G+WTn5F8m252Sfu35fItPbfdeKKmtW1s14SYHkAGkAAKQLB4Qvd2hVRk93VKUF7N918mV8TvgmLWjzf3rn9EZVIAAAAAAAAAAAAAAAAAAARWWuY7xdXy6duXrHKPsfNfUs0jHGWlSvqjnY8d7Kl6NiXVw8fd9AIWBsDSAAIoWPwzjvG0PFjJbSnF2P/AKe/0aIXoGlz1PPhBx/kQfpWy7beHtZY6SSSSSS6eRB9AAAAAAAAAAAAAAAAAAAAARzVuFMfKsd2DNUWSe7ra3g3+RH7uGNWqk0sdWLxrmn8nzLCbSi5S5JeL5GpZqmn1P0bc7HT8PWICCQ4d1eT2/gpr8Uor8zp4HB983GWffGqHeNf/p/HoiTQ1jS5PZZ+On+M26bqr1vTbCxeNck/oBjw8OjBojRi1qFa8O/m/EzgAAAAAAAAAAAAAAAAAADm65rFOk0KU16d09/V177b+b8gNrNzMfBpduVaq4efV+xET1Hi++1uGn1qmHayxbyfu6I4Gdm5Gfe78qxzm+i7R8kuxrgZsrLycuXpZN1lr/3luYenToAXED7FuElKDcZL7S5M+AYOzgcS6jiNKdvr619m3m/j1RK9I4gxNTagm6b+9U319j7ldhPZprk1z3XZhYtsET4c4lcpQw9Rnu21Gu5/SX6ksIAAAAAAAAAAAAADV1LOq07DsybuaguUfvPsitc7MuzsqeRfLec348kuyXkdrjPUHkZ6xK5fysfrt9qfd+7l8yPAAAVKAAoAAAAABNuEdZeXV/BZMt7q1vCT6zj4e1EJMuLkW4uTXkUy2srkmmRVrAw4eTDLxasir+yyKkl4GYgAAAAAAAAGHLvjjYt2RPpVBzfnstzMcfiy11aFkbcvWOMPc3+zAr6yc7Zysse85tyb82eQCxKAAoAAAAAAAAAAiprwPlOzCuxZvd0z9KP4ZfuvmSYgvBFrhq1lfayl7+5p/qTogAAAAAAAAHA41f8ARkvG6H5n0AQIAFjIACqAAAAAAAAAADtcIPbXavOE/oWC+oBFgACAAAP/2Q=='} alt={'User Profile'}/>
                    <div className={'flex flex-col ml-4'}>
                        <h3 className={'font-medium'}>Hosted By {data?.User?.firstName}</h3>
                        <p className={'text-sm text-muted-foreground'}>Host since 2015</p>
                    </div>
                </div>
                <Separator className={'my-7'} />
                <CategoryShowcase categoryName={data?.categoryName!}/>
                <Separator className={'my-7'} />
                <p className={'text-muted-foreground'}>{data?.description}</p>
                <Separator className={'my-7'} />
                <HomeMap locationValue={country?.value!}/>
            </div>
            <form action={createReservation}>
                <input type={'hidden'} name={'homeId'} value={params.id}/>
                <input type={'hidden'} name={'userId'} value={user?.id}/>
                <SelectCalendar reservation={data?.Reservation}/>

                {user?.id ? (<ReservationSubmitButton/>): (<Button className={'w-full'} asChild={true}><Link href={'/api/auth/login'}>Make a Reservation</Link></Button>)}
            </form>
        </div>
    </div>
}
