import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button';
import { ArrowCircleUp } from '@phosphor-icons/react';

interface CardTrackProps {
    image: string;
    title: string;
    artist: string;
    votes: number;
}

export default function CardTrack({image, title, artist, votes}: CardTrackProps) {
  return (
    <Card>
        <CardHeader>
            <Image src={image} alt={title} width={100} height={100} />
        </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <span>{artist}</span>
                <p>{votes} votes</p>
                <p>test</p>
            </CardContent>
            <CardFooter>
                <Button><ArrowCircleUp size={16} weight="light" /></Button>
            </CardFooter>
    </Card>
  )
}
