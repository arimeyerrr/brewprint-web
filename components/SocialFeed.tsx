'use client'
import { useState } from 'react'
import AnimateInView from './AnimateInView'

const POSTS = [
  { id: 1,  user: 'BaristaBrian',     initials: 'BB', color: '#7B3A1A', img: '1541167760496-1628856ab772', likes: 243, score: 9.2,  sponsored: false, title: 'Morning Brews'     },
  { id: 2,  user: 'SarahSips',        initials: 'SS', color: '#3D4A5C', img: '1461023058943-07fcbe16d735', likes: 189, score: 8.7,  sponsored: false, title: 'Iced Season'       },
  { id: 3,  user: 'Volta Coffee',     initials: 'VC', color: '#2A1A0A', img: '1509042239860-f550ce710b93', likes: 312, score: null, sponsored: true,  title: 'Pour Over'         },
  { id: 4,  user: 'MikeBrews',        initials: 'MB', color: '#2d4a6b', img: '1445116572660-236099ec97a0', likes: 156, score: 9.4,  sponsored: false, title: 'Hidden Gem'        },
  { id: 5,  user: 'Jenna',            initials: 'JN', color: '#5a3a4a', img: '1504630083234-14187a9df0f5', likes: 201, score: 8.5,  sponsored: false, title: 'Sunday Pour'       },
  { id: 6,  user: 'Tom',              initials: 'TM', color: '#2a3a2a', img: '1464983953574-0892a716854b', likes: 98,  score: 9.1,  sponsored: false, title: 'Espresso Life'     },
  { id: 7,  user: 'Portland Roasters',initials: 'PR', color: '#3A1A0A', img: '1511920170033-f8396924c348', likes: 445, score: null, sponsored: true,  title: 'Single Origin'     },
  { id: 8,  user: 'coffeeaddict',     initials: 'CA', color: '#2A3A4A', img: '1447933601403-0c6688de566e', likes: 334, score: 9.6,  sponsored: false, title: 'Perfect Shot'      },
  { id: 9,  user: 'morningpour',      initials: 'MP', color: '#4A3A1A', img: '1495474472287-4d71bcdd2085', likes: 122, score: 8.3,  sponsored: false, title: 'First Light'       },
  { id: 10, user: 'weekendwanderer',  initials: 'WW', color: '#2A4A3A', img: '1498804103079-a6351b050096', likes: 278, score: 9.0,  sponsored: false, title: 'New Spot'          },
  { id: 11, user: 'Opus Coffee',      initials: 'OC', color: '#1A1A2A', img: '1514432324607-a09d9b4aefdd', likes: 189, score: null, sponsored: true,  title: 'Harvest Blend'     },
  { id: 12, user: 'dailydose',        initials: 'DD', color: '#3A2A1A', img: '1476224203421-9ac39bcb3327', likes: 67,  score: 7.8,  sponsored: false, title: 'Cold Brew'         },
  { id: 13, user: 'sipnstay',         initials: 'SN', color: '#1A2A3A', img: '1506619118655-17d7ee7cf7d5', likes: 156, score: 9.3,  sponsored: false, title: 'Stay Awhile'       },
  { id: 14, user: 'baristalife',      initials: 'BL', color: '#3A1A2A', img: '1510591509098-f4fdc6d0ff04', likes: 389, score: 9.5,  sponsored: false, title: 'Art in Every Cup'  },
  { id: 15, user: 'roastmaster',      initials: 'RM', color: '#2A1A3A', img: '1587734195503-904fca47e0e9', likes: 234, score: 8.8,  sponsored: false, title: 'Fresh Pull'        },
  { id: 16, user: 'latteart.co',      initials: 'LA', color: '#3A2A1A', img: '1501959915551-4e8d30928317', likes: 312, score: 9.5,  sponsored: false, title: 'Rosetta Pull'      },
  { id: 17, user: 'groundskeeper',    initials: 'GK', color: '#1A3A2A', img: '1513558818408-22eb2df3ef44', likes: 88,  score: 8.1,  sponsored: false, title: 'Origin Story'      },
  { id: 18, user: 'Dogwood Coffee',   initials: 'DC', color: '#2A1A0A', img: '1535529738923-8ae5f0ab1e3a', likes: 421, score: null, sponsored: true,  title: 'Dogwood Reserve'   },
  { id: 19, user: 'filterdripper',    initials: 'FD', color: '#1A2A3A', img: '1515694346734-977df0850f01', likes: 155, score: 9.1,  sponsored: false, title: 'V60 Session'       },
  { id: 20, user: 'blackcupclub',     initials: 'BC', color: '#0A1A0A', img: '1566803847726-d5cf8ae6f98e', likes: 278, score: 9.6,  sponsored: false, title: 'Straight Black'    },
]

function Avatar({ initials, color, size = 32 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  )
}

function GridPost({ post }: { post: typeof POSTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: '1/1', background: '#0a0a0a' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sponsored border glow */}
      {post.sponsored && (
        <div className="absolute inset-0 z-10 pointer-events-none rounded-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(217,142,74,0.45)' }} />
      )}

      <img
        src={`https://images.unsplash.com/photo-${post.img}?w=500&q=80&auto=format&fit=crop`}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      />

      {/* Score badge */}
      {post.score && (
        <div className="absolute top-2 right-2 text-base font-black leading-none"
          style={{ color: '#D98E4A', textShadow: '0 1px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)' }}>
          {post.score}
        </div>
      )}

      {/* Sponsored badge — prominent */}
      {post.sponsored && (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md"
          style={{ background: 'rgba(217,142,74,0.18)', border: '1px solid rgba(217,142,74,0.4)', backdropFilter: 'blur(6px)' }}>
          <div className="w-1 h-1 rounded-full" style={{ background: '#D98E4A' }} />
          <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#D98E4A' }}>Sponsored</span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: 'rgba(0,0,0,0.62)' }}
      >
        <button
          onClick={() => setLiked(!liked)}
          className="text-sm font-semibold transition-colors"
          style={{ color: liked ? '#D98E4A' : 'white' }}
        >
          ☕ {post.likes + (liked ? 1 : 0)}
        </button>
        <p className="text-white text-xs font-medium px-4 text-center leading-tight">{post.title}</p>
        <p className="text-white/45 text-[10px]">@{post.user}</p>
      </div>

      {/* Bottom strip */}
      <div className="absolute inset-x-0 bottom-0 px-2 py-1.5 flex items-center gap-1.5"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
        <Avatar initials={post.initials} color={post.color} size={15} />
        <span className="text-white/55 text-[10px] truncate">{post.user}</span>
      </div>
    </div>
  )
}

export default function SocialFeed() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6 mb-10 text-center">
        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase font-medium mb-4">
            The Feed
          </p>
        </AnimateInView>
        <AnimateInView delay={0.08}>
          <h2 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            See What Your Friends Are Sipping.
          </h2>
        </AnimateInView>
      </div>

      <AnimateInView delay={0.12}>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-px mb-10" style={{ background: '#111' }}>
          {POSTS.map((post) => (
            <GridPost key={post.id} post={post} />
          ))}
        </div>
      </AnimateInView>

      <AnimateInView delay={0.18}>
        <div className="text-center">
          <a
            href="#waitlist"
            className="inline-block border border-white/15 text-white/60 text-sm px-7 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-200"
          >
            Join the Feed →
          </a>
        </div>
      </AnimateInView>
    </section>
  )
}
