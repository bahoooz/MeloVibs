import { MusicNotesPlus, MicrophoneStage, MusicNote, Ranking, X, Gift, HouseSimple, Question, PaperPlaneRight } from '@phosphor-icons/react'
import React from 'react'
import { useSession } from 'next-auth/react'
import UserAvatar from './UserAvatar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '../ui/navigation-menu';
import Link from 'next/link';

export default function BurgerMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const { data: session } = useSession();

    return (
        <div className={`absolute -top-12 ${isOpen ? 'left-0' : 'left-full'} w-full h-dvh bg-greenColorSecondary transition-all duration-300 pt-12 lg:hidden`}>
            <div className='flex items-center justify-between px-8 h-16 mb-32'>
                <UserAvatar />
                <X weight="light" size={32} onClick={() => setIsOpen(!isOpen)} />
            </div>
            <NavigationMenu className='flex flex-col gap-6'>
                <Link href={"/"} className="flex items-center gap-3 group hover:underline">
                    <HouseSimple size={24} weight="light" className="group-hover:hidden" />
                    <HouseSimple
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                    />
                    Accueil
                </Link>
                <NavigationMenuItem className='list-none'>
                    <NavigationMenuTrigger className="flex items-center gap-2 group hover:underline">
                        <Ranking
                            size={24}
                            weight="light"
                            className="mr-2 group-hover:hidden"
                        />{" "}
                        <Ranking
                            size={24}
                            weight="fill"
                            className="mr-2 hidden group-hover:block"
                        />{" "}
                        Classements
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-[#252639] w-full">
                        <div className="py-6 flex justify-center items-center">
                            <ul className="flex flex-col gap-6 list-none">
                                <li>
                                    <Link href={"/"} className="flex gap-4 group hover:underline">
                                        <MicrophoneStage
                                            size={24}
                                            weight="light"
                                            className="group-hover:hidden"
                                        />
                                        <MicrophoneStage
                                            size={24}
                                            weight="fill"
                                            className="hidden group-hover:block"
                                        />{" "}
                                        Classement par artistes
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="flex gap-4 group hover:underline">
                                        <MusicNote
                                            size={24}
                                            weight="light"
                                            className="group-hover:hidden"
                                        />
                                        <MusicNote
                                            size={24}
                                            weight="fill"
                                            className="hidden group-hover:block"
                                        />{" "}
                                        Classement du mois par musiques
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="flex gap-4 group hover:underline">
                                        <MusicNotesPlus
                                            size={24}
                                            weight="light"
                                            className="group-hover:hidden"
                                        />
                                        <MusicNotesPlus
                                            size={24}
                                            weight="fill"
                                            className="hidden group-hover:block"
                                        />{" "}
                                        Classement par musiques les plus votées
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <Link href={"/"} className="flex items-center gap-3 group hover:underline">
                    <Gift size={24} weight="light" className="group-hover:hidden" />
                    <Gift
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                    />
                    Boutique
                </Link>
                <Link href={"/"} className="flex items-center gap-3 group hover:underline">
                    <Question size={24} weight="light" className="group-hover:hidden" />
                    <Question
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                    />
                    Qui sommes-nous ?
                </Link>
                <Link href={"/"} className="flex items-center gap-3 group hover:underline">
                    <PaperPlaneRight size={24} weight="light" className="group-hover:hidden" />
                    <PaperPlaneRight
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                    />
                    Nous contacter
                </Link>
            </NavigationMenu>
        </div>
    )
}
