import { FastifyInstance } from 'fastify'
import { createGym } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createGym)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
