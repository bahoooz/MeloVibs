import { create } from 'zustand'
import { ShopItemTypes } from '@/models/shopItem'
import { toast } from '@/hooks/use-toast'
import { launchConfettiShop } from '@/lib/confetti'
import { playSound } from '@/lib/playSound'

interface ShopStore {
  // État
  items: ShopItemTypes[]
  isLoading: boolean

  // Actions
  fetchItems: () => Promise<void>
  getItemsByType: (type: string) => ShopItemTypes[]
  purchaseItem: (itemId: string, updateSession?: () => Promise<void>) => Promise<boolean>
}

export const useShopStore = create<ShopStore>((set, get) => ({
  // État initial
  items: [],
  isLoading: false,

  // Actions
  fetchItems: async () => {
    try {
      set({ isLoading: true })
      const response = await fetch('/api/shop/get-items')
      const data = await response.json()
      
      if (data.items) {
        set({ items: data.items })
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des items:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  getItemsByType: (type: string) => {
    return get().items.filter(item => item.type === type)
  },

  purchaseItem: async (itemId: string, updateSession?: () => Promise<void>) => {
    try {
      const response = await fetch('/api/shop/purchase-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast({
          title: "Erreur d'achat",
          description: error.message || "Une erreur est survenue lors de l'achat",
          emojis: "✖️",
        })
        return false
      }

      launchConfettiShop();
      playSound("/Sounds/upvote-sound.mp3");

      toast({
        title: "Achat réussi !",
        description: "L'item a été ajouté à votre inventaire",
        emojis: "🎉",
      })

      // Mettre à jour la session si la fonction est fournie
      if (updateSession) {
        await updateSession()
      }

      return true
    } catch (error) {
      console.error("Erreur lors de l'achat:", error)
      return false
    }
  },
}))
