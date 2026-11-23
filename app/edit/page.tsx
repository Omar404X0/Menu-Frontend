'use client'

import { useState, useRef, useEffect } from 'react'

type Items = {
  id: number
  name: string
  price: number
  category: string
}

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://menu-backend-grr7.onrender.com'

export default function AdminLogin() {
  const [items, setItems] = useState<Items[]>([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [editing, setEditing] = useState<Items | null>(null)
  const [deleted, setDeleted] = useState<Items | null>(null)
  const [adding, setAdding] = useState(false)
  const [pickedCategory, setPickedCategory] = useState('')
  const [customCategory, setCustomCategory] = useState(false)
  const [addError, setAddError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const newNameRef = useRef<HTMLInputElement>(null)
  const newPriceRef = useRef<HTMLInputElement>(null)
  const newCategoryRef = useRef<HTMLInputElement>(null)

  async function loadItems() {
    try {
      const req = await fetch(`${API}/`)
      const data = await req.json()
      setItems(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!loggedIn) return
    loadItems()
  }, [loggedIn])

  const categories = [...new Set(items.map((i) => i.category))]

  async function sendData() {
    const email = emailRef.current?.value.trim()
    const password = passRef.current?.value
    if (!email || !password) {
      setError('Please Write Your Email and Password')
      return
    }

    setError('')
    setLoading(true)
    try {
      const req = await fetch(`${API}/edit/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const res = await req.json()

      if (req.ok && res.token) {
        sessionStorage.setItem('token', res.token)
        setLoggedIn(true)
      } else {
        setError(res.detail ?? 'Something went wrong! Please try again')
      }
    } catch {
      setError('Error in connection')
    } finally {
      setLoading(false)
    }
  }

  function editItem(item: Items) {
    setEditing(item)
  }

  function closeEdit() {
    setEditing(null)
  }

  async function saveEdit() {
    if (!editing) return
    const name = nameRef.current?.value.trim() ?? ''
    const category = categoryRef.current?.value.trim() ?? ''
    const priceText = priceRef.current?.value ?? ''
    const price = Number(priceText)
    if (!name || !category || !priceText || Number.isNaN(price) || price < 0) return
    setItems((prev) =>
      prev.map((i) => (i.id === editing.id ? { ...i, name, category, price } : i))
    )
    const req = await fetch(`${API}/edit/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: sessionStorage.getItem('token'), id: editing.id, name, category, price }),
    })
    const res = await req.json()

    if (res.ok === true) {
      alert('Items Chanaged')
    } else {
      alert('Error Happend Plaese Login Again')
    }

    setEditing(null)
  }

  async function deleteItem(item: Items) {
    setDeleted(item)
    const req = await fetch(`${API}/edit/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: sessionStorage.getItem('token'), id: item?.id }),
    })
    const res = await req.json()
    if (res.ok === true) {
      setItems((prev) => prev.filter((i) => i.id !== item.id))
      console.log('Item Deleted')
    } else {
      console.log('Error Happend')
    }
  }

  function openAdd() {
    setPickedCategory(categories[0] ?? '')
    setCustomCategory(categories.length === 0)
    setAddError('')
    setAdding(true)
  }

  function closeAdd() {
    setAdding(false)
  }

  async function saveAdd() {
    const name = newNameRef.current?.value.trim() ?? ''
    const priceText = newPriceRef.current?.value ?? ''
    const price = Number(priceText)
    const category = customCategory
      ? newCategoryRef.current?.value.trim() ?? ''
      : pickedCategory
    if (!name || !category || !priceText || Number.isNaN(price) || price < 0) {
      setAddError('Please fill in the name, price and category')
      return
    }

    setAddError('')

    const req = await fetch(`${API}/edit/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: sessionStorage.getItem('token'), name: name, price: price, category: category }),
    })

    if (req.ok) {
      await loadItems()
      setAdding(false)
      alert('Prodact Added')
    } else {
      alert('Some Thing Wrong')
    }
  }

  return (
    <main className="relative w-full bg-[#2a1a12]">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="orb absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#dfc1d3] opacity-60 blur-3xl" />
        <div className="orb2 absolute -bottom-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#9dbb6b] opacity-40 blur-3xl" />
        <div className="orb3 absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e0a878] opacity-40 blur-3xl" />
      </div>

      {!loggedIn && (
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="card-in relative w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#f3e1de] to-[#dfc1d3] text-4xl shadow-lg shadow-black/30">
            ☕
          </div>

          <h1 className="text-center text-4xl text-white">Layali</h1>
          <p className="mb-8 mt-2 text-center text-sm tracking-wide text-white/70">
            Admin Dashboard
          </p>

          <div className="flex flex-col gap-4">
            <label className="group relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60 transition group-focus-within:text-[#dfc1d3]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                autoComplete="email"
                onKeyDown={(e) => e.key === 'Enter' && passRef.current?.focus()}
                className="w-full rounded-2xl border border-white/20 bg-black/20 py-3.5 pl-12 pr-4 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
              />
            </label>

            <label className="group relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60 transition group-focus-within:text-[#dfc1d3]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="3" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <input
                ref={passRef}
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === 'Enter' && sendData()}
                className="w-full rounded-2xl border border-white/20 bg-black/20 py-3.5 pl-12 pr-14 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg px-2 py-1 text-xs text-white/60 transition hover:text-white"
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </label>

            {error && (
              <div className="shake rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-2.5 text-center text-sm text-red-100">
                {error}
              </div>
            )}

            <button
              onClick={sendData}
              disabled={loading}
              className="relative mt-2 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-[#dfc1d3] via-[#f3d9c8] to-[#dfc1d3] py-3.5 text-lg font-bold text-[#3b2216] shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b2216]/30 border-t-[#3b2216]" />
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </div>

      </section>
      )}

      {loggedIn && (
      <section id="menu" className="relative z-10 mx-auto max-w-5xl px-4 py-20">
        <h2 className="mb-6 text-center text-4xl text-white">Our Menu</h2>

        <div className="mb-10 flex justify-center">
          <button
            type="button"
            onClick={openAdd}
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#dfc1d3] via-[#f3d9c8] to-[#dfc1d3] px-7 py-3 font-bold text-[#3b2216] shadow-lg shadow-black/30 transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#dfc1d3]/20 active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full"
          >
            <svg
              className="relative transition-transform duration-300 group-hover:rotate-90"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            <span className="relative">New Product</span>
          </button>
        </div>

        {items.length === 0 && (
          <p className="text-center text-white/60">No items yet</p>
        )}

        {categories.map((cat) => (
          <div key={cat} className="mb-12">
            <h3 className="mb-4 border-b border-white/20 pb-2 text-2xl text-[#dfc1d3]">
              {cat}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items
                .filter((i) => i.category === cat)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur-xl"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#f3d9c8]">{item.price} EGP</span>
                      <button
                        type="button"
                        aria-label={`Edit ${item.name}`}
                        onClick={() => editItem(item)}
                        className="cursor-pointer rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-[#dfc1d3]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${item.name}`}
                        onClick={() => deleteItem(item)}
                        className="cursor-pointer rounded-lg p-1.5 text-white/60 transition hover:bg-red-500/20 hover:text-red-300"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
      )}

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={closeEdit}
          onKeyDown={(e) => e.key === 'Escape' && closeEdit()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Edit item"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[2rem] border border-white/20 bg-[#3a2418]/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl text-white">Edit item</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={closeEdit}
                className="cursor-pointer rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-white/70">Name</span>
                <input
                  autoFocus
                  ref={nameRef}
                  defaultValue={editing.name}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit()
                    if (e.key === 'Escape') closeEdit()
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-white/70">Price (EGP)</span>
                <input
                  type="number"
                  min="0"
                  ref={priceRef}
                  defaultValue={editing.price}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit()
                    if (e.key === 'Escape') closeEdit()
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-white/70">Category</span>
                <input
                  list="categories-list"
                  ref={categoryRef}
                  defaultValue={editing.category}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit()
                    if (e.key === 'Escape') closeEdit()
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                />
                <datalist id="categories-list">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 cursor-pointer rounded-2xl border border-white/20 bg-white/5 py-3 font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="flex-1 cursor-pointer rounded-2xl bg-gradient-to-r from-[#dfc1d3] via-[#f3d9c8] to-[#dfc1d3] py-3 font-bold text-[#3b2216] shadow-lg shadow-black/30 transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {adding && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={closeAdd}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="New product"
            onClick={(e) => e.stopPropagation()}
            className="card-in relative w-full max-w-md rounded-[2rem] border border-white/20 bg-[#3a2418]/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl text-white">New product</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={closeAdd}
                className="cursor-pointer rounded-lg p-1.5 text-white/60 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-white/70">Name</span>
                <input
                  autoFocus
                  ref={newNameRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') newPriceRef.current?.focus()
                    if (e.key === 'Escape') closeAdd()
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-white/70">Price (EGP)</span>
                <input
                  type="number"
                  min="0"
                  ref={newPriceRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveAdd()
                    if (e.key === 'Escape') closeAdd()
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                />
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-white/70">Category</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setPickedCategory(c)
                        setCustomCategory(false)
                      }}
                      className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition duration-200 hover:scale-105 active:scale-95 ${
                        !customCategory && pickedCategory === c
                          ? 'border-[#dfc1d3] bg-[#dfc1d3] font-semibold text-[#3b2216]'
                          : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCustomCategory(true)}
                    className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition duration-200 hover:scale-105 active:scale-95 ${
                      customCategory
                        ? 'border-[#dfc1d3] bg-[#dfc1d3] font-semibold text-[#3b2216]'
                        : 'border-dashed border-white/30 bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    + New
                  </button>
                </div>

                {customCategory && (
                  <input
                    autoFocus
                    ref={newCategoryRef}
                    placeholder="New category name"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveAdd()
                      if (e.key === 'Escape') closeAdd()
                    }}
                    className="card-in w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#dfc1d3] focus:bg-black/30 focus:ring-4 focus:ring-[#dfc1d3]/20"
                  />
                )}
              </div>

              {addError && (
                <div className="shake rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-2.5 text-center text-sm text-red-100">
                  {addError}
                </div>
              )}

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={closeAdd}
                  className="flex-1 cursor-pointer rounded-2xl border border-white/20 bg-white/5 py-3 font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveAdd}
                  className="flex-1 cursor-pointer rounded-2xl bg-gradient-to-r from-[#dfc1d3] via-[#f3d9c8] to-[#dfc1d3] py-3 font-bold text-[#3b2216] shadow-lg shadow-black/30 transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  Add product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
