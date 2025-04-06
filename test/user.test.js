import axios from 'axios';
import { expect } from 'chai';

const BASE_URL = 'http://localhost:8000/api/users';

describe('User API Tests', () => {
  let createdUserId;

  it('should fetch all users', async () => {
    const res = await axios.get(BASE_URL);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('array');
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      age: 25,
    };

    const res = await axios.post(BASE_URL, newUser);
    expect(res.status).to.equal(201);
    expect(res.data).to.have.property('id');
    expect(res.data.name).to.equal(newUser.name);
    createdUserId = res.data.id;
  });

  it('should fetch the newly created user by ID', async () => {
    const res = await axios.get(`${BASE_URL}/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.data).to.have.property('id').that.equals(createdUserId);
  });

  it('should update the user', async () => {
    const updatedData = {
      name: 'Updated User Name',
      age: 30
    };
    

    const res = await axios.put(`${BASE_URL}/${createdUserId}`, updatedData);
    expect(res.status).to.equal(200);
    expect(res.data.name).to.equal(updatedData.name);
  });

  it('should delete the user', async () => {
    const res = await axios.delete(`${BASE_URL}/${createdUserId}`);
    expect(res.status).to.equal(204);

    // Cek kalau user udah dihapus
    try {
      await axios.get(`${BASE_URL}/${createdUserId}`);
    } catch (err) {
      expect(err.response.status).to.equal(404);
    }
  });
});
