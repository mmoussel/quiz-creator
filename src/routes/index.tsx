import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

const loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component />
    </Suspense>
  )

const Home = loadable(lazy(() => import('../pages/home.page')))

const CreateQuiz = loadable(lazy(() => import('../pages/quizzes/create-quiz.page')))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quizzes',
    children: [
      {
        path: 'create-quiz',
        element: <CreateQuiz />,
      },
    ],
  },
]
