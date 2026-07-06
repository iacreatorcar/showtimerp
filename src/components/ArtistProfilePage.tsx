'use client'

import { use, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { Artist } from '@/src/lib/types'

export default function ArtistProfilePage({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = use(paramsPromise)
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [bio, setBio] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoFit, setPhotoFit] = useState<'contain' | 'cover'>('contain')

  useEffect(() => {
    fetchArtist()
  }, [id])

  async function fetchArtist() {
    const { data, error } = await supabase.from('artists').select('*').eq('id', id).single()
    if (error || !data) {
      setNotFound(true)
    } else {
      const a = data as Artist
      setArtist(a)
      setBio(a.bio ?? '')
      setPhotoUrl(a.photo_url ?? '')
      setPhotoFit(a.photo_fit ?? 'contain')
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await supabase.from('artists').update({ bio, photo_url: photoUrl, photo_fit: photoFit }).eq('id', id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <div className="min-h-screen bg-slate-900 text-center py-20 text-white">Caricamento...</div>

  if (notFound || !artist) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-bold text-pink-600 mb-2">Artista non trovato</h1>
          <p className="text-gray-400">Il link potrebbe non essere più valido.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-lg mx-auto bg-slate-800 rounded-lg p-6 border-2 border-pink-600">
        <div className="text-center mb-6">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={artist.name}
              className={`w-32 h-32 rounded-full mx-auto mb-4 border-2 border-pink-600 ${photoFit === 'cover' ? 'object-cover' : 'object-contain bg-black'}`}
            />
          ) : (
            <div className="text-6xl mb-4">🎭</div>
          )}
          <h1 className="text-2xl font-bold text-pink-600">{artist.name}</h1>
          <p className="text-gray-400 text-sm">{artist.role}</p>
        </div>

        <p className="text-gray-300 text-sm text-center mb-6">
          Aggiorna la tua bio e foto profilo. Le modifiche sono visibili subito sul sito.
        </p>

        {saved && <div className="mb-4 bg-green-600 text-white p-3 rounded text-center font-bold">✓ Salvato!</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">URL Foto</label>
            <input
              type="url"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div className="flex gap-4 text-sm text-gray-300">
            <label className="flex items-center gap-1.5">
              <input type="radio" checked={photoFit === 'contain'} onChange={() => setPhotoFit('contain')} /> Adatta
            </label>
            <label className="flex items-center gap-1.5">
              <input type="radio" checked={photoFit === 'cover'} onChange={() => setPhotoFit('cover')} /> Originale
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={5}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:outline-none focus:border-pink-400"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-pink-600 text-white px-4 py-2 rounded font-bold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {saving ? 'Salvataggio…' : 'Salva Modifiche'}
          </button>
        </div>
      </div>
    </div>
  )
}
