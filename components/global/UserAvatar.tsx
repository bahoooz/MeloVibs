import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { useSession } from 'next-auth/react'

export default function UserAvatar() {
    const { data: session } = useSession();
    console.log(session);

  return (
    <div>
        <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>
                {session?.user?.name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
        </Avatar>
    </div>
  )
}
