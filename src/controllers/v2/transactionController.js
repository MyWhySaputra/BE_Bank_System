const { ResponseTemplate } = require("../../helpers/templateHelper");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Insert(req, res) {
  const { source_bank_number, destination_bank_number, amount } = req.body;

  const payload = {
    source_bank_number: source_bank_number,
    destination_bank_number: destination_bank_number,
    amount: parseInt(amount),
  };

  try {
    const source = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.source_bank_number },
    });
    const destination = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.destination_bank_number },
    });

    if (!source) {
      let resp = ResponseTemplate(null, "Source account not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    if (!destination) {
      let resp = ResponseTemplate(
        null,
        "Destination account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (source.balance < payload.amount) {
      let resp = ResponseTemplate(
        null,
        "your balance is not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    await prisma.bankAccounts.update({
      where: { bank_account_number: payload.source_bank_number },
      data: { balance: { decrement: payload.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: payload.destination_bank_number },
      data: { balance: { increment: payload.amount } },
    });

    const transaction = await prisma.transactions.create({
      data: payload,
      select: {
        id: true,
        source_bank_number: true,
        bank_account_source: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        destination_bank_number: true,
        bank_account_destination: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        amount: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(transaction, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    // let resp = ResponseTemplate(null, "internal server error", error, 500);
    // res.status(500).json(resp);
    console.log(error);
    return;
  }
}

async function Get(req, res) {
  const {
    source_bank_number,
    destination_bank_number,
    page = 1,
    limit = 10,
  } = req.query;

  const user_id = req.user.id;

  const payload = {};

  if (source_bank_number)
    payload.source_bank_number = parseInt(source_bank_number);
  if (destination_bank_number)
    payload.destination_bank_number = parseInt(destination_bank_number);

  payload.deletedAt = null;

  try {
    const user = await prisma.bankAccounts.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (source_bank_number) {
      if (user.bank_account_number !== source_bank_number) {
        let resp = ResponseTemplate(
          null,
          "Source account not found",
          null,
          404
        );
        res.status(404).json(resp);
        return;
      }
    }

    if (destination_bank_number) {
      if (user.bank_account_number !== destination_bank_number) {
        let resp = ResponseTemplate(
          null,
          "destination account not found",
          null,
          404
        );
        res.status(404).json(resp);
        return;
      }
    }

    let skip = (page - 1) * limit;

    //informasi total data keseluruhan
    const resultCount = await prisma.transactions.count({
      where: payload,
    }); // integer jumlah total data user

    //generated total page
    const totalPage = Math.ceil(resultCount / limit);

    const transaction = await prisma.transactions.findMany({
      //take : 10,
      take: parseInt(limit),
      //skip : 10
      skip: skip,
      where: payload,
      select: {
        id: true,
        source_bank_number: true,
        bank_account_source: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        destination_bank_number: true,
        bank_account_destination: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        amount: true,
        createAt: true,
        updateAt: true,
      },
    });

    const pagination = {
      current_page: page - 0, // ini - 0 merubah menjadi integer
      total_page: totalPage,
      total_data: resultCount,
      data: transaction,
    };

    const cekTransaction = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekTransaction(transaction) === true) {
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

async function AdminGet(req, res) {
  const {
    source_bank_number,
    destination_bank_number,
    amount,
    page = 1,
    limit = 10,
  } = req.query;

  const payload = {};

  if (source_bank_number) payload.source_bank_number = source_bank_number;
  if (destination_bank_number)
    payload.destination_bank_number = destination_bank_number;
  if (amount) payload.amount = amount;

  payload.deletedAt = null;

  try {
    let skip = (page - 1) * limit;

    //informasi total data keseluruhan
    const resultCount = await prisma.transactions.count({
      where: payload,
    }); // integer jumlah total data user

    //generated total page
    const totalPage = Math.ceil(resultCount / limit);

    const transaction = await prisma.transactions.findMany({
      //take : 10,
      take: parseInt(limit),
      //skip : 10
      skip: skip,
      where: payload,
      select: {
        id: true,
        source_bank_number: true,
        bank_account_source: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        destination_bank_number: true,
        bank_account_destination: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        amount: true,
        createAt: true,
        updateAt: true,
      },
    });

    const pagination = {
      current_page: page - 0, // ini - 0 merubah menjadi integer
      total_page: totalPage,
      total_data: resultCount,
      data: transaction,
    };

    const cekTransaction = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekTransaction(transaction) === true) {
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
  const { source_bank_number, destination_bank_number, amount } = req.body;
  const { id } = req.params;

  const payload = {};

  if (!source_bank_number && !destination_bank_number && !amount) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  const CheckTransaction = await prisma.transactions.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (CheckTransaction === null || CheckTransaction.deletedAt !== null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const source = await prisma.bankAccounts.findUnique({
    where: { bank_account_number: CheckTransaction.source_bank_number },
  });
  const destination = await prisma.bankAccounts.findUnique({
    where: { bank_account_number: CheckTransaction.destination_bank_number },
  });

  if (destination.balance < CheckTransaction.amount) {
    let resp = ResponseTemplate(
      null,
      "balance destination not enough",
      null,
      400
    );
    res.status(400).json(resp);
    return;
  }

  if (source_bank_number && destination_bank_number && amount) {
    payload.source_bank_number = source_bank_number;
    payload.destination_bank_number = destination_bank_number;
    payload.amount = Number(amount);

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.destination_bank_number },
    });

    if (!sourceNew) {
      let resp = ResponseTemplate(
        null,
        "New source account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (!destinationNew) {
      let resp = ResponseTemplate(
        null,
        "New destination account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < payload.amount) {
      let resp = ResponseTemplate(
        null,
        "balance new source not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: payload.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: payload.amount } },
    });
  } else if (destination_bank_number && amount) {
    payload.destination_bank_number = destination_bank_number;
    payload.amount = Number(amount);

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: CheckTransaction.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.destination_bank_number },
    });

    if (!destinationNew) {
      let resp = ResponseTemplate(
        null,
        "New destination account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < payload.amount) {
      let resp = ResponseTemplate(
        null,
        "balance new source not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: payload.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: payload.amount } },
    });
  } else if (source_bank_number && amount) {
    payload.source_bank_number = source_bank_number;
    payload.amount = Number(amount);

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: CheckTransaction.destination_bank_number },
    });

    if (!sourceNew) {
      let resp = ResponseTemplate(
        null,
        "New source account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < payload.amount) {
      let resp = ResponseTemplate(
        null,
        "balance new source not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: payload.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: payload.amount } },
    });
  } else if (source_bank_number && destination_bank_number) {
    payload.source_bank_number = source_bank_number;
    payload.destination_bank_number = destination_bank_number;

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.destination_bank_number },
    });

    if (!sourceNew) {
      let resp = ResponseTemplate(
        null,
        "New source account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (!destinationNew) {
      let resp = ResponseTemplate(
        null,
        "New destination account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < CheckTransaction.amount) {
      let resp = ResponseTemplate(
        null,
        "balance new source not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });
  } else if (amount) {
    payload.amount = Number(amount);

    if (source.balance < payload.amount) {
      let resp = ResponseTemplate(null, "balance source not enough", null, 400);
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { decrement: payload.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { increment: payload.amount } },
    });
  } else if (destination_bank_number) {
    payload.destination_bank_number = destination_bank_number;

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: CheckTransaction.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.destination_bank_number },
    });

    if (!destinationNew) {
      let resp = ResponseTemplate(
        null,
        "New destination account not found",
        null,
        404
      );
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < CheckTransaction.amount) {
      let resp = ResponseTemplate(null, "balance source not enough", null, 400);
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });
  } else if (source_bank_number) {
    payload.source_bank_number = source_bank_number;

    const sourceNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: payload.source_bank_number },
    });
    const destinationNew = await prisma.bankAccounts.findUnique({
      where: { bank_account_number: CheckTransaction.destination_bank_number },
    });

    if (!sourceNew) {
      let resp = ResponseTemplate(null, "Source account not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    if (sourceNew.balance < payload.amount) {
      let resp = ResponseTemplate(
        null,
        "balance new source not enough",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    const sourceOld = await prisma.bankAccounts.update({
      where: { bank_account_number: source.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });

    const destinationOld = await prisma.bankAccounts.update({
      where: { bank_account_number: destination.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: sourceNew.bank_account_number },
      data: { balance: { decrement: CheckTransaction.amount } },
    });

    await prisma.bankAccounts.update({
      where: { bank_account_number: destinationNew.bank_account_number },
      data: { balance: { increment: CheckTransaction.amount } },
    });
  }

  try {
    const transaction = await prisma.transactions.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        source_bank_number: true,
        destination_bank_number: true,
        amount: true,
        createAt: true,
        updateAt: true,
      },
    });

    let resp = ResponseTemplate(transaction, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function AdminDelete(req, res) {
  const { id } = req.params;

  try {
    const CheckTransaction = await prisma.transactions.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (CheckTransaction === null || CheckTransaction.deletedAt !== null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const transaction = await prisma.transactions.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        source_bank_number: true,
        bank_account_source: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        destination_bank_number: true,
        bank_account_destination: {
          select: {
            bank_name: true,
            bank_account_number: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        amount: true,
        deletedAt: true,
      },
    });

    let resp = ResponseTemplate(
      transaction,
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
  AdminGet,
  AdminUpdate,
  AdminDelete,
};
