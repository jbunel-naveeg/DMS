/**
 * Translation Editor Tests
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TranslationEditor } from '../i18n/translation-editor'
import { I18nProvider } from '@naveeg/lib'

// Mock i18n service
const mockI18nService = {
  getCurrentLocale: () => 'en',
  setLocale: () => {},
  getSupportedLocales: () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
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

describe('TranslationEditor', () => {
  it('renders translation editor', () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    expect(screen.getByText('Translation Editor')).toBeInTheDocument()
    expect(screen.getByText('common • en')).toBeInTheDocument()
  })

  it('shows add translation form when add button is clicked', () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    const addButton = screen.getByText('Add Translation')
    fireEvent.click(addButton)
    
    expect(screen.getByText('Add New Translation')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g., buttons.save')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g., Save')).toBeInTheDocument()
  })

  it('filters translations based on search term', async () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    const searchInput = screen.getByPlaceholderText('Search translations...')
    fireEvent.change(searchInput, { target: { value: 'welcome' } })
    
    await waitFor(() => {
      expect(screen.getByText('welcome')).toBeInTheDocument()
    })
  })

  it('filters translations based on status', async () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    const statusFilter = screen.getByDisplayValue('All')
    fireEvent.change(statusFilter, { target: { value: 'translated' } })
    
    await waitFor(() => {
      expect(screen.getByText('Translated')).toBeInTheDocument()
    })
  })

  it('edits translation when edit button is clicked', async () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Welcome to Naveeg')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })
  })

  it('saves translation when save button is clicked', async () => {
    const mockOnSave = jest.fn()
    
    renderWithProvider(
      <TranslationEditor 
        namespace="common" 
        locale="en" 
        onSave={mockOnSave}
      />
    )
    
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    await waitFor(() => {
      const input = screen.getByDisplayValue('Welcome to Naveeg')
      fireEvent.change(input, { target: { value: 'Updated welcome message' } })
      
      const saveButton = screen.getByText('Save')
      fireEvent.click(saveButton)
      
      expect(mockOnSave).toHaveBeenCalledWith('welcome', 'Updated welcome message')
    })
  })

  it('cancels editing when cancel button is clicked', async () => {
    renderWithProvider(
      <TranslationEditor namespace="common" locale="en" />
    )
    
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    await waitFor(() => {
      const cancelButton = screen.getByText('Cancel')
      fireEvent.click(cancelButton)
      
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })
  })

  it('deletes translation when delete button is clicked', async () => {
    const mockOnDelete = jest.fn()
    
    renderWithProvider(
      <TranslationEditor 
        namespace="common" 
        locale="en" 
        onDelete={mockOnDelete}
      />
    )
    
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    expect(mockOnDelete).toHaveBeenCalledWith('welcome')
  })

  it('adds new translation when add form is submitted', async () => {
    const mockOnAdd = jest.fn()
    
    renderWithProvider(
      <TranslationEditor 
        namespace="common" 
        locale="en" 
        onAdd={mockOnAdd}
      />
    )
    
    const addButton = screen.getByText('Add Translation')
    fireEvent.click(addButton)
    
    const keyInput = screen.getByPlaceholderText('e.g., buttons.save')
    const valueInput = screen.getByPlaceholderText('e.g., Save')
    
    fireEvent.change(keyInput, { target: { value: 'test.key' } })
    fireEvent.change(valueInput, { target: { value: 'Test Value' } })
    
    const addSubmitButton = screen.getByText('Add Translation')
    fireEvent.click(addSubmitButton)
    
    expect(mockOnAdd).toHaveBeenCalledWith('test.key', 'Test Value')
  })
})
