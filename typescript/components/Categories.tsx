import { CATEGORIES } from '@/data/content'

export function Categories() {
  return (
    <section id="categorias">
      <div className="container">
        <span className="section-tag">Categorias</span>
        <h2 className="section-title">
          Escolha a sua <span className="text-gradient">vibe</span>
        </h2>
        <p className="section-subtitle">
          Seis universos de conteúdo com curadoria diária. Na matrícula, você escolhe
          seus interesses e o portal se adapta a você.
        </p>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <a href="#destaques" className="category-card" key={cat.id}>
              <span className="category-emoji" aria-hidden="true">
                {cat.emoji}
              </span>
              <h3>{cat.name}</h3>
              <p>{cat.caption}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
