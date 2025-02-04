"use client";

import React from 'react'
import Header from './Header'
import ListBadgesItems from './ListBadgesItems'
import ListGiftCardsItems from './ListGiftCardsItems'
import ListOtherItems from './ListOtherItems'
import StatsAboutYou from '../HomePage/StatsAboutYou'

export default function BoutiqueContent() {
  return (
    <div className="overflow-x-hidden px-8 relative">
      <Header />
      <ListBadgesItems />
      <ListGiftCardsItems />
      <ListOtherItems />
      <StatsAboutYou />
    </div>
  )
}
