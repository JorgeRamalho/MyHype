import type { Category, TrendItem } from '@/types'

export const SLOGAN = 'Seu portal, sua vibe, seu hype.'

/** Site externo aberto ao clicar no globo do Hero — troque a URL aqui. */
export const GLOBE_LINK = 'https://www.google.com'

export const CATEGORIES: Category[] = [
  { id: 'musica', emoji: '🎧', name: 'Música', caption: 'Lançamentos, charts e playlists' },
  { id: 'games', emoji: '🎮', name: 'Games', caption: 'Reviews, e-sports e novidades' },
  { id: 'cinema', emoji: '🎬', name: 'Cinema & Séries', caption: 'Estreias e bastidores' },
  { id: 'moda', emoji: '👟', name: 'Moda & Street', caption: 'Drops, sneakers e estilo' },
  { id: 'tech', emoji: '🚀', name: 'Tecnologia', caption: 'IA, gadgets e futuro' },
  { id: 'creators', emoji: '📸', name: 'Creators', caption: 'Influência e conteúdo' },
]

export const TRENDS: TrendItem[] = [
  {
    id: 't1',
    tag: 'Música',
    emoji: '🎤',
    title: 'Os 10 sons que vão dominar o verão',
    text: 'Do funk ao hyperpop: a curadoria da comunidade My Hype com os hits que já estão explodindo nas plataformas.',
    author: 'Equipe My Hype',
    readTime: '5 min de leitura',
  },
  {
    id: 't2',
    tag: 'Games',
    emoji: '🕹️',
    title: 'E-sports no Brasil: a nova geração',
    text: 'Times brasileiros estão redesenhando o cenário competitivo mundial. Conheça os nomes que você precisa acompanhar.',
    author: 'Redação Games',
    readTime: '8 min de leitura',
  },
  {
    id: 't3',
    tag: 'Tecnologia',
    emoji: '🤖',
    title: 'IA criativa: o hype é real?',
    text: 'Analisamos como a inteligência artificial está mudando música, design e produção de conteúdo — e o que vem aí.',
    author: 'Lab de Tendências',
    readTime: '6 min de leitura',
  },
  {
    id: 't4',
    tag: 'Moda & Street',
    emoji: '🧢',
    title: 'Drops da semana: o que vale o hype',
    text: 'Colabs, sneakers e streetwear: a seleção do que realmente merece um lugar na sua rotação.',
    author: 'Curadoria Street',
    readTime: '4 min de leitura',
  },
  {
    id: 't5',
    tag: 'Cinema & Séries',
    emoji: '🍿',
    title: 'As estreias mais aguardadas do ano',
    text: 'Um guia completo com datas, trailers e teorias da comunidade sobre os lançamentos que vão dominar as conversas.',
    author: 'Equipe My Hype',
    readTime: '7 min de leitura',
  },
  {
    id: 't6',
    tag: 'Creators',
    emoji: '🌟',
    title: 'Como creators estão monetizando em 2026',
    text: 'Das lives aos produtos próprios: estratégias reais de quem vive de conteúdo no Brasil.',
    author: 'Lab de Tendências',
    readTime: '9 min de leitura',
  },
]

export const INTEREST_OPTIONS = CATEGORIES.map((c) => c.name)

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]
