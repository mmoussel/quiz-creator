import { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component />
    </Suspense>
  )

const Quizzes = loadable(lazy(() => import('../pages/quizzes/quizzes.page')))
const CreateQuiz = loadable(lazy(() => import('../pages/quizzes/create-quiz.page')))
const EditQuiz = loadable(lazy(() => import('../pages/quizzes/edit-quiz.page')))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/quizzes'} />,
  },
  {
    path: '/quizzes',
    children: [
      {
        index: true,
        element: <Quizzes />,
      },
      {
        path: 'create-quiz',
        element: <CreateQuiz />,
      },
      {
        path: 'edit-quiz/:id',
        element: <EditQuiz />,
      },
    ],
  },
]
