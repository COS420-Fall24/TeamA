const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "teama-4383c",
  private_key_id: "b2f07ac1ea04aad22ee10aad3b9707c1991fac1e" ,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTLlnImK6qS+0m\n0+sTE6oBdqPRrWoFwk1f1BPc9Sc/OdHyHbXZKwTPcPWc5krovqMkl96vQOIc1Y1N\nFqWCKjil7nN4DmReCf/ioNdRaSPVZLD+25Z0KnL3juq6uwh2AxzK1Kd4AMtyPtOx\n3jWERizpa0GS0tXjUVMf1iK6Gxm1txQRq/KTzi8tbVVmtmMCg3q/0XxkVnqStqTZ\nzQdrpVRgsqFhbduI+TVjeFlXhObdfuKMP5l5FB3XqJ+gXTaT6aoJ8xoaan/gz3j4\nRakokeJKHV7Gd4ghk8PxnQFbSfxpAKarPJRQu7XXI3fw73o7+onNEmwajzxt5Fc9\nqBU6NPxjAgMBAAECggEAED3kwqkx6P/euDldDDvBu+V6z/a9Mr6XSNZJkmYTo9wE\nkGrfwFlIpqB5CdCROx+xi6NXVk89Lk6Jh/MRigmvqNz5nUz63Y8TUqpgJQjBeSxw\n8gj3Coda2qNWD92wPUzox/v2+iNfG+UTgjIlSr92JAJ1w2va7pkjzxnSOrhrqWGZ\nfXuCHT1IT62p9SIgQgSqUKPgQzLvLBgbxuYbhCzthJ//AbtnYyMzIK29kzMqPtB8\nb1lP3MpIETlbEGaHTPKuMOjFJht6gWwM2OseXoxzqq8TJPGW2u1Zbk0FULbEinT7\nAJ1yYxtY3hLlnwf2RRmJYXP9RXv6TDpoQ7f3W+/XgQKBgQDsgbLxTr2txhaELXzQ\nn/TMWyVRdXO15Ke4jLj2FF1Md1+RzKPWW4FVgijzQx2j88aFGtuPs5eNnRhx9hd9\nNG8jFpHIXLJFoJaip+zX38DHsnU266O08Qb0tSwe5xtONSwxjERrlnxBKU8VAlTQ\nW+lC3F+ikKId6Ijp7/amCib8YQKBgQDklkfkPbhwVIclmGuznUjB6VNH2VSzdfZO\nibog8w+hHZn7XEUZBN4hjA+3S5rFGRR0SUzWPskCTpqGWy7iS5xV+D9t9LP9tFwc\nsx/TvT7w04fXhmXtKu62tlqOgH1SAgT6mKinJS8FhRFURIVOdgIeDhtq7y2NRcDH\nLKXXFn9PQwKBgQDN1ug2CzEc4C3SpoBeVwlJHv7w0cd+hN7QyXFlgz3cgnzkOXZS\n51s+X8ViS4StoEqkqEZ14HnD3/lZnjS9XPhpUohZGQxzexv/vyVskSqI47IOtbHK\nlohWTKR01PG39KFdElauSNAmKlzQzTGiEoyHC6QUqcrfOvaGnLpPssBRoQKBgF1q\nqSC2tIx7juunWcSCr7xHfXhscfgRakJ4eK+EhcujTE10TOzHl3wAQF/5LtwDvt8z\nIYqhCAbAVtg3pXZnzhE4Lbvi+DfjoI0+CvC+c116JRbIXxlIpVvYNDPugMil+KDt\nCGeeg5Pu6MEWa6BAC+d6fmv6KRSGAB2lunSnRgn/AoGAJgLpRv8na7JtN5xRXFk+\nd4ePDdkI4RR2OSgWEO+p64iQNZv+Vy150c1TsjTLHwWnskwQnaqbSWyl+bugQBTn\nkU2UzVR09ekEqNHDMtnBwtdEWoZspkMzuAEhuFxUrfDeLdsKIRLgDNKyhn+n7F3a\nUuW6FtqXR/tO3g3qgsj9Iw4=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-rof3r@teama-4383c.iam.gserviceaccount.com",
  client_id: "100784380467805627674",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rof3r%40teama-4383c.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teama-4383c-default-rtdb.firebaseio.com/"
});

module.exports = admin;