const request = require("supertest");
const app = require("../app");
const { Photo, User } = require("../models");
const { createUser, generateTokenTest, createPhoto } = require("./testUtils");

const dataPhoto = {
    title: "photo 1",
    caption: "Ini adalah photo 1",
    image_url: "/photo/1.jpg"
};


let token;

describe("POST /photos", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTest(user);
    });
    it('should create photo success', (done) => {
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set({ Authorization: token })
            .expect(201)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body).toHaveProperty("UserId");
                expect(res.body).toHaveProperty("image_url");
                done();
            });
    });

    it('should be error no auth', (done) => {
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set({ Authorization: '' })
            .expect(401)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Token not provided!');
                done();
            });
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});

// get All photo
describe("GET /photos", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTest(user);
        await createPhoto("photo 1", user.id, 1);
        await createPhoto("photo 2", user.id, 2);
    });
    it('should be get photo success', (done) => {
        request(app)
            .get('/photos')
            .set({ Authorization: token })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toHaveLength(2);
                expect(res.body[0]).toHaveProperty("User");
                expect(res.body[0]).toHaveProperty("UserId");
                expect(res.body[0]).toHaveProperty("title");
                expect(res.body[0]).toHaveProperty("image_url");
                done();
            });
    });

    it('should be error no auth', (done) => {
        request(app)
            .post('/photos')
            .set({ Authorization: '' })
            .expect(401)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Token not provided!');

                console.log(res.body);
                done();
            });


    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});


// get Photo by id
describe("GET /photos/:id", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTest(user);
        await createPhoto("photo 1", user.id, 1);
        await createPhoto("photo 2", user.id, 2);
    });
    it('should be get photo success', (done) => {
        request(app)
            .get('/photos/1')
            .set({ Authorization: token })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.title).toBe("photo 1");
                expect(res.body).toHaveProperty("UserId");
                expect(res.body).toHaveProperty("image_url");
                done();
            });
    });

    it('should be not found', (done) => {
        request(app)
            .get('/photos/4')
            .set({ Authorization: token })
            .expect(404)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Data not found!');
                done();
            });
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});