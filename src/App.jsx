import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'certifications', label: 'certifications' },
  { id: 'achievements', label: 'achievements' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]

const PROJECTS = [
  {
    year: '2026',
    name: 'chotu',
    desc: {
      en: 'Full-stack URL shortener handling request routing, redirect logic, and key-value storage, with TTL-based expiry for automatic scaling.',
      jp: 'リクエストルーティング、リダイレクトロジック、Key-Valueストレージを処理し、TTLベースの有効期限で自動スケーリングするフルスタックURL短縮サービス。',
    },
    stack: ['JavaScript', 'Vercel', 'Upstash Redis'],
  },
  {
    year: '2026',
    name: 'newsposter & otter',
    desc: {
      en: 'Two modular, utility-first CSS/HTML5 frameworks (v2.0.0) built on SOLID-aligned patterns, published to npm and jsDelivr.',
      jp: 'SOLID原則に沿ったパターンで構築された2つのモジュラー型ユーティリティファーストCSS/HTML5フレームワーク（v2.0.0）。npmとjsDelivrで公開。',
    },
    stack: ['CSS', 'HTML5', 'npm', 'jsDelivr'],
  },
  {
    year: '2025',
    name: 'saucypass',
    desc: {
      en: 'Open-source Python library generating context-aware, pronounceable, cryptographically secure passwords — high entropy, human-readable.',
      jp: 'コンテキストを認識し、発音可能で暗号学的に安全なパスワードを生成するオープンソースのPythonライブラリ。高エントロピーでありながら人間が読める形式。',
    },
    stack: ['Python', 'Pip', 'Cryptography'],
  },
  {
    year: '2025',
    name: 'ftp secure transfer',
    desc: {
      en: 'Secure CLI utility for transferring files across local networks over custom protocols. Led a team of three as project lead.',
      jp: 'カスタムプロトコルを介してローカルネットワーク上でファイルを転送するための安全なCLIユーティリティ。プロジェクトリーダーとして3人のチームを統率。',
    },
    stack: ['Python', 'CLI', 'Networking'],
  },
  {
    year: '2025',
    name: 'terminal clock',
    desc: {
      en: 'Customizable terminal clock CLI, packaged and published to PyPI — Python packaging pipeline scripted with Bash.',
      jp: 'カスタマイズ可能なターミナル時計CLI。PyPIにパッケージ化して公開。Bashでスクリプト化されたPythonパッケージングパイプライン。',
    },
    stack: ['Python', 'Bash', 'PyPI'],
  },
]

const EXPERIENCE = [
  {
    when: 'Sep — Oct 2025',
    role: 'Data Analysis Internship',
    org: 'Vodafone Idea · Remote, India',
    points: [
      {
        en: 'Engineered data validation and exploration mechanisms with SQL and Python to streamline reporting workflows.',
        jp: 'SQLとPythonを使用してデータの検証と探索メカニズムを構築し、レポート作成ワークフローを効率化。',
      },
      {
        en: 'Prototyped complex SQL queries with AI-assisted tooling to cut manual analysis time and raise code quality.',
        jp: 'AI支援ツールを使用して複雑なSQLクエリのプロトタイプを作成し、手作業による分析時間を短縮してコードの品質を向上。',
      },
      {
        en: 'Used advanced Excel functions to analyze business requirements and stakeholder needs.',
        jp: '高度なExcel関数を使用して、ビジネス要件と利害関係者のニーズを分析。',
      },
    ],
  },
  {
    when: 'Feb 2025',
    role: 'Security Analyst — Job Simulation',
    org: 'Deloitte Australia (Forage) · Virtual',
    points: [
      {
        en: 'Conducted security incident log analysis and developed incident response plans.',
        jp: 'セキュリティインシデントのログ分析を実施し、インシデント対応計画を策定。',
      },
      {
        en: 'Documented system vulnerabilities with structured reporting for cross-functional stakeholders.',
        jp: '部門間の利害関係者向けに構造化されたレポートでシステムの脆弱性を文書化。',
      },
      {
        en: 'Ran simulated web security audits and network analysis to identify vulnerabilities.',
        jp: 'シミュレートされたWebセキュリティ監査とネットワーク分析を実行して脆弱性を特定。',
      },
    ],
  },
  {
    when: 'Jun 2024',
    role: 'Data Analysis — Job Simulation',
    org: 'JPMorgan Chase · Virtual',
    points: [
      {
        en: 'Built interactive dashboards for financial data and automated recurring reporting tasks.',
        jp: '財務データ用のインタラクティブなダッシュボードを構築し、定期的なレポート作成タスクを自動化。',
      },
    ],
  },
  {
    when: 'Jun 2024',
    role: 'Excel Skills — Job Simulation',
    org: 'Forage · Remote',
    points: [
      {
        en: 'Applied data analytics and strategic planning using MS Excel for business analysis.',
        jp: 'ビジネス分析のためにMS Excelを使用したデータ分析と戦略的計画を適用。',
      },
    ],
  },
]

const SKILLS = [
  { title: { en: 'Web / Frontend', jp: 'Web / フロントエンド' }, items: ['JavaScript', 'HTML5', 'CSS', 'Responsive Design'] },
  { title: { en: 'Backend / Languages', jp: 'バックエンド / 言語' }, items: ['Python', 'C++', 'C', 'SQL', 'Bash'] },
  { title: { en: 'Cybersecurity', jp: 'サイバーセキュリティ' }, items: ['Web Security', 'Networking', 'Secure Coding', 'Data Validation'] },
  { title: { en: 'Tools & Cloud', jp: 'ツール ＆ クラウド' }, items: ['Git / GitHub', 'Vercel CI/CD', 'Npm', 'Pip', 'Linux Terminal'] },
  { title: { en: 'Databases', jp: 'データベース' }, items: ['SQL', 'Relational DB Design'] },
  { title: { en: 'AI Workflow', jp: 'AI ワークフロー' }, items: ['LLM Code Refactoring', 'AI-driven Analysis', 'Automated Docs'] },
]

const CERTIFICATIONS = [
  'Fundamentals of Business Analysis',
  'Intro to Data Science (Cisco)',
  'Python for Data Science (NPTEL)',
  'Cyber Job Simulation (Deloitte)',
  'Excel Skills (JPMorgan)',
  'English C1 (Cambridge)',
  'Full Stack Web (MRCET)',
  'Generative AI (IIT Hyderabad)',
]

const ACHIEVEMENTS = [
  {
    rank: '#162 · Global/National',
    desc: {
      en: 'NDIAS Automotive/IoT CTF — embedded & networked systems security.',
      jp: 'NDIAS Automotive/IoT CTF — 組み込みおよびネットワークシステムのセキュリティ。',
    },
  },
  {
    rank: '#941 · Global',
    desc: {
      en: 'picoCTF 2026 Team (Solus Data) — independent problem-solving under time pressure.',
      jp: 'picoCTF 2026 チーム (Solus Data) — 時間的制約下での自立した問題解決。',
    },
  },
]

const EDUCATION = [
  {
    when: '2023 — May 2027',
    school: 'JNTUH / Malla Reddy College of Engineering & Technology',
    place: {
      en: 'B.Tech, Computer Science — Cybersecurity Specialization · Hyderabad, India',
      jp: 'B.Tech 情報工学 — サイバーセキュリティ専攻 · インド ハイデラバード',
    },
    score: '8.58 CGPA',
  },
  {
    when: 'March 2023',
    school: 'Army Public School RK Puram',
    place: {
      en: 'Class XII · Secunderabad, India',
      jp: '第12学年 · インド セカンダラバード',
    },
    score: '93% / 9.3 GPA',
  },
]

// Bilingual strings for UI and Section Headers
const TRANSLATIONS = {
  role: { en: 'Aspiring Cybersecurity Analyst', jp: '志望サイバーセキュリティアナリスト' },
  
  aboutLabel: { en: 'about', jp: 'プロフィール' },
  aboutIndex: { en: '01 / profile', jp: '01 / プロフィール' },
  bio: {
    en: 'Undergraduate student specializing in threat analysis and data systems, building a versatile toolkit through hands-on code exploration.',
    jp: '脅威分析とデータシステムを専門とする学生。実践的なコード探求を通じて多様なスキルを構築中。',
  },
  goalLabel: { en: 'Goal', jp: '目標' },
  goalQuote: {
    en: 'Start my career in Japan and contribute to both Japanese and Indian tech ecosystems.',
    jp: '日本でキャリアをスタートし、日印双方の技術エコシステムに貢献したい。',
  },

  workLabel: { en: 'selected work', jp: '選ばれた作品' },
  workIndex: { en: '02 / projects', jp: '02 / プロジェクト' },

  expLabel: { en: 'experience', jp: '経歴' },
  expIndex: { en: '03 / roles', jp: '03 / 役割' },

  skillsLabel: { en: 'skills', jp: 'スキル' },
  skillsIndex: { en: '04 / stack', jp: '04 / スタック' },

  certLabel: { en: 'certifications', jp: '資格' },
  certIndex: { en: '05 / credentials', jp: '05 / 証明書' },

  achLabel: { en: 'achievements', jp: '実績' },
  achIndex: { en: '06 / competitions', jp: '06 / 競技' },
  achJailCtfDesc: {
    en: 'Solved AI-assisted security challenges spanning reverse engineering, OSINT, and payload construction.',
    jp: 'リバースエンジニアリング、OSINT、ペイロード構築にわたるAI支援のセキュリティ課題を解決。'
  },
  achGdgDesc: {
    en: 'Active in Google Developer Groups CTF collaboration and security workshops; completed intensive AI-mechanisms training at IIT Hyderabad. Contributor to the kana-dojo open-source repository.',
    jp: 'Google Developer GroupsのCTFコラボレーションやセキュリティワークショップに参加。IITハイデラバードでの集中的なAIメカニズムトレーニングを修了。kana-dojoオープンソースリポジトリのコントリビューター。'
  },

  eduLabel: { en: 'education', jp: '学歴' },
  eduIndex: { en: '07 / record', jp: '07 / 記録' },

  contactIndex: { en: '08 / get in touch', jp: '08 / お問い合わせ' },
  contactHeadline1: { en: "let's", jp: '繋がり' },
  contactHeadline2: { en: 'connect.', jp: 'ましょう。' },
  
  contactScan: { en: 'Scan / vCard', jp: 'スキャン / vCard' },
  formName: { en: 'Your name', jp: 'お名前' },
  formNamePlaceholder: { en: 'e.g. John Doe', jp: '例: 山田 太郎' },
  formEmail: { en: 'Your email', jp: 'メールアドレス' },
  formEmailPlaceholder: { en: 'hello@example.com', jp: 'hello@example.com' },
  formMessage: { en: 'Your message...', jp: 'メッセージ...' },
  formMessagePlaceholder: { en: 'How can we work together?', jp: 'どのように協力できますか？' },
  formCheckLabel: { en: "I'm interested in...", jp: '興味があるのは...' },
  formCheckHiring: { en: 'Hiring / Job opportunity', jp: '採用 / 求人について' },
  formCheckCollab: { en: 'Collaborating on a project', jp: 'プロジェクトでの共同作業' },
  formCheckGeneral: { en: 'Just saying hi / Simple contact', jp: '挨拶 / 一般的な問い合わせ' },
  formSubmit: { en: 'Send message ↗', jp: '送信 ↗' },
  langToggle: { en: '日本語', jp: 'English' },
}

// Splits strings and applies an upward stagger effect letter-by-letter
function AnimateText({ text, lang }) {
  if (typeof text !== 'string') return text;
  
  const tokens = text.split('');
  
  return (
    <span className="stagger-wrapper" key={lang}>
      {tokens.map((char, i) => (
        <span 
          key={i} 
          className="stagger-token" 
          style={{ animationDelay: `${Math.min(i * 0.015, 0.8)}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="nav-clock">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  )
}

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function useParallax(factor = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY * factor
          ref.current.style.transform = `translateY(${y}px)`
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [factor])

  return ref
}

function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  useLenis()
  const [active, setActive] = useState('work')
  const [lang, setLang] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [isQrZoomed, setIsQrZoomed] = useState(false)
  const refs = useRef({})
  const heroParallax = useParallax(0.12)
  const heroBgParallax = useParallax(0.05)

  const t = (key) => TRANSLATIONS[key][lang]
  const toggleLang = () => setLang((l) => (l === 'en' ? 'jp' : 'en'))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    Object.values(refs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (id) => (el) => {
    refs.current[id] = el
  }

  return (
    <div className="page">
      <div className="edge-label">prasad suryavanshi — portfolio — 2026</div>
      
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            <span className="dot" />
            {t('langToggle')}
          </button>
        </div>
        
        <div className="nav-center">
          <LiveClock />
        </div>
        
        <div className="nav-right">
          <div className="corner-label" key={active}>
            {active}
          </div>
        </div>
      </nav>

      <main className="content-wrapper">
        {/* HERO */}
        <header className="hero">
          <div className="hero-top">
            <span><AnimateText text={t('role')} lang={lang}/></span>
            <span>Hyderabad, India</span>
          </div>
          <div className="hero-mid">
            <h1 className="hero-name" ref={heroParallax}>
              prasad
              <br />
              suryavanshi<span className="accent">.</span>
            </h1>
          </div>
          <div className="hero-bottom" ref={heroBgParallax}>
            <div className="field">
              <span>Focus</span>
              Full-stack engineering & applied security
            </div>
            <div className="field">
              <span>Based</span>
              Hyderabad, India
            </div>
            <div className="field">
              <span>Languages</span>
              English (C1), Hindi, Marathi
            </div>
            <div className="field">
              <span>Status</span>
              B.Tech, expected 2027
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <section className="section about" id="about" data-id="about" ref={setRef('about')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('aboutLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('aboutIndex')} lang={lang}/></span>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-bio">
                <p><AnimateText text={t('bio')} lang={lang}/></p>
              </Reveal>
              <Reveal className="about-quote" delay={0.08}>
                <span className="goal-label"><AnimateText text={t('goalLabel')} lang={lang}/></span>
                <p className="quote">“<AnimateText text={t('goalQuote')} lang={lang}/>”</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className="section" id="work" data-id="work" ref={setRef('work')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('workLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('workIndex')} lang={lang}/></span>
            </Reveal>
            <div className="work-list">
              {PROJECTS.map((p, i) => (
                <Reveal as="article" className="work-item" key={p.name} delay={i * 0.08}>
                  <span className="year">{p.year}</span>
                  <div className="title-block">
                    <h3>{p.name}</h3>
                    <p><AnimateText text={p.desc[lang]} lang={lang}/></p>
                  </div>
                  <div className="stack">
                    {p.stack.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience" data-id="experience" ref={setRef('experience')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('expLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('expIndex')} lang={lang}/></span>
            </Reveal>
            <div>
              {EXPERIENCE.map((e, i) => (
                <Reveal as="article" className="exp-item" key={e.role} delay={i * 0.1}>
                  <span className="when">{e.when}</span>
                  <div>
                    <h3>{e.role}</h3>
                    <p className="org">{e.org}</p>
                    <ul>
                      {e.points.map((pt, idx) => (
                        <li key={idx}><AnimateText text={pt[lang]} lang={lang}/></li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills" data-id="skills" ref={setRef('skills')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('skillsLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('skillsIndex')} lang={lang}/></span>
            </Reveal>
            <div className="skills-grid">
              {SKILLS.map((col, i) => (
                <Reveal className="skills-col" key={col.title.en} delay={i * 0.06}>
                  <h4><AnimateText text={col.title[lang]} lang={lang}/></h4>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section" id="certifications" data-id="certifications" ref={setRef('certifications')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('certLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('certIndex')} lang={lang}/></span>
            </Reveal>
            <div className="cert-list">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal as="span" className="cert-tag" key={c} delay={i * 0.04}>
                  {c}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section
          className="section achievements"
          id="achievements"
          data-id="achievements"
          ref={setRef('achievements')}
        >
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('achLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('achIndex')} lang={lang}/></span>
            </Reveal>
            <Reveal className="stat-lead">
              <div className="stat-number">62</div>
              <div className="stat-copy">
                <p>jailCTF 2026 · Ranked Globally</p>
                <p><AnimateText text={t('achJailCtfDesc')} lang={lang}/></p>
              </div>
            </Reveal>
            <div className="ach-list">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal className="ach-item" key={a.desc.en} delay={i * 0.08}>
                  <div className="rank">{a.rank}</div>
                  <p><AnimateText text={a.desc[lang]} lang={lang}/></p>
                </Reveal>
              ))}
              <Reveal className="ach-item" delay={ACHIEVEMENTS.length * 0.08}>
                <div className="rank">GDG · IIT-H AI Workshop</div>
                <p><AnimateText text={t('achGdgDesc')} lang={lang}/></p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" id="education" data-id="education" ref={setRef('education')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <h2 className="section-title"><AnimateText text={t('eduLabel')} lang={lang}/></h2>
              <span className="section-index"><AnimateText text={t('eduIndex')} lang={lang}/></span>
            </Reveal>
            <div>
              {EDUCATION.map((e, i) => (
                <Reveal className="edu-item" key={e.school} delay={i * 0.08}>
                  <span className="when">{e.when}</span>
                  <div>
                    <h3>{e.school}</h3>
                    <p className="place"><AnimateText text={e.place[lang]} lang={lang}/></p>
                  </div>
                  <span className="score">{e.score}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact" data-id="contact" ref={setRef('contact')}>
          <div className="section-inner">
            <Reveal className="section-head">
              <span className="section-index"><AnimateText text={t('contactIndex')} lang={lang}/></span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="contact-headline">
                <AnimateText text={t('contactHeadline1')} lang={lang}/>
                <br />
                <span className="accent"><AnimateText text={t('contactHeadline2')} lang={lang}/></span>
              </h2>
            </Reveal>

            {/* NEW 2-COLUMN LAYOUT: Info/QR on Left, Form on Right */}
            <div className="contact-layout">
              <Reveal className="contact-info" delay={0.1}>
                <div className="field">
                  <span className="field-label">Email</span>
                  <p>prasadsuryavanshi [dot] 110306 [at] gmail [dot] com</p>
                </div>
                <div className="field">
                  <span className="field-label">Elsewhere</span>
                  <p>
                    <a href="https://github.com/Prasad3Suryavanshi" target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                    {' · '}
                    <a href="https://in.linkedin.com/in/prasad-suryavanshi" target="_blank" rel="noreferrer">
                      LinkedIn ↗
                    </a>
                  </p>
                </div>
                <div className="field">
                  <span className="field-label"><AnimateText text={t('contactScan')} lang={lang}/></span>
                  <img 
                    src="/qr.jpeg" 
                    alt="vCard QR Code" 
                    className="qr-code" 
                    onClick={() => setIsQrZoomed(true)} 
                  />
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <form className="contact-form" action="https://getform.io/f/adrgpdoa" method="POST">
                  <div className="form-row">
                    <label>
                      <span className="input-title"><AnimateText text={t('formName')} lang={lang}/></span>
                      <input type="text" name="name" placeholder={t('formNamePlaceholder')} required />
                    </label>
                    <label>
                      <span className="input-title"><AnimateText text={t('formEmail')} lang={lang}/></span>
                      <input type="email" name="email" placeholder={t('formEmailPlaceholder')} required />
                    </label>
                  </div>
                  <label>
                    <span className="input-title"><AnimateText text={t('formMessage')} lang={lang}/></span>
                    <textarea name="message" rows="4" placeholder={t('formMessagePlaceholder')} required />
                  </label>
                  
                  <div className="radio-group">
                    <span className="radio-group-label"><AnimateText text={t('formCheckLabel')} lang={lang}/></span>
                    <div className="radio-options">
                      <label className="radio-label">
                        <input type="radio" name="inquiry_type" value="hiring" required />
                        <span className="radio-text"><AnimateText text={t('formCheckHiring')} lang={lang}/></span>
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="inquiry_type" value="collab" />
                        <span className="radio-text"><AnimateText text={t('formCheckCollab')} lang={lang}/></span>
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="inquiry_type" value="general" />
                        <span className="radio-text"><AnimateText text={t('formCheckGeneral')} lang={lang}/></span>
                      </label>
                    </div>
                  </div>

                  <button type="submit"><AnimateText text={t('formSubmit')} lang={lang}/></button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        <footer>© 2026 Prasad Suryavanshi</footer>
      </main>

      {/* Conditionally render the zoomed QR code overlay */}
      {isQrZoomed && (
        <div className="qr-overlay" onClick={() => setIsQrZoomed(false)}>
          <img src="public/qr.jpeg" alt="Enlarged QR Code" />
          <span className="close-instruction">Click anywhere to close</span>
        </div>
      )}
    </div>
  )
}
