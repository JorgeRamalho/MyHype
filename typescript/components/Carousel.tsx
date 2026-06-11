import { useEffect, useState } from 'react'
import { CAROUSEL_SLIDES, PORTFOLIO_LINK } from '@/data/content'
import { publicAsset } from '@/utils/publicAsset'

const AUTOPLAY_MS = 5000

export function Carousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = CAROUSEL_SLIDES.length

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, total])

  const goTo = (index: number) => setCurrent((index + total) % total)

  return (
    <section
      className="carousel"
      id="vitrine"
      aria-roledescription="carrossel"
      aria-label="Vitrine de projetos em destaque"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="carousel-frame">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {CAROUSEL_SLIDES.map((slide, i) => {
              const content = (
                <>
                  <img
                    src={publicAsset(slide.image)}
                    alt={slide.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <figcaption className="carousel-caption">
                    <strong>{slide.title}</strong>
                    <span>{slide.caption}</span>
                    {slide.href && (
                      <span className="carousel-caption-link">Visitar site →</span>
                    )}
                  </figcaption>
                </>
              )

              return (
                <figure
                  className="carousel-slide"
                  key={slide.image}
                  aria-hidden={i !== current}
                >
                  {slide.href ? (
                    <a
                      className="carousel-slide-link"
                      href={slide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar site da ${slide.title}`}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </figure>
              )
            })}
          </div>

          <button
            className="carousel-arrow prev"
            onClick={() => goTo(current - 1)}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            className="carousel-arrow next"
            onClick={() => goTo(current + 1)}
            aria-label="Próxima foto"
          >
            ›
          </button>

          <div className="carousel-dots" role="tablist" aria-label="Selecionar foto">
            {CAROUSEL_SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir para: ${slide.title}`}
                className={i === current ? 'dot active' : 'dot'}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <div className="carousel-cta">
          <a href={PORTFOLIO_LINK} className="btn btn-primary btn-portfolio">
            ✨ Portfólio
          </a>
        </div>
      </div>
    </section>
  )
}
