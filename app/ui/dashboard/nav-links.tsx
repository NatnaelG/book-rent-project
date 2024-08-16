"use client";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: "Home", href: "/dashboard", icon: NotificationsNoneIcon },
    {
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: NotificationsNoneIcon,
    },
    {
        name: "Customers",
        href: "/dashboard/customers",
        icon: NotificationsNoneIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        // className={clsx(
                        //   'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                        //   {
                        //     'bg-sky-100 text-blue-600': pathname === link.href,
                        //   },
                        // )}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                height: 48,
                                flexGrow: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                borderRadius: "md",
                                bgcolor: "grey.50",
                                p: 2,
                                fontSize: "sm",
                                fontWeight: "medium",
                                "&:hover": {
                                    bgcolor: "sky.100",
                                    color: "blue.600",
                                },
                                [`@media (min-width: 768px)`]: {
                                    flexGrow: 0,
                                    justifyContent: "flex-start",
                                    padding: 2,
                                    paddingLeft: 3,
                                    paddingRight: 3,
                                },
                            }}
                        >
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{link.name}</p>
                        </Box>
                    </Link>
                );
            })}
        </>
    );
}
