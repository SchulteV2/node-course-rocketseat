import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const response = await request(app.server).post('/gyms').send({
      name: 'gym-01',
      description: 'gym-01-test',
      phone: '49999999',
      latitude: -16.087382,
      longitude: -5.712891,
    })
    expect(response.statusCode).toEqual(201)
  })
})
