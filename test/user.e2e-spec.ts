import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let db: DataSource;

  beforeEach(async () => {
    await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  });

  
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    db = moduleFixture.get(DataSource);

    // Optional: seed a user for testing
    await db.getRepository('User').save({
      username: 'testuser',
      password: 'testpass',
      fullname: 'Test User',
      email: 'test@example.com',
      role: 'Buyer',
      isActive: false,
      isDeleted: false,
    });
  });

  afterAll(async () => {
    await db.getRepository('User').delete({ username: 'testuser' });
    await app.close();
  });

  describe('/user (GET)', () => {
    it('should return list of users', async () => {
      // Seed the DB first
      const userPayload = {
        username: 'testuser',
        fullname: 'Test User',
        password: 'password123',
        email: 'test@example.com',
        role: 'Buyer',
      };
  
      await request(app.getHttpServer())
        .post('/users')
        .send(userPayload)
        .expect(201);
  
      // Then test the GET endpoint
      const res = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
  
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toMatchObject({
        username: 'testuser',
        fullname: 'Test User',
        email: 'test@example.com',
        role: 'Buyer',
      });
    });
  });

  it('/users (POST) should create a user', async () => {
    const createUserDto = {
      username: 'e2euser',
      fullname: 'E2E Test User',
      password: 'strongpass123',
      email: 'e2euser@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toMatchObject({
      username: 'e2euser',
      fullname: 'E2E Test User',
      email: 'e2euser@example.com',
      isActive: false,
    });

    expect(response.body).not.toHaveProperty('password');
  });

  it('/users (POST) should return 409 if username already exists', async () => {
    const userData = {
      username: 'existinguser',
      fullname: 'Existing User',
      password: 'password123',
      email: 'existing@example.com',
      role: 'Buyer',
    };
  
    // First request to create the user
    await request(app.getHttpServer()).post('/users').send(userData).expect(201);
  
    // Second request should fail
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(409);
  
    expect(res.body.message).toEqual('User already exists');
  });
  
  it('should hash the password before saving to database', async () => {
    const userData = {
      username: 'hashuser',
      fullname: 'Hash Password',
      password: 'mysecret123',
      email: 'hash@example.com',
      role: 'Buyer',
    };
  
    await request(app.getHttpServer()).post('/users').send(userData).expect(201);
  
    const user = await db.getRepository('User').findOneBy({ username: 'hashuser' });
  
    expect(user).toBeDefined();
    expect(user.password).not.toBe(userData.password);
    expect(user.password.length).toBeGreaterThanOrEqual(60); // bcrypt hash length
  });
  
});
