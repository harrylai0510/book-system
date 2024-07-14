import "./logout.globals.css";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export const metadata = {
    title: "Book Application",
    description: "Borrow Book",
};

export default async function LogoutLayout({children}) {
    const session = await getServerSession(authOptions)

    if (session != null) {
        return redirect("/")
    } else {
        return (
            <html lang="en">
            <body>
            {children}
            </body>
            </html>
        );
    }
}
