"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

export function ThreeDCardDemo() {
  return (
    <>
      <div className="text-4xl  font-normal  pt-10 text-center">
        A Plan That Fits You Best
      </div>
      <div className="flex flex-col lg:space-x-5 justify-center lg:flex-row py-16 ">
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card  hover:shadow-2xl   hover:shadow-black/[0.2]  dark:hover:shadow-white/[0.1] dark:bg-neutral-950 dark:border-white/[0.2] border-neutral-950/[0.1] max-w-80 h-auto rounded-md p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-950 dark:text-white"
            >
              Free
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-5xl font-bold text-neutral-950 dark:text-white p-2 pb-4"
            >
              $0
            </CardItem>
            <CardItem
              as="div"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <ul className="flex flex-col space-y-2">
                <li className=" flex ">
                  <CheckIcon className="mr-2" /> Access to all recorded courses
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> community content
                </li>
                <li className=" flex">
                  <CheckIcon className="mr-2" /> event listings.
                </li>
              </ul>
            </CardItem>

            <div className="flex justify-end items-end mt-10 ">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-md bg-neutral-950 dark:bg-white dark:text-neutral-950 text-white text-xs font-bold "
              >
                Try now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card hover:shadow-2xl  hover:shadow-black/[0.2] dark:hover:shadow-white/[0.1] dark:bg-neutral-950 dark:border-white/[0.2] border-neutral-950/[0.1] max-w-80 h-auto rounded-md p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-950 dark:text-white"
            >
              Pro Plan
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-5xl font-bold text-neutral-950 dark:text-white p-2 pb-4"
            >
              $9.99
            </CardItem>
            <CardItem
              as="div"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <ul className="flex flex-col space-y-2">
                <li className=" flex ">
                  <CheckIcon className="mr-2" /> Access to all recorded courses
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> community content
                </li>
                <li className=" flex">
                  <CheckIcon className="mr-2" /> event listings.
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> live lesson
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> tracking feature
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> priority support
                </li>
              </ul>
            </CardItem>

            <div className="flex justify-end items-end mt-10 ">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-md bg-neutral-950 dark:bg-white dark:text-neutral-950 text-white text-xs font-bold "
              >
                Try now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card  hover:shadow-2xl  hover:shadow-black/[0.2] dark:hover:shadow-white/[0.1] dark:bg-neutral-950 dark:border-white/[0.2] border-neutral-950/[0.1] max-w-80 h-auto rounded-md p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-950 dark:text-white"
            >
              Premium Plan
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-5xl font-bold text-neutral-950 dark:text-white p-2 pb-4"
            >
              $19.99
            </CardItem>
            <CardItem
              as="div"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <ul className="flex flex-col space-y-2">
                <li className=" flex ">
                  <CheckIcon className="mr-2" /> Covers all the Free and Pro
                  plan
                </li>

                <li className=" flex">
                  <CheckIcon className="mr-2" /> Including exclusive content
                </li>
                <li className=" flex">
                  <CheckIcon className="mr-2" /> Certification
                </li>
                <li className=" flex">
                  <CheckIcon className="mr-2" /> Personal mentorship
                </li>
              </ul>
            </CardItem>

            <div className="flex justify-end items-end mt-10 ">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-md bg-neutral-950 dark:bg-white dark:text-neutral-950 text-white text-xs font-bold "
              >
                Try now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </>
  );
}
