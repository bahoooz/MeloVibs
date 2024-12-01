"use client"

import React, { useState, useEffect } from 'react'
import { Track } from './MostPopularTracks';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { ArrowCircleUp, Play, SpeakerHigh } from '@phosphor-icons/react';
import { Button } from '../ui/button';
import { useTrackStore } from '@/store/useTrackStore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import CardTrack from '@/components/global/CardTrack';

export default function ListMostPopularTracksOfMonth() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addVote, removeVote, isVoted } = useTrackStore();
    const { toast } = useToast();

    useEffect(() => {
        async function fetchTracks() {
            try {
                const [tracksRes, votesRes] = await Promise.all([
                    fetch("/api/tracks/tracks-of-month"),
                    fetch("/api/user/votes")
                ]);
                
                const tracksData = await tracksRes.json();
                const votesData = await votesRes.json();
                
                setTracks(tracksData.tracks);
                if (votesData.votedTracks) {
                    useTrackStore.setState({ votedTracks: new Set(votesData.votedTracks) });
                }
            } catch (error) {
                console.error("Erreur lors du chargement des pistes:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTracks();
    }, []);

    const handleVote = async (trackId: string) => {
        try {
            if (isVoted(trackId)) {
                await removeVote(trackId);
                const res = await fetch("/api/tracks");
                const data = await res.json();
                setTracks(data.tracks);
                
                toast({
                    title: "Vote retiré",
                    description: "Votre vote a été retiré avec succès",
                });
            } else {
                await addVote(trackId);
                const res = await fetch("/api/tracks");
                const data = await res.json();
                setTracks(data.tracks);
                
                toast({
                    title: "Vote ajouté",
                    description: "Votre vote a été ajouté avec succès",
                });
            }
        } catch (error) {
            console.error("Erreur lors du vote:", error);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors du vote",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return (
            <section className="mt-32">
                <h2 className="text-3xl font-bold mb-12">Les musiques les plus populaires du mois</h2>
                <Card>
                    <CardContent className="flex flex-col items-center justify-center">
                        <CardHeader>
                            <Skeleton className="h-[300px] w-[300px] rounded-[30px]" />
                        </CardHeader>
                        <div className="flex w-full justify-between mt-12">
                            <div>
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="mt-2 h-4 w-16" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        );
    }

    return (
        <section className="mt-32">
            <h2 className="text-3xl font-bold mb-12">Les musiques les plus populaires du mois</h2>
            <Carousel className="w-full">
                <CarouselContent>
                    {tracks.map((track) => (
                        <CarouselItem key={track._id} className="basis-1/2">
                            <CardTrack
                                image={track.album.images[0].url}
                                title={track.name}
                                artist={track.artists[0].name}
                                votes={track.votes}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
