import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'DS4All — Data Science 4 All',
      },
      {
        name: 'description',
        content:
          'DS4All is a gamified tech career tycoon simulator that teaches Data Science, SQL, Cybersecurity, and Software Engineering.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#0a0e0c] text-emerald-50">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
