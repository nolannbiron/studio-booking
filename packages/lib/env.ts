export const isENVProd = process.env.NODE_ENV === 'production'
export const isENVDev = process.env.NODE_ENV === 'development'
export const isDesktop = import.meta.env.VITE_PUBLIC_DESKTOP_APP === 'true'
