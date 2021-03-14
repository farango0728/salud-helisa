const request = require('request');

describe('Doctors test', () => {
  it('Method Get Doctors retornando data desde BD', (done) => {
    request(
      {
        method: 'GET',
        url: 'http://localhost:9000/api/doctors',
      },
      function (err, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      },
    );
  });

  it('Method POST Doctor json con data buena data para crear', (done) => {
    request(
      {
        method: 'POST',
        url: 'http://localhost:9000/api/doctor',
        json: {
          identification: 201,
          name: 'Vivian Arango',
          cardNumber: 'QQQ-45228',
          idSpecialty: 101012,
          state: true,
        },
      },
      function (err, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body.message).toBe('Los datos del Medico se crearon');
        done();
      },
    );
  });

  it('Method POST Doctor json con claves malas para validar', (done) => {
    request(
      {
        method: 'POST',
        url: 'http://localhost:9000/api/doctor',
        json: {
          identification1: 1014,
          name1: 'Vivian Arango',
          cardNumber1: 'QQQ-45228',
          idSpecialty1: 101012,
          state1: true,
        },
      },
      function (err, response, body) {
        expect(body.statusCode).toBe(400);
        expect(body).toBeInstanceOf(Object);
        done();
      },
    );
  });
});
