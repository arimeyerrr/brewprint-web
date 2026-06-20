'use client'
import { useState } from 'react'
import AnimateInView from './AnimateInView'

const STORIES = [
  { id: 'bb', name: 'Barista B.', initials: 'BB', color: '#8B4513', active: true },
  { id: 'ss', name: 'SarahSips', initials: 'SS', color: '#4a5568', active: false },
  { id: 'mb', name: 'MikeBrews', initials: 'MB', color: '#2d4a6b', active: false },
  { id: 'jn', name: 'Jenna', initials: 'JN', color: '#5a3a4a', active: false },
  { id: 'tm', name: 'Tom', initials: 'TM', color: '#2a3a2a', active: false },
]

const POSTS = [
  {
    id: 1,
    user: 'Barista Brian',
    initials: 'BB',
    color: '#8B4513',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=85&auto=format&fit=crop',
    title: 'Morning Brews & News',
    caption: 'Reviewing the new roast from Opus — this one hits different.',
    likes: 243,
    comments: 2,
    score: 9.2,
    sponsored: false,
  },
  {
    id: 2,
    user: 'SarahSips',
    initials: 'SS',
    color: '#4a5568',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=85&auto=format&fit=crop',
    title: 'Iced Latte Season',
    caption: 'Found the best oat milk latte in the city. No notes.',
    likes: 189,
    comments: 1,
    score: 8.7,
    sponsored: false,
  },
  {
    id: 3,
    user: 'Volta Coffee',
    initials: 'VC',
    color: '#3a2a1a',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85&auto=format&fit=crop',
    title: 'Pour Over Perfection',
    caption: 'Come try our new single origin Ethiopian pour over.',
    likes: 312,
    comments: 4,
    score: null,
    sponsored: true,
  },
  {
    id: 4,
    user: 'MikeBrews',
    initials: 'MB',
    color: '#2d4a6b',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=85&auto=format&fit=crop',
    title: 'Hidden Gem Alert',
    caption: 'This place just became my permanent study spot. 9.4 match.',
    likes: 156,
    comments: 3,
    score: 9.4,
    sponsored: false,
  },
]

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 8h1a4 4 0 010 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  )
}

function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

function PostCard({ post }: { post: typeof POSTS[0] }) {
  const [cupped, setCupped] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-white/[0.04]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar initials={post.initials} color={post.color} size={36} />
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{post.user}</p>
            {post.sponsored && (
              <p className="text-white/30 text-[10px] tracking-wider uppercase leading-tight">Sponsored</p>
            )}
          </div>
        </div>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative" style={{ paddingBottom: '80%' }}>
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {post.score && (
          <div
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', color: '#D98E4A', border: '1px solid rgba(217,142,74,0.3)' }}
          >
            {post.score} match
          </div>
        )}
        {post.sponsored && (
          <div
            className="absolute top-3 right-3 rounded-sm px-2 py-1 text-[10px] font-semibold tracking-widest uppercase text-white"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            Sponsored
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCupped(!cupped)}
              className={`transition-colors duration-200 ${cupped ? 'text-amber' : 'text-white/60 hover:text-white'}`}
            >
              <CupIcon />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <CommentIcon />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <SendIcon />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`transition-colors duration-200 ${saved ? 'text-white' : 'text-white/60 hover:text-white'}`}
          >
            <BookmarkIcon />
          </button>
        </div>

        <p className="text-white text-sm font-semibold mb-1">
          {(post.likes + (cupped ? 1 : 0)).toLocaleString()} likes
        </p>
        <p className="text-white text-sm font-bold leading-snug">{post.title}</p>
        <p className="text-white/55 text-sm leading-snug">
          <span className="text-white/70 font-medium">{post.user}</span>{' '}
          {post.caption}
        </p>
        {post.comments > 0 && (
          <button className="text-white/25 text-xs mt-1.5 hover:text-white/45 transition-colors">
            View all {post.comments} comment{post.comments !== 1 ? 's' : ''}
          </button>
        )}
        <div className="h-4" />
      </div>
    </div>
  )
}

export default function SocialFeed() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-md mx-auto px-4">

        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.45em] uppercase font-medium mb-4 text-center">
            the feed
          </p>
        </AnimateInView>
        <AnimateInView delay={0.08}>
          <h2
            className="font-bold text-white leading-tight mb-12 text-center"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            what people are sipping.
          </h2>
        </AnimateInView>

        {/* Stories */}
        <AnimateInView delay={0.12}>
          <div className="flex items-start gap-5 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {STORIES.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className="rounded-full p-0.5"
                  style={{ background: s.active ? 'linear-gradient(135deg, #D98E4A, #f0b060)' : 'rgba(255,255,255,0.12)' }}
                >
                  <Avatar initials={s.initials} color={s.color} size={52} />
                </div>
                <span className="text-white/40 text-[10px] text-center leading-tight max-w-[52px] truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </AnimateInView>

        {/* Posts */}
        <div className="space-y-4">
          {POSTS.map((post, i) => (
            <AnimateInView key={post.id} delay={0.1 + i * 0.08}>
              <PostCard post={post} />
            </AnimateInView>
          ))}
        </div>

        <AnimateInView delay={0.4}>
          <div className="text-center mt-10">
            <a
              href="#waitlist"
              className="inline-block border border-white/15 text-white/60 text-sm px-7 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-200"
            >
              join the feed →
            </a>
          </div>
        </AnimateInView>

      </div>
    </section>
  )
}
