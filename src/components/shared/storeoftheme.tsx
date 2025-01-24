import { create } from 'zustand'
import { THEMES } from './themes'

type Organization = {
  id: string
  name: string
  code: keyof typeof THEMES
  logo?: string
}

type OrganizationState = {
  currentOrganization: Organization | null
  setCurrentOrganization: (org: Organization) => void
  getCurrentTheme: () => {
    logo: any
    cygle: string
    sidebar: {
      background: string
      text: string
      icon: string
      colors: Record<string, string>
    }
    navbar: {
      background: string
      text: string
      icon: string
      
      colors: Record<string, string>
   
    }
    assistIcon: {
      background: string
      text: string
      icon: string
      colors: Record<string, string>
    }
  }
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  currentOrganization: null,
  setCurrentOrganization: (org) => set({ currentOrganization: org }),
  getCurrentTheme: () => {
    const currentOrg = get().currentOrganization
    return currentOrg ? THEMES[currentOrg.code] : THEMES.agl // Default to 'agl'
  }
}))