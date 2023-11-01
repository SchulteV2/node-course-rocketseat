import { GymAlreadyExistsError } from '@/use-cases/errors/gym-already-exists-error'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { name, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
      name,
      description,
      phone,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof GymAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
