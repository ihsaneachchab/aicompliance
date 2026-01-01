import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IA Conformité - Solution intelligente de gestion qualité</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#3B82F6',
                    secondary: '#10B981',
                    danger: '#EF4444',
                    warning: '#F59E0B',
                    info: '#06B6D4',
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-gray-50">
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
