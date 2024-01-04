## Deploy in Koyeb

- Auth

      ### login

      - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/auth/login
            Contoh:
            {
            "email": "string",
            "password": "string"
            }

      ### forget password

      - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/auth/forget-password
            Contoh:
            {
            "email": "string"
            }

- Admin

      ### Register Admin

      - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/admin

      ### Get 1 admin

      - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/admin

      ### Update 1 admin

      - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/admin

      ### Delete 1 admin

      - [x] DELETE https://bank-system-poxzy.koyeb.app/api/v2/admin
            {
            "email": "string"
            }

      ### Get all user

      - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/admin/get-user

      ### Update 1 user

      - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/admin/update-user/:id

      ### Delete 1 user

      - [x] DELETE https://bank-system-poxzy.koyeb.app/api/v2/admin/delete-user/:id

- User

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

# Dokumentasi in koyeb

https://bank-system-poxzy.koyeb.app/
