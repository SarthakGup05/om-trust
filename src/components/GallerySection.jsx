import { useState, useEffect, useCallback } from 'react'
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react'

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null) // null when closed, number when open

  const galleryItems = [
    {
      id: 1,
      src: '/images/gallery-1.webp',
      title: 'Trust Volunteers with Comfort Supplies',
      category: 'Community',
      caption: 'Om Charitable Trust members delivering essential comfort supplies and pillows.',
    },
    {
      id: 2,
      src: '/images/gallery-2.webp',
      title: 'Residents & Volunteers at Care Ashram',
      category: 'Elder Care',
      caption: 'Gathering with senior residents at Matoshree Vriddhashram during a welfare visit.',
    },
    {
      id: 3,
      src: '/images/gallery-3.webp',
      title: 'Bedding & Personal Care Handover',
      category: 'Elder Care',
      caption: 'Distributing new pillows and daily comfort kits directly to senior citizens.',
    },
    {
      id: 4,
      src: '/images/gallery-4.webp',
      title: 'Furniture & Living Amenities Distribution',
      category: 'Community',
      caption: 'Donation of sturdy cots and mattresses to support shelter home residents.',
    },
    {
      id: 5,
      src: '/images/gallery-5.webp',
      title: 'Air Cooler & Quilt Support for Seniors',
      category: 'Elder Care',
      caption: 'Installing air coolers and distributing blankets to ensure senior comfort in all seasons.',
    },
    {
      id: 6,
      src: '/images/gallery-6.webp',
      title: 'Health & Medical Aid Assistance',
      category: 'Relief & Health',
      caption: 'Personal medicine distribution and caring interactions with elderly women.',
    },
    {
      id: 7,
      src: '/images/gallery-7.webp',
      title: 'Arrival of Community Relief Supplies',
      category: 'Community',
      caption: 'Volunteers receiving and staging bulk bedding supplies for distribution drives.',
    },
    {
      id: 8,
      src: '/images/gallery-8.webp',
      title: 'Elder Care Community Fellowship',
      category: 'Elder Care',
      caption: 'Sharing time, conversation, and warmth with senior community members.',
    },
  ]

  const categories = ['All', 'Elder Care', 'Community', 'Relief & Health']

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  // Lightbox Navigation Controls
  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1))
  }, [lightboxIndex, filteredItems.length])

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1))
  }, [lightboxIndex, filteredItems.length])

  // Keyboard navigation listener (ESC, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, prevImage, nextImage])

  return (
    <section id="gallery" className="py-12 lg:py-16 bg-[#FFF9F0] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#F1F6F1] rounded-full filter blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#D98B3A]/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F6F1] border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Camera className="w-3.5 h-3.5 text-[#D98B3A]" />
            <span>Our Authentic Evidence</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            Moments of Care, Action & Dignity
          </h2>

          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            Real photographs captured directly from Om Charitable Trust’s grassroots drives, community kitchen distributions, and elderly care initiatives.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1F5D42] text-white shadow-md'
                    : 'bg-white text-[#24332B]/70 border border-[#1F5D42]/15 hover:border-[#1F5D42] hover:text-[#1F5D42]'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-[11px] opacity-75 font-normal">
                    ({galleryItems.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden bg-[#143B2B] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover Dark Vignette & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-left text-white">
                {/* Top Corner Badge & Maximize Icon */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D98B3A] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{item.category}</span>
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#FFF9F0] leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-[#F1F6F1]/80 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Mobile Always-Visible Caption Bar */}
              <div className="sm:hidden absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 text-left text-white">
                <div className="text-xs font-bold text-[#FFF9F0] truncate">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Full-Screen Image Viewer) */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-left">
              <span className="px-3 py-1 rounded-full bg-[#D98B3A] text-xs font-bold uppercase tracking-wider">
                {filteredItems[lightboxIndex]?.category}
              </span>
              <span className="font-mono text-sm text-[#F5C284]">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image & Arrows */}
          <div
            className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:-left-12 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-[#D98B3A] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-xl cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Large Photo */}
            <div className="max-h-[70vh] sm:max-h-[75vh] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex]?.src}
                alt={filteredItems[lightboxIndex]?.title}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:-right-12 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-[#D98B3A] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-xl cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Caption */}
          <div
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center text-white border border-white/15 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-heading font-extrabold text-lg text-[#FFF9F0]">
              {filteredItems[lightboxIndex]?.title}
            </h4>
            <p className="font-body text-xs sm:text-sm text-[#F1F6F1]/85 mt-1">
              {filteredItems[lightboxIndex]?.caption}
            </p>
          </div>

        </div>
      )}
    </section>
  )
}
