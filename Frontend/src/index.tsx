import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

// Importer les composants de page
import { HomePage } from './pages/home'
import { ServiceSelectionPage } from './pages/service-selection'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/register'
import { DashboardPage } from './pages/dashboard'
import { ChatPage } from './pages/chat'
import { AnalysePage } from './pages/analyse'
import { GenerationPage } from './pages/generation'
import { NonConformitesPage } from './pages/non-conformites'
import { BibliothequePage } from './pages/bibliotheque'
import { CollaborationPage } from './pages/collaboration'
import { AdministrationPage } from './pages/administration'
import { ProfilPage } from './pages/profil'

const app = new Hono()

// Middleware
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public', manifest: './public/manifest.json' }))
app.use(renderer)

// Routes des pages
app.get('/', (c) => {
  return c.render(<HomePage />)
})

app.get('/home', (c) => {
  return c.render(<HomePage />)
})

app.get('/service-selection', (c) => {
  return c.render(<ServiceSelectionPage />)
})

app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

app.get('/register', (c) => {
  return c.render(<RegisterPage />)
})

app.get('/dashboard', (c) => {
  return c.render(<DashboardPage />)
})

app.get('/chat', (c) => {
  return c.render(<ChatPage />)
})

app.get('/analyse', (c) => {
  return c.render(<AnalysePage />)
})

app.get('/generation', (c) => {
  return c.render(<GenerationPage />)
})

app.get('/non-conformites', (c) => {
  return c.render(<NonConformitesPage />)
})

app.get('/bibliotheque', (c) => {
  return c.render(<BibliothequePage />)
})

app.get('/collaboration', (c) => {
  return c.render(<CollaborationPage />)
})

app.get('/administration', (c) => {
  return c.render(<AdministrationPage />)
})

app.get('/profil', (c) => {
  return c.render(<ProfilPage />)
})

// API Routes pour le Chat Bot
app.post('/api/chat/send', async (c) => {
  try {
    const { message } = await c.req.json()

    // Simulation de réponse (en production, appeler GPT-4, Claude, etc.)
    const response = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Réponse du bot à : "${message}"`,
      timestamp: new Date().toISOString()
    }

    return c.json(response)
  } catch (error) {
    return c.json({ error: 'Erreur lors de l\'envoi du message' }, 500)
  }
})

// API Routes pour l'analyse de conformité
app.post('/api/analyse/upload', async (c) => {
  try {
    // En production, traiter le fichier uploadé
    const body = await c.req.parseBody()

    return c.json({
      success: true,
      message: 'Document reçu pour analyse',
      analysisId: Date.now().toString()
    })
  } catch (error) {
    return c.json({ error: 'Erreur lors de l\'upload' }, 500)
  }
})

// API Routes pour la génération de documents
app.post('/api/generation/generate', async (c) => {
  try {
    const params = await c.req.json()

    // En production, générer le document via IA
    const document = {
      id: Date.now().toString(),
      type: params.documentType,
      content: 'Document généré...',
      createdAt: new Date().toISOString()
    }

    return c.json(document)
  } catch (error) {
    return c.json({ error: 'Erreur lors de la génération' }, 500)
  }
})

// Route de test
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'API is running' })
})

export default app
