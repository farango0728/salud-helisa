const request1 = require('request');

describe('MedicalAppointments test', () => {
  it('Method Get medicalAppointments', (done) => {
    request1(
      {
        method: 'GET',
        url: 'http://localhost:9000/api/medicalAppointments',
      },
      function (err, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      },
    );
  });
});
