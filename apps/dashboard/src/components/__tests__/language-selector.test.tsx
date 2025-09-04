/**
 * Language Selector Tests
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LanguageSelector } from '../i18n/language-selector'
import { I18nProvider } from '@naveeg/lib'

// Mock i18n service
const mockI18nService = {
  getCurrentLocale: () => 'en',
  setLocale: () => {},
  getSupportedLocales: () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
  ],
  isLocaleSupported: () => true,
  getLocale: () => null,
  t: (key: string) => key,
  exists: () => true,
  isRTL: () => false,
  getCurrency: () => 'USD',
  getDateFormat: () => 'MM/DD/YYYY',
  getTimeFormat: () => 'HH:mm',
  getNumberFormat: () => ({ decimal: '.', thousands: ',' }),
  changeLocale: async () => {},
  initialize: async () => {}
} as any

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <I18nProvider i18nService={mockI18nService}>
      {component}
    </I18nProvider>
  )
}

describe('LanguageSelector', () => {
  it('renders with default props', () => {
    renderWithProvider(<LanguageSelector />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('🇺🇸')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    renderWithProvider(<LanguageSelector />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Español')).toBeInTheDocument()
      expect(screen.getByText('Français')).toBeInTheDocument()
    })
  })

  it('closes dropdown when clicking outside', async () => {
    renderWithProvider(<LanguageSelector />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Español')).toBeInTheDocument()
    })
    
    // Click outside
    fireEvent.click(document.body)
    
    await waitFor(() => {
      expect(screen.queryByText('Español')).not.toBeInTheDocument()
    })
  })

  it('changes language when option is selected', async () => {
    const mockChangeLocale = jest.fn()
    const mockI18nWithChange = {
      ...mockI18nService,
      changeLocale: mockChangeLocale
    }

    render(
      <I18nProvider i18nService={mockI18nWithChange}>
        <LanguageSelector />
      </I18nProvider>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Español')).toBeInTheDocument()
    })
    
    const spanishOption = screen.getByText('Español')
    fireEvent.click(spanishOption)
    
    expect(mockChangeLocale).toHaveBeenCalledWith('es')
  })

  it('renders as select variant', () => {
    renderWithProvider(<LanguageSelector variant="select" />)
    
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByDisplayValue('🇺🇸 English')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    const mockI18nWithLoading = {
      ...mockI18nService,
      changeLocale: jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
    }

    render(
      <I18nProvider i18nService={mockI18nWithLoading}>
        <LanguageSelector />
      </I18nProvider>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    // Should show loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
