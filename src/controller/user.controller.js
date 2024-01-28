const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../lib/imagekit");

const { DateTime } = require("luxon");

async function Get(req, res) {
  const id = req.user.id;

  try {
    const users = await prisma.user.findUnique({
      where: {
        id: Number(id),
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
            address: true,
          },
        },
        createAt: true,
        updateAt: true,
      },
    });

    if (users === null || users.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(users, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { name, email, password, identity_type, identity_number, address } =
    req.body;
  const id = req.user.id;

  const checkUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkUser === null || checkUser.deletedAt !== null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};
  const data = {};
  const where = { user_id: Number(id) };
  const update = { where, data };
  const profile = { update };

  if (
    !name &&
    !email &&
    !password &&
    !req.file &&
    !identity_type &&
    !identity_number &&
    !address
  ) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  if (name) payload.name = name;
  if (email) payload.email = email;
  if (password) {
    const hashPass = await HashPassword(password);
    payload.password = hashPass;
  }
  if (identity_type || identity_number || address) payload.profile = profile;
  if (identity_type) data.identity_type = identity_type;
  if (identity_number) data.identity_number = identity_number;
  if (address) data.address = address;

  try {
    if (req.file) {
      const stringFile = req.file.buffer.toString("base64");

      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
      });

      if (uploadFile.url) {
        payload.profile = profile;
        data.profile_picture = uploadFile.url;
      } else {
        throw new Error("Failed to upload file");
      }
    }

    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            profile_picture: true,
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(users, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Delete(req, res) {
  try {
    // const user = await prisma.bankAccounts.updateMany({
    //   where: {
    //     user_id: Number(req.user.id),
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   }
    // });

    // await prisma.transactions.updateMany({
    //   where: {
    //     source_bank_number: user.bank_account_number,
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    // await prisma.transactions.updateMany({
    //   where: {
    //     destination_bank_number: user.bank_account_number,
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    await prisma.profile.update({
      where: {
        user_id: Number(req.user.id),
      },
      data: {
        deletedAt: new Date(),
      }
    });

    const timestamp = DateTime.now().toMillis();
    const random = Math.random().toString(36).substring(7);

    const userView = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        email: `${checkKasir.email}_${timestamp}_${random}`,
        deletedAt: new Date(),
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
            address: true,
          },
        },
        deletedAt: true,
      },
    });

    let resp = ResponseTemplate(userView, "data successfully deleted", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function GetUser(req, res) {

  const {
    name,
    email,
    identity_type,
    identity_number,
    address,
    page = 1,
    limit = 10,
  } = req.query;

  const payload = {};
  const every = {};
  const profile = { every };

  if (name) payload.name = name;
  if (email) payload.email = email;
  if (identity_type || identity_number || address) payload.profile = profile;
  if (identity_type) every.identity_type = identity_type;
  if (identity_number) every.identity_number = identity_number;
  if (address) every.address = address;

  payload.deletedAt = null;

  try {
    const skip = (page - 1) * limit;

    //informasi total data keseluruhan
    const resultCount = await prisma.user.count({
      where: payload,
    }); // integer jumlah total data user

    //generated total page
    const totalPage = Math.ceil(resultCount / limit);

    const users = await prisma.user.findMany({
      //take : 10,
      take: parseInt(limit),
      //skip : 10
      skip: skip,
      where: payload,
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            profile_picture: true,
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
        createAt: true,
        updateAt: true,
      },
    });

    const pagination = {
      current_page: page - 0, // ini - 0 merubah menjadi integer
      total_page: totalPage,
      total_data: resultCount,
      data: users,
    };
    const cekUser = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekUser(users) === true) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(pagination, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function UpdateUser(req, res) {
  const { name, email, password, identity_type, identity_number, address } =
    req.body;
  const { id } = req.params;

  const checkUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkUser === null || checkUser.deletedAt !== null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};
  const data = {};
  const where = { user_id: Number(id) };
  const update = { where, data };
  const profile = { update };

  if (
    !name &&
    !email &&
    !password &&
    !req.file &&
    !identity_type &&
    !identity_number &&
    !address
  ) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  if (name) payload.name = name;
  if (email) payload.email = email;
  if (password) {
    const hashPass = await HashPassword(password);
    payload.password = hashPass;
  }
  if (identity_type || identity_number || address) payload.profile = profile;
  if (identity_type) data.identity_type = identity_type;
  if (identity_number) data.identity_number = identity_number;
  if (address) data.address = address;

  try {
    if (req.file) {
      const stringFile = req.file.buffer.toString("base64");

      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
      });

      if (uploadFile.url) {
        payload.profile = profile;
        data.profile_picture = uploadFile.url;
      } else {
        throw new Error("Failed to upload file");
      }
    }

    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            profile_picture: true,
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(users, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function DeleteUser(req, res) {
  const { id } = req.params;

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkUser === null || checkUser.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    // const user = await prisma.bankAccounts.updateMany({
    //   where: {
    //     user_id: Number(id),
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    // await prisma.transactions.updateMany({
    //   where: {
    //     source_bank_number: user.bank_account_number,
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    // await prisma.transactions.updateMany({
    //   where: {
    //     destination_bank_number: user.bank_account_number,
    //     deletedAt: null,
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    await prisma.profile.update({
      where: {
        user_id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    const timestamp = DateTime.now().toMillis();
    const random = Math.random().toString(36).substring(7);

    const userView = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: `${checkKasir.email}_${timestamp}_${random}`,
        deletedAt: new Date(),
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
            address: true,
          },
        },
        deletedAt: true,
      },
    });

    let resp = ResponseTemplate(userView, "data successfully deleted", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  Get,
  Update,
  Delete,
  GetUser,
  UpdateUser,
  DeleteUser,
};
