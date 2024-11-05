const { ResponseTemplate } = require("../../helpers/templateHelper");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Insert(req, res) {
  try {
    const { bank_name, bank_account_number, balance } = req.body;

    const payload = {
      user_id: req.user.id,
      bank_name,
      bank_account_number,
      balance: Number(balance),
    };

    const checkBankNumber = await prisma.bankAccounts.findFirst({
      where: {
        bank_account_number: bank_account_number,
      },
    });

    if (checkBankNumber !== null) {
      let resp = ResponseTemplate(
        null,
        "bank account number already exist",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const account = await prisma.bankAccounts.create({
      data: payload,
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(account, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Get(req, res) {
  try {
    const {
      bank_name,
      bank_account_number,
      balance,
      page = 1,
      limit = 10,
    } = req.query;

    const user_id = req.user.id;

    const payload = {};

    if (user_id) payload.user_id = user_id;
    if (bank_name) payload.bank_name = bank_name;
    if (bank_account_number) payload.bank_account_number = bank_account_number;
    if (balance) payload.balance = Number(balance);

    payload.deletedAt = null;

    let skip = (page - 1) * limit;

    //informasi total data keseluruhan
    const resultCount = await prisma.bankAccounts.count({
      where: payload,
    }); // integer jumlah total data user

    //generated total page
    const totalPage = Math.ceil(resultCount / limit);

    const bankAccount = await prisma.bankAccounts.findMany({
      //take : 10,
      take: parseInt(limit),
      //skip : 10
      skip: skip,
      where: payload,
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user: {
          select: {
            name: true,
            email: true,
            profile: {
              select: {
                identity_type: true,
                identity_number: true,
                address: true,
              },
            },
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
      data: bankAccount,
    };

    const cekBankAccount = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekBankAccount(bankAccount) === true) {
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

async function Update(req, res) {
  try {
    const { bank_name, bank_account_number, balance } = req.body;
    const user_id = req.user.id;
    const { id } = req.params;

    const check = await prisma.bankAccounts.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (check === null || check.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const payload = {};

    if (!user_id && !bank_name && !bank_account_number && !balance) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.json(resp);
      return;
    }

    if (user_id) payload.user_id = user_id;
    if (bank_name) payload.bank_name = bank_name;
    if (bank_account_number) payload.bank_account_number = bank_account_number;
    if (balance) payload.balance = balance;

    const account = await prisma.bankAccounts.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(account, "success", null, 200);
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
    const { id } = req.params;
    const user_id = req.user.id;

    const CheckBankAccount = await prisma.bankAccounts.findFirst({
      where: {
        id: Number(id),
        user_id: user_id,
      },
    });

    if (CheckBankAccount === null || CheckBankAccount.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    // const source = await prisma.transactions.findUnique({
    //   where: {
    //     source_bank_number: CheckBankAccount.bank_account_number,
    //   },
    // });

    // const destination = await prisma.transactions.findUnique({
    //   where: {
    //     destination_bank_number: CheckBankAccount.bank_account_number,
    //   },
    // });

    // if (source) {
    //   await prisma.transactions.updateMany({
    //     where: {
    //       source_bank_number: CheckBankAccount.bank_account_number,
    //       deletedAt: null,
    //     },
    //     data: {
    //       deletedAt: new Date(),
    //     }
    //   });
    //   return;
    // }

    // if (destination) {
    //   await prisma.transactions.updateMany({
    //     where: {
    //       destination_bank_number: CheckBankAccount.bank_account_number,
    //       deletedAt: null,
    //     },
    //     data: {
    //       deletedAt: new Date(),
    //     }
    //   });
    //   return;
    // }

    const bankAccount = await prisma.bankAccounts.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        deletedAt: true,
      },
    });

    let resp = ResponseTemplate(
      bankAccount,
      "success, data deleted",
      null,
      200
    );
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function AdminInsert(req, res) {
  try {
    const { user_id, bank_name, bank_account_number, balance } = req.body;

    const payload = {
      user_id: parseInt(user_id),
      bank_name,
      bank_account_number,
      balance: parseInt(balance),
    };

    const checkAccount = await prisma.bankAccounts.findFirst({
      where: {
        user_id: payload.user_id,
      },
    });

    if (checkAccount === null || checkAccount.deletedAt !== null) {
      let resp = ResponseTemplate(null, "user not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const checkBankNumber = await prisma.bankAccounts.findFirst({
      where: {
        bank_account_number: payload.bank_account_number,
      },
    });

    if (checkBankNumber !== null) {
      let resp = ResponseTemplate(
        null,
        "bank account number already exist",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const account = await prisma.bankAccounts.create({
      data: payload,
      select: {
        id: true,
        user_id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(account, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function AdminGet(req, res) {
  try {
    const {
      user_id,
      bank_name,
      bank_account_number,
      balance,
      page = 1,
      limit = 10,
    } = req.query;

    const payload = {};

    if (user_id) payload.user_id = Number(user_id);
    if (bank_name) payload.bank_name = bank_name;
    if (bank_account_number) payload.bank_account_number = bank_account_number;
    if (balance) payload.balance = Number(balance);

    payload.deletedAt = null;

    let skip = (page - 1) * limit;

    //informasi total data keseluruhan
    const resultCount = await prisma.bankAccounts.count({
      where: payload,
    }); // integer jumlah total data user

    //generated total page
    const totalPage = Math.ceil(resultCount / limit);

    const bankAccount = await prisma.bankAccounts.findMany({
      //take : 10,
      take: parseInt(limit),
      //skip : 10
      skip: skip,
      where: payload,
      select: {
        id: true,
        user_id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user: {
          select: {
            name: true,
            email: true,
            profile: {
              select: {
                identity_type: true,
                identity_number: true,
                address: true,
              },
            },
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
      data: bankAccount,
    };

    const cekBankAccount = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekBankAccount(bankAccount) === true) {
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

async function AdminUpdate(req, res) {
  try {
    const { user_id, bank_name, bank_account_number, balance } = req.body;
    const { id } = req.params;

    const checkAccount = await prisma.bankAccounts.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkAccount === null || checkAccount.deletedAt !== null) {
      let resp = ResponseTemplate(null, "user not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const payload = {};

    if (!user_id && !bank_name && !bank_account_number && !balance) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.status(400).json(resp);
      return;
    }

    if (user_id) payload.user_id = Number(user_id);
    if (bank_name) payload.bank_name = bank_name;
    if (bank_account_number) payload.bank_account_number = bank_account_number;
    if (balance) payload.balance = Number(balance);

    const account = await prisma.bankAccounts.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        user_id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(account, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function AdminDelete(req, res) {
  try {
    const { id } = req.params;

    const CheckBankAccount = await prisma.bankAccounts.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (CheckBankAccount === null || CheckBankAccount.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    // const source = await prisma.transactions.findUnique({
    //   where: {
    //     source_bank_number: CheckBankAccount.bank_account_number,
    //   },
    // });

    // const destination = await prisma.transactions.findUnique({
    //   where: {
    //     destination_bank_number: CheckBankAccount.bank_account_number,
    //   },
    // });

    // if (source) {
    //   await prisma.transactions.update({
    //     where: {
    //       source_bank_number: CheckBankAccount.bank_account_number,
    //       deletedAt: null,
    //     },
    //     data: {
    //       deletedAt: new Date(),
    //     }
    //   });
    //   return;
    // }

    // if (destination) {
    //   await prisma.transactions.update({
    //     where: {
    //       destination_bank_number: CheckBankAccount.bank_account_number,
    //       deletedAt: null,
    //     },
    //     data: {
    //       deletedAt: new Date(),
    //     }
    //   });
    //   return;
    // }

    const bankAccount = await prisma.bankAccounts.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        user_id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user: {
          select: {
            name: true,
            email: true,
            profile: {
              select: {
                identity_type: true,
                identity_number: true,
                address: true,
              },
            },
          },
        },
        deletedAt: true,
      },
    });

    let resp = ResponseTemplate(
      bankAccount,
      "success, data deleted",
      null,
      200
    );
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  Insert,
  Get,
  Update,
  Delete,
  AdminInsert,
  AdminGet,
  AdminUpdate,
  AdminDelete,
};
