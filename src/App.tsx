import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

function App() {
  const clinte = useRoutes(routes)
  return <div>{clinte}</div>
}

export default App
