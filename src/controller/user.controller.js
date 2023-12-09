const { ResponseTemplate } = require('../helper/template.helper')
const { HashPassword } = require('../helper/hash_pass_helper')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const imagekit = require('../lib/imagekit')

async function Register(req, res) {

    const { name, email, password, profile_picture, identity_type, identity_number, address } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name,
        email,
        password: hashPass,
        profile: {
            create: {
                profile_picture,
                identity_type,
                identity_number,
                address
            }
        }
    }

    const emailUser = await prisma.user.findUnique({
        where: {email: payload.email},
    });

    if (emailUser) {
        let resp = ResponseTemplate(null, 'Email already exist', null, 404)
        res.status(404).json(resp)
        return
    }

    if (req.body.identity_type !== 'KTP' && req.body.identity_type !== 'SIM') {
        let resp = ResponseTemplate(null, 'identity type must be KTP or SIM', null, 404)
        res.status(404).json(resp)
        return
    }

    try {

        const stringFile = req.file.buffer.toString("base64");
    
        const uploadFile = await imagekit.upload({
            fileName: req.file.originalname,
            file: stringFile,
        })
        
        await prisma.user.create({
            data: {
                ...payload,
                profile: {
                    update: {
                        profile_picture: uploadFile.url
                    }
                }
            },
            include: {
                profile: true
            }
        });

        const userView = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        profile_picture: true,
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            },
        });

        let resp = ResponseTemplate(userView, 'success', null, 200)
        res.status(200).json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return

    }
}

async function Get(req, res) {

    const id = req.user.id

    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        profile_picture: true,
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        })

        if (users === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.status(404).json(resp)
            return
        }

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

async function Update(req, res) {

    const { name, email, password, profile_picture, identity_type, identity_number, address } = req.body
    const id = req.user.id

    const payload = {}
    const update = {}
    const profile = {update}

    if (!name && !email && !password && !profile_picture && !identity_type && !identity_number && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.status(400).json(resp)
        return
    }

    if (name) payload.name = name
    if (email) payload.email = email
    if (password) payload.password = password
    if (profile_picture || identity_type || identity_number || address) payload.profile = profile
    if (profile_picture) update.profile_picture = profile_picture
    if (identity_type) update.identity_type = identity_type
    if (identity_number) update.identity_number = identity_number
    if (address) update.address = address

    try {
        const stringFile = req.file.buffer.toString("base64");
    
        const uploadFile = await imagekit.upload({
            fileName: req.file.originalname,
            file: stringFile,
        })

        const users = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                profile: {
                    update: {
                        profile_picture: uploadFile.url
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        profile_picture: true,
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

async function Delete(req, res) {

    const { email } = req.params

    if (email !== req.user.email) {
        let resp = ResponseTemplate(null, 'email not same', null, 400)
        res.status(400).json(resp)
        return
    }

    try {

        const user = await prisma.bankAccounts.findUnique({
            where: {
                user_id: Number(req.user.id)
            }
        })

        await prisma.transactions.deleteMany({
            where: {
                source_bank_number: user.bank_account_number
            }
        })

        await prisma.transactions.deleteMany({
            where: {
                destination_bank_number: user.bank_account_number
            }
        })

        await prisma.bankAccounts.delete({
            where: {
                user_id: Number(req.user.id)
            }
        })

        await prisma.profile.delete({
            where: {
                user_id: Number(id)
            },
        })

        await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'data deleted', null, 200)
        res.status(200).json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(resp)
        return
    }
}

module.exports = {
    Register,
    Get,
    Update,
    Delete
}