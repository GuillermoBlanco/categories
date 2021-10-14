const request = require('supertest');

let app;

beforeEach(() => {
  jest.isolateModules(() => {
    app = require('./app');
  });
});

afterAll(async () => {
  await request(app).delete('/categories');
});

test('serves categories persisted at DB volumes', async () => {
  const response = await request(app).get('/categories');

  expect(response.statusCode).toEqual(200);
  expect(response.body).toEqual([]);
});

test('stores and serves new categories', async () => { 
  const theFancyCategory = {
    name: "My new category",
    parentId: 1
  };

  const postResponse = await request(app).post('/categories').send(theFancyCategory);
    
  expect(postResponse.statusCode).toEqual(200);
  expect(postResponse.body).toEqual(
    expect.objectContaining(theFancyCategory)
  );

  const getAllResponse = await request(app).get('/categories');

  expect(getAllResponse.body).toEqual(expect.arrayContaining([
    expect.objectContaining(theFancyCategory)
  ]));
});

test('updates existing categories', async () => { 
  const theUpdatedCategory = {
    name: "My updated category",
    parentId: 1000
  };

  const { body: [ category ]} = await request(app).get('/categories');

  expect(category).toEqual(expect.objectContaining({ id: expect.any(Number) }));
    
  const postResponse = await request(app).put(`/categories/${category.id}`).send(theUpdatedCategory);
  expect(postResponse.statusCode).toEqual(200);
  expect(postResponse.body).toEqual(
    expect.objectContaining(theUpdatedCategory)
    );
    
  const getResponse = await request(app).get(`/categories/${category.id}`);
  expect(getResponse.body).toEqual(
    expect.objectContaining(theUpdatedCategory)
  );
});

test('removes an existing category', async () => { 
  const postResponse = await request(app).delete('/categories');
    
  expect(postResponse.statusCode).toEqual(200);
  expect(postResponse.body).toEqual({message: "All Categories were deleted successfully!"});

  const getAllResponse = await request(app).get('/categories');

  expect(getAllResponse.body).toEqual([]);
});

test('clears ALL categories', async () => { 
  const postResponse = await request(app).delete('/categories');
    
  expect(postResponse.statusCode).toEqual(200);
  expect(postResponse.body).toEqual({message: "All Categories were deleted successfully!"});

  const getAllResponse = await request(app).get('/categories');

  expect(getAllResponse.body).toEqual([]);
});
