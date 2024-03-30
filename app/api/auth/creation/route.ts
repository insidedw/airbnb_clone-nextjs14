import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import {NextResponse} from "next/server";
import {unstable_noStore} from "next/cache";

export async function GET() {
    unstable_noStore()
    const {getUser} = getKindeServerSession()

    const user = await getUser()
    if (!user || !user.id) {
        throw new Error('Something went wrong, no user found')
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? '',
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                id: user.id,
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        })
    }

    return NextResponse.redirect(process.env.BASE_DOMAIN!)
}
