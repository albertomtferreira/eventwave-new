"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { getUserOrdersForEvent } from '@/lib/actions/user.actions'
import { Button } from '../ui/button'



type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

const CardSignOut = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] 
    flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all 
    hover:shadow-lg md:min-h-[438px]'
    >
      <Link
        href={`/sign-in`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'
      />
      <div className='flex min-h-[230px] flex-col p-5'>
        <div className='flex flex-col gap-3 md:gap-4 flex-grow'>
          <Link href={`/sign-in`}>
            {!hidePrice && (
              <div className='flex gap-2'>
                <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>
                  {event.isFree ? 'FREE' : `$${event.price}`}
                </span>
                <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1'>
                  {event.category.name}
                </p>
              </div>
            )}
            <p className='p-medium-16 p-medium-18 text-grey-500'>
              {formatDateTime(event.startDateTime).dateTime}
            </p>
            <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>
              {event.title}
            </p>
            <div className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <p className='p-semibold-12 w-min py-1 text-grey-500 line-clamp-2'>
                {event.description}
              </p>
              {isHovered && (
                <div className="absolute bottom-full left-0 w-full p-2 bg-grey-50 border border-gray-200 rounded shadow-lg z-10">
                  <p className='text-sm text-gray-500'>{event.description}</p>
                </div>
              )}
            </div>
          </Link>
        </div>
        <SignedOut>
          <Button asChild className="rounded-full mt-auto">
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

export default CardSignOut