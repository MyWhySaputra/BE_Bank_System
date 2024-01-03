## Deploy in Railway

-   Auth

        ### register account

        - [x] POST https://cdp-mock-test-production-ddce.up.railway.app/api/v1/auth/register
              Contoh:
              {
              "name": "nama",
              "email": "email@mail.com",
              "username": "nama22",
              "password": "password231",
              "pin": "123456"
              }

        ### login

        - [x] POST https://cdp-mock-test-production-ddce.up.railway.app/api/v1/auth/login
              Contoh:
              {
              "emailOrUsername": "email@mail.com",
              "pin": "123456"
              }

        ### reset pin

        - [x] PUT https://cdp-mock-test-production-ddce.up.railway.app/api/v1/auth/forget-pin
              Contoh:
              {
              "emailOrUsername": "email@mail.com",
              "password": "password231",
              "newPin": "123456"
              }

        ### forget password

        - [x] POST https://cdp-mock-test-production-ddce.up.railway.app/api/v1/auth/forget-password
              Contoh:
              {
              "emailOrUsername": "email@mail.com"
              }

        ### reset password

        - [x] PUT https://cdp-mock-test-production-ddce.up.railway.app/api/v1/auth/reset-password
              Contoh:
              {
              "token": "string",
              "newPassword": "passnew22"
              }

-   User

        ### Create task

        - [x] POST https://cdp-mock-test-production-ddce.up.railway.app/api/v1/user/create
              Contoh:
              {
              "title": "title"
              }

        ### Get task

        - [x] GET https://cdp-mock-test-production-ddce.up.railway.app/api/v1/user

        ### UpdateTitle

        - [x] PUT https://cdp-mock-test-production-ddce.up.railway.app/api/v1/user/updateTitle
              Contoh:
              {
              "title": "title",
              "id": 1
              }

        ### UpdateStatus

        - [x] PUT https://cdp-mock-test-production-ddce.up.railway.app/api/v1/user/updateStatus
              Contoh:
              {
              "id": 1
              }

        ### Delete

        - [x] DELETE https://cdp-mock-test-production-ddce.up.railway.app/api/v1/user/delete
              Contoh:
              {
              "id": 1
              }

# Dokumentasi Swagger

https://bank-system-poxzy.koyeb.app/