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
            Contoh:
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

      ### Register user

      - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/user

      ### Get 1 user

      - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/user

      ### Update 1 user

      - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/user

      ### Delete 1 user

      - [x] DELETE https://bank-system-poxzy.koyeb.app/api/v2/user
            Contoh:
            {
            "email": "string"
            }

- Bank Account

        ### Register bank account (Admin Only)

        - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/admin
            Contoh:
            {
            "user_id": 0,
            "bank_name": "string",
            "bank_account_number": 0,
            "balance": 0
            }

        ### Get all bank account (Admin Only)

        - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/admin

        ### Update bank account (Admin Only)

        - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/admin/:id
            Contoh:
            {
            "user_id": 0,
            "bank_name": "string",
            "bank_account_number": 0,
            "balance": 0
            }

        ### Delete bank account (Admin Only)

        - [x] DELETE https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/admin/:bank_account_number

        ### Register bank account

        - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts
            Contoh:
            {
            "bank_name": "string",
            "bank_account_number": 0,
            "balance": 0
            }

        ### Get all bank account (Admin Only)

        - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts

        ### Update bank account (Admin Only)

        - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/:id
            Contoh:
            {
            "bank_name": "string",
            "bank_account_number": 0,
            "balance": 0
            }

        ### Delete bank account (Admin Only)

        - [x] DELETE https://bank-system-poxzy.koyeb.app/api/v2/bank_accounts/:bank_account_number

- Transaction

      ### Create Transaction

      - [x] POST https://bank-system-poxzy.koyeb.app/api/v2/transactions
            Contoh:
            {
            "source_account_id": 0,
            "destination_account_id": 0,
            "amount": 0
            }

      ### Get all transaction user

      - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/transactions

      ### Get all transaction (Admin Only)

      - [x] GET https://bank-system-poxzy.koyeb.app/api/v2/transactions/admin

      ### Update transactin (Admin Only)

      - [x] PUT https://bank-system-poxzy.koyeb.app/api/v2/transactions/admin/:id
            Contoh:
            {
            "source_bank_number": 0,
            "destination_bank_number": 0,
            "amount": 0
            }

# Dokumentasi in koyeb

https://bank-system-poxzy.koyeb.app/
