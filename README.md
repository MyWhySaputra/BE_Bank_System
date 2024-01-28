# REST API Bank System

## Install

    npm install

## Run the app

    npm run dev

## Deploy in Koyeb

    https://bank-system-poxzy.koyeb.app/

## Documentation in swagger

    https://bank-system-poxzy.koyeb.app/docs

# ERD

![Tux, the Linux](/ERD.png)

# REST API

This is a Banking system API. It's a simple REST API. You can use it to create, read, update, and delete.

## Create Admin

### Request

`POST /api/v2/auth/register`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/auth/register' \
      -H 'accept: */*' \
      -H 'Content-Type: multipart/form-data' \
      -F 'name=Wahyu' \
      -F 'email=wahyusaputra220300@gmail.com' \
      -F 'password=wahyu123' \
      -F 'role=ADMIN' \
      -F 'profile_picture=@profile 3x3.jpg;type=image/jpeg' \
      -F 'identity_type=KTP' \
      -F 'identity_number=12345678901234' \
      -F 'address=Jakarta'

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "12345678901234",
            "address": "Jakarta"
          }
        ],
        "createAt": "2024-01-28T13:57:15.421Z",
        "updateAt": "2024-01-28T13:57:15.421Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Login

### Request

`POST /api/v2/auth/login`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/auth/login' \
      -H 'accept: */*' \
      -H 'Content-Type: application/json' \
      -d '{
      "email": "wahyusaputra220300@gmail.com",
      "password": "whx12345"
    }'

### Response

    {
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Forget password

### Request

`POST /api/v2/auth/forget-password`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/auth/forget-password' \
      -H 'accept: */*' \
      -H 'Content-Type: application/json' \
      -d '{
      "email": "wahyusaputra220300@gmail.com"
    }'

### Response

    {
      "data": null,
      "message": "success, please check your email",
      "error": null,
      "status": 200
    }

## Get your id

### Request

`GET /api/v2/users`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/users' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "12345678901234",
            "address": "Jakarta"
          }
        ],
        "createAt": "2024-01-28T13:57:15.421Z",
        "updateAt": "2024-01-28T13:59:37.132Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Update your id

### Request

`PUT /api/v2/users`

    curl -X 'PUT' \
      'http://localhost:8080/api/v2/users' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: multipart/form-data' \
      -F 'name=' \
      -F 'email=' \
      -F 'password=' \
      -F 'profile_picture=' \
      -F 'identity_type=' \
      -F 'identity_number=01234567891234' \
      -F 'address='

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "01234567891234",
            "address": "Jakarta"
          }
        ],
        "createAt": "2024-01-28T13:57:15.421Z",
        "updateAt": "2024-01-28T13:59:37.132Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Delete your id

### Request

`DELETE /api/v2/users`

    curl -X 'DELETE' \
      'http://localhost:8080/api/v2/users' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com_17064519993531yk8a",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "01234567891234",
            "address": "Jakarta"
          }
        ],
        "deletedAt": "2024-01-28T14:26:39.377Z"
      },
      "message": "data successfully deleted",
      "error": null,
      "status": 200
    }

## Get all User (Admin only)

### Request

`GET /api/v2/users/admin`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/users/admin' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "current_page": 1,
        "total_page": 1,
        "total_data": 1,
        "data": [
          {
            "id": 2,
            "name": "Wahyu",
            "email": "wahyusaputra220300@gmail.com",
            "profile": [
              {
                "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
                "identity_type": "KTP",
                "identity_number": "01234567891234",
                "address": "Jakarta"
              }
            ],
            "createAt": "2024-01-28T13:57:15.421Z",
            "updateAt": "2024-01-28T14:26:39.381Z"
          }
        ]
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Update User (Admin only)

### Request

`PUT /api/v2/users/admin/:id`

    curl -X 'PUT' \
      'http://localhost:8080/api/v2/users/admin/2' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: multipart/form-data' \
      -F 'name=' \
      -F 'email=' \
      -F 'password=' \
      -F 'profile_picture=' \
      -F 'identity_type=' \
      -F 'identity_number=12345678912340' \
      -F 'address='

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "12345678912340",
            "address": "Jakarta"
          }
        ],
        "createAt": "2024-01-28T13:57:15.421Z",
        "updateAt": "2024-01-28T14:26:39.381Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Delete User (Admin only)

### Request

`DELETE /api/v2/users/admin/:id`

    curl -X 'DELETE' \
      'http://localhost:8080/api/v2/users/admin/2' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 2,
        "name": "Wahyu",
        "email": "wahyusaputra220300@gmail.com_1706452521896od7cmb",
        "profile": [
          {
            "profile_picture": "https://ik.imagekit.io/3cqkxz6ek/profile_3x3_bdrRV1Dgz.jpg",
            "identity_type": "KTP",
            "identity_number": "12345678912340",
            "address": "Jakarta"
          }
        ],
        "deletedAt": "2024-01-28T14:35:21.923Z"
      },
      "message": "data successfully deleted",
      "error": null,
      "status": 200
    }

## Insert your bank account

### Request

`POST /api/v2/bank_accounts`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/bank_accounts' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "bank_name": "BCA",
      "bank_account_number": "1234567890",
      "balance": 500000
    }'

### Response

    {
      "data": {
        "id": 4,
        "bank_name": "BCA",
        "bank_account_number": "1234567890",
        "balance": 500000,
        "createAt": "2024-01-28T14:42:59.264Z",
        "updateAt": "2024-01-28T14:42:59.264Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Get your bank account

### Request

`GET /api/v2/bank_accounts`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/bank_accounts' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "current_page": 1,
        "total_page": 1,
        "total_data": 2,
        "data": [
          {
            "id": 4,
            "bank_name": "BCA",
            "bank_account_number": "1234567890",
            "balance": 500000,
            "user": {
              "name": "Wahyu",
              "email": "wahyusaputra220300@gmail.com",
              "profile": [
                {
                  "identity_type": "KTP",
                  "identity_number": "12345678912340",
                  "address": "Jakarta"
                }
              ]
            },
            "createAt": "2024-01-28T14:42:59.264Z",
            "updateAt": "2024-01-28T14:42:59.264Z"
          },
          {
            "id": 5,
            "bank_name": "BNI",
            "bank_account_number": "1234567891",
            "balance": 400000,
            "user": {
              "name": "Wahyu",
              "email": "wahyusaputra220300@gmail.com",
              "profile": [
                {
                  "identity_type": "KTP",
                  "identity_number": "12345678912340",
                  "address": "Jakarta"
                }
              ]
            },
            "createAt": "2024-01-28T14:44:26.008Z",
            "updateAt": "2024-01-28T14:44:26.008Z"
          }
        ]
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Update your bank account

### Request

`PUT /api/v2/bank_accounts/:id`

    curl -X 'PUT' \
      'http://localhost:8080/api/v2/bank_accounts/4' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "balance": 500000
    }'

### Response

    {
      "data": {
        "id": 4,
        "bank_name": "BCA",
        "bank_account_number": "1234567890",
        "balance": 500000,
        "createAt": "2024-01-28T14:42:59.264Z",
        "updateAt": "2024-01-28T14:47:27.213Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Delete your bank account

### Request

`DELETE /api/v2/bank_accounts/:id`

    curl -X 'DELETE' \
      'http://localhost:8080/api/v2/bank_accounts/5' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 5,
        "bank_name": "BNI",
        "bank_account_number": "1234567891",
        "balance": 400000,
        "deletedAt": "2024-01-28T14:50:03.434Z"
      },
      "message": "success, data deleted",
      "error": null,
      "status": 200
    }

## Insert bank account (Admin only)

### Request

`POST /api/v2/bank_accounts/admin`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/bank_accounts/admin' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "user_id": 2,
      "bank_name": "BNI",
      "bank_account_number": "1234567893",
      "balance": 500000
    }'

### Response

    {
      "data": {
        "id": 6,
        "user_id": 2,
        "bank_name": "BNI",
        "bank_account_number": "1234567893",
        "balance": 500000,
        "createAt": "2024-01-28T14:52:19.997Z",
        "updateAt": "2024-01-28T14:52:19.997Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Get bank account (Admin only)

### Request

`GET /api/v2/bank_accounts/admin`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/bank_accounts/admin' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "current_page": 1,
        "total_page": 1,
        "total_data": 2,
        "data": [
          {
            "id": 4,
            "user_id": 2,
            "bank_name": "BCA",
            "bank_account_number": "1234567890",
            "balance": 500000,
            "user": {
              "name": "Wahyu",
              "email": "wahyusaputra220300@gmail.com",
              "profile": [
                {
                  "identity_type": "KTP",
                  "identity_number": "12345678912340",
                  "address": "Jakarta"
                }
              ]
            },
            "createAt": "2024-01-28T14:42:59.264Z",
            "updateAt": "2024-01-28T14:47:27.213Z"
          },
          {
            "id": 6,
            "user_id": 2,
            "bank_name": "BNI",
            "bank_account_number": "1234567893",
            "balance": 500000,
            "user": {
              "name": "Wahyu",
              "email": "wahyusaputra220300@gmail.com",
              "profile": [
                {
                  "identity_type": "KTP",
                  "identity_number": "12345678912340",
                  "address": "Jakarta"
                }
              ]
            },
            "createAt": "2024-01-28T14:52:19.997Z",
            "updateAt": "2024-01-28T14:52:19.997Z"
          }
        ]
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Update bank account (Admin only)

### Request

`PUT /api/v2/bank_accounts/admin/:id`

    curl -X 'PUT' \
      'http://localhost:8080/api/v2/bank_accounts/admin/6' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "user_id": 2,
      "balance": 500000
    }'

### Response

    {
      "data": {
        "id": 6,
        "user_id": 2,
        "bank_name": "BNI",
        "bank_account_number": "1234567893",
        "balance": 500000,
        "createAt": "2024-01-28T14:52:19.997Z",
        "updateAt": "2024-01-28T15:00:47.884Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Delete bank account (Admin only)

### Request

`DELETE /api/v2/bank_accounts/admin/:id`

    curl -X 'DELETE' \
      'http://localhost:8080/api/v2/bank_accounts/admin/6' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 6,
        "user_id": 2,
        "bank_name": "BNI",
        "bank_account_number": "1234567893",
        "balance": 500000,
        "user": {
          "name": "Wahyu",
          "email": "wahyusaputra220300@gmail.com",
          "profile": [
            {
              "identity_type": "KTP",
              "identity_number": "12345678912340",
              "address": "Jakarta"
            }
          ]
        },
        "deletedAt": "2024-01-28T15:02:57.689Z"
      },
      "message": "success, data deleted",
      "error": null,
      "status": 200
    }

## Insert transaction

### Request

`POST /api/v2/transactions`

    curl -X 'POST' \
      'http://localhost:8080/api/v2/transactions' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "source_bank_number": "1234567890",
      "destination_bank_number": "1234567894",
      "amount": 100000
    }'

### Response

    {
      "data": {
        "id": 2,
        "source_bank_number": "1234567890",
        "bank_account_source": {
          "bank_name": "BCA",
          "bank_account_number": "1234567890",
          "user": {
            "name": "Wahyu"
          }
        },
        "destination_bank_number": "1234567894",
        "bank_account_destination": {
          "bank_name": "BNI",
          "bank_account_number": "1234567894",
          "user": {
            "name": "Wahyu"
          }
        },
        "amount": 100000,
        "createAt": "2024-01-28T15:06:51.582Z",
        "updateAt": "2024-01-28T15:06:51.582Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Get all your transaction

### Request

`GET /api/v2/transactions`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/transactions' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "current_page": 1,
        "total_page": 1,
        "total_data": 1,
        "data": [
          {
            "id": 2,
            "source_bank_number": "1234567890",
            "bank_account_source": {
              "bank_name": "BCA",
              "bank_account_number": "1234567890",
              "user": {
                "name": "Wahyu"
              }
            },
            "destination_bank_number": "1234567894",
            "bank_account_destination": {
              "bank_name": "BNI",
              "bank_account_number": "1234567894",
              "user": {
                "name": "Wahyu"
              }
            },
            "amount": 100000,
            "createAt": "2024-01-28T15:06:51.582Z",
            "updateAt": "2024-01-28T15:06:51.582Z"
          }
        ]
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Get all transaction (Admin only)

### Request

`GET /api/v2/transactions/admin`

    curl -X 'GET' \
      'http://localhost:8080/api/v2/transactions/admin' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "current_page": 1,
        "total_page": 1,
        "total_data": 1,
        "data": [
          {
            "id": 2,
            "source_bank_number": "1234567890",
            "bank_account_source": {
              "bank_name": "BCA",
              "bank_account_number": "1234567890",
              "user": {
                "name": "Wahyu"
              }
            },
            "destination_bank_number": "1234567894",
            "bank_account_destination": {
              "bank_name": "BNI",
              "bank_account_number": "1234567894",
              "user": {
                "name": "Wahyu"
              }
            },
            "amount": 100000,
            "createAt": "2024-01-28T15:06:51.582Z",
            "updateAt": "2024-01-28T15:06:51.582Z"
          }
        ]
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Update transaction (Admin only)

### Request

`PUT /api/v2/transactions/admin/:id`

    curl -X 'PUT' \
      'http://localhost:8080/api/v2/transactions/admin/2' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg' \
      -H 'Content-Type: application/json' \
      -d '{
      "amount": 150000
    }'

### Response

    {
      "data": {
        "id": 2,
        "source_bank_number": "1234567890",
        "destination_bank_number": "1234567894",
        "amount": 150000,
        "createAt": "2024-01-28T15:06:51.582Z",
        "updateAt": "2024-01-28T15:11:56.173Z"
      },
      "message": "success",
      "error": null,
      "status": 200
    }

## Delete transaction (Admin only)

### Request

`DELETE /api/v2/transactions/admin/:id`

    curl -X 'DELETE' \
      'http://localhost:8080/api/v2/transactions/admin/2' \
      -H 'accept: */*' \
      -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YWh5dXNhcHV0cmEyMjAzMDBAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA2NDUwNDAxfQ.VqaCC21Mzp64irx3G3qXSJhPt-6dt_I3hlO3z6d-cbg'

### Response

    {
      "data": {
        "id": 2,
        "source_bank_number": "1234567890",
        "bank_account_source": {
          "bank_name": "BCA",
          "bank_account_number": "1234567890",
          "user": {
            "name": "Wahyu"
          }
        },
        "destination_bank_number": "1234567894",
        "bank_account_destination": {
          "bank_name": "BNI",
          "bank_account_number": "1234567894",
          "user": {
            "name": "Wahyu"
          }
        },
        "amount": 150000,
        "deletedAt": "2024-01-28T15:14:16.269Z"
      },
      "message": "success, data deleted",
      "error": null,
      "status": 200
    }

