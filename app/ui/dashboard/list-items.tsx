import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from "next/link";
import Links from "@/app/lib/links";

import Image from "next/image";
import OpenBook from "../../../public/openBook.svg";

import { usePathname } from "next/navigation";
import { Button, Stack } from "@mui/material";
import { User } from "@/app/lib/actions";
import defineAbilityFor from "@/app/lib/ability";

export default function ListItems({ location }: { location: String }) {
  const pathname = usePathname();

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  if (user !== null) {
  }

  const ability = defineAbilityFor(user);

  // console.log("pathName", pathname);
  return (
      <>
      {Links.filter((tempLink) => tempLink.location === location).map(
          (link, index) => {
              const LinkIcon = link.icon;
              console.log("ability.can", ability.can("read", link.path) )
          return location === "logout" ? (
            <Button
              type="submit"
              key={`${link.name}-${index}-logout`}
              sx={{
                width: "-webkit-fill-available",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  // autoFocus={pathname === link.path}
                  alignItems="center"
                  sx={{
                    background:
                      pathname === link.path
                        ? "#00ABFF"
                        : link.name === "Log Out"
                        ? "#ffffff20"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "#06344b",
                      // cursor: "pointer",
                      borderRadius: "8px",
                    },
                    borderRadius:
                      pathname === link.path || link.name === "Log Out"
                        ? "8px"
                        : "0px",
                    mr:
                      link.name === "LogIn as Book Owner"
                        ? "0px"
                        : link.name === "Log Out"
                        ? "40px"
                        : "20px",
                    justifyContent:
                      link.name === "Log Out" ? "center" : "start",
                  }}
                >
                  <Stack direction="row" alignItems={"center"}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <LinkIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>

                    <ListItemText
                      primary={link.name}
                      sx={{
                        textDecoration: "none",
                        color: location === "home" ? "#00ABFF" : "#fff",
                      }}
                    />
                  </Stack>
                </ListItemButton>
              </ListItem>
            </Button>
          ) : (
            ability.can("read", link.path) && (
              <ListItem key={`${link.name}-${index}-others`} disablePadding>
                <Link
                  href={link.path}
                  className={`link ${
                    location === "home" ? "home-link" : "other-link"
                  }`}
                >
                  <ListItemButton
                    // autoFocus={pathname === link.path}
                    alignItems="center"
                    sx={{
                      background:
                        pathname === link.path
                          ? "#00ABFF"
                          : link.name === "Log Out"
                          ? "#ffffff20"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "#06344b",
                        // cursor: "pointer",
                        borderRadius: "8px",
                      },
                      borderRadius:
                        pathname === link.path || link.name === "Log Out"
                          ? "8px"
                          : "0px",
                      mr:
                        link.name === "LogIn as Book Owner"
                          ? "0px"
                          : link.name === "Log Out"
                          ? "40px"
                          : "20px",
                      justifyContent:
                        link.name === "Log Out" ? "center" : "start",
                    }}
                  >
                    <Stack direction="row" alignItems={"center"}>
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        <LinkIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>

                      {location === "home" && (
                        <Image
                          src={OpenBook}
                          alt="Open Book"
                          // className={styles.vercelLogo}
                          width={60}
                          height={21}
                          priority
                        />
                      )}
                      <ListItemText
                        primary={link.name === "LogIn as Book Owner" && user.role === "Admin" ? "LogIn as Admin" : link.name}
                        sx={{
                          textDecoration: "none",
                          color: location === "home" ? "#00ABFF" : "#fff",
                        }}
                      />
                    </Stack>
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          );
        }
      )}
    </>
  );
}
