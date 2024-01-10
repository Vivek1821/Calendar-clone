"use client";
import React, { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  //   BackArrow,
  //   TwitterIcon,
  //   GithubIcon,
  //   DiscordIcon,
  //   HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [today, setToday] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const date = new Date();
  //   let today = date.toLocaleString("en-IN", {
  //     weekday: "short",
  //     day: "2-digit",
  //   });
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleToday = () => {};

  const handleDateBack = () => {
    const yesterday = new Date(date);
    yesterday.setDate(today.getDate() - 1);
    setToday(yesterday);
    console.log(yesterday);
  };

  const handleDateForward = () => {
    const nextDay = new Date(date);
    nextDay.setDate(today.getDate() + 1);
    setToday(nextDay);
    console.log(nextDay);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Calendar</p>
          </NextLink>
        </NavbarBrand>

        <div onClick={handleDateBack}>
          <MdArrowBackIos className="" />
        </div>
        <Button
          color="secondary"
          variant="light"
          className="text-lg align-middle"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            today.toLocaleString("en-IN", {
              weekday: "short",
              day: "2-digit",
            })
          ) : today.toDateString() === new Date().toDateString() ? (
            <div>Today</div>
          ) : (
            today.toLocaleString("en-IN", {
              weekday: "short",
              day: "2-digit",
            })
          )}
        </Button>
        <div onClick={handleDateForward}>
          <MdArrowForwardIos />
        </div>

        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link> */}
        </NavbarItem>
        <NavbarItem className=" lg:flex">{searchInput}</NavbarItem>
        <ThemeSwitch />
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            // href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link> */}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
