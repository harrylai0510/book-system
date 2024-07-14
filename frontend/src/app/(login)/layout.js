import Box from "@mui/material/Box";
import LeftDrawer from "@/components/Drawer";
import DrawerHeader from "@/components/DrawerHeader";
import SProvider from "@/components/SProvider";
import "../globals.css";

import {authOptions} from '../api/auth/[...nextauth]/route'
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export const metadata = {
    title: "Book Application",
    description: "Borrow Book",
};

export default async function RootLayout({children}) {
    const session = await getServerSession(authOptions)
    if (session == null) {
        return redirect("/sign-in")
    } else {
        return (
            <html lang="en">
            <body>
            <SProvider session={session}>
                <Box sx={{display: 'flex'}}>
                    {/*Left Drawer and Top Bar*/}
                    <LeftDrawer/>

                    {/*Right Content*/}
                    <Box component="main" sx={{flexGrow: 1, p: 3}}>
                        <DrawerHeader/>
                        {children}
                    </Box>
                </Box>
            </SProvider>
            </body>
            </html>
        );
    }
}
