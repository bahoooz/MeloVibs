export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Déclaration des types pour window.gtag
declare global {
  interface Window {
    dataLayer: Array<unknown[]>
    gtag: (command: string, params: string | Date | Record<string, unknown>, options?: Record<string, unknown>) => void
  }
}

// Fonction d'initialisation de gtag
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID)
  }
}
