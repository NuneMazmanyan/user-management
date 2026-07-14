import type { UserEdits } from '../types/edits'

const STORAGE_KEY = 'user_edits'

export const storage = {
  getEdits(): UserEdits {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  },

  saveEdit(id: number, changes: UserEdits[number]) {
    const edits = storage.getEdits()
    edits[id] = { ...edits[id], ...changes }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
  },
}
