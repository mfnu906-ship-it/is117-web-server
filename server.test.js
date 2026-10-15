const app = require("../index");

let server;
let baseUrl;

beforeAll((done) => {
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

test("home page returns the correct message", async () => {
  const response = await fetch(`${baseUrl}/`);
  const body = await response.text();

  expect(response.status).toBe(200);
  expect(body).toBe("Hello, IS117! Your web server is working.");
});

test("about page returns the correct message", async () => {
  const response = await fetch(`${baseUrl}/about`);
  const body = await response.text();

  expect(response.status).toBe(200);
  expect(body).toBe("A web server receives a request and sends a response.");
});

test("missing page returns a 404 response", async () => {
  const response = await fetch(`${baseUrl}/missing-page`);
  const body = await response.text();

  expect(response.status).toBe(404);
  expect(body).toBe("Page not found.");
});