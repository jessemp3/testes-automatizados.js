const Wallet = require("./Wallet");

describe("Wallet", () => {
  let wallet;

  const mockIncome = {
    value:5031,
    createdAt: new Date(),
    getValue: () => 50.31
  }

  const mockExpense = {
    value: -1299,
    createdAt: new Date(),
    getValue: () => -12.99
  }

  beforeEach(() => {
    wallet = new Wallet();
  });

  it("Should create an empty wallet with balace 0", () => {
    expect(wallet.balance).toBe(0);
  }); 

  it("Should create an empty wallet with no transaction", () => {
    expect(wallet.transactions).toEqual([]);
  });

  it("Should save a transaction on a wallet ", () => {
    const mockTransaction = "Some test Transaction";

    wallet.addTransaction(mockTransaction);

    expect(wallet.transactions).toContain(mockTransaction);
  });

  it("Should update wallet balance when a transaction is saved", () => {
    const mockTransaction = { value: 42 };

    wallet.addTransaction(mockTransaction);

    expect(wallet.balance).toBe(42);
  });

  it("Should get wallet balance as a number of up to two decimal places", () => {
    const mockTransaction = { value: 4219 };

    wallet.addTransaction(mockTransaction);

    expect(wallet.getBalance()).toBe(42.19);
  });

  it("Should get all the income", () => {
    const incomeB = {
      value: 8000,
      createdAt: new Date(),
      getValue: () => 80.0,
    };
    wallet.addTransaction(mockIncome);
    wallet.addTransaction(incomeB);

    const income = wallet.getAllIncomes();

    expect(income.total).toBe(130.31);
    expect(income.list).toContain(mockIncome);
    expect(income.list).toContain(incomeB);
  });

  it("Should get all incomes and no expense", () => {

  
    wallet.addTransaction(mockIncome);
    wallet.addTransaction(mockExpense);

    const incomes = wallet.getAllIncomes();

    expect(incomes.total).toBe(50.31);
    expect(incomes.list).toContain(mockIncome);
    expect(incomes.list).not.toContain(mockExpense);
  });

  it("Should not include incomes created before start date", () => {
    const startDate = new Date("2024-05-04");
    const incomeBeforeStartDate = {
      value: 5031,
      createdAt: new Date(startDate.getTime() - 1),
      getValue: () => 50.31,
    };
    const incomeAfterStartDate = {
      value: 8000,
      createdAt: new Date(startDate.getTime() + 1),
      getValue: () => 80,
    };
    wallet.addTransaction(incomeBeforeStartDate);
    wallet.addTransaction(incomeAfterStartDate);

    const incomes = wallet.getAllIncomes(startDate);

    expect(incomes.total).toBe(80);
    expect(incomes.list).toContain(incomeAfterStartDate);
    expect(incomes.list).not.toContain(incomeBeforeStartDate);
  });

  it("Should not include incomes creaed after and date", () => {
    const startDate = new Date("2024-05-04");
    const endDate = new Date("2024-05-31");
    const incomeBeforeEndDate = {
      value: 5031,
      createdAt: new Date(endDate.getTime() - 1),
      getValue: () => 50.31,
    };
    const incomeAfterEndDate = {
      value: 8000,
      createdAt: new Date(endDate.getTime() + 1),
      getValue: () => 80,
    };
    wallet.addTransaction(incomeBeforeEndDate);
    wallet.addTransaction(incomeAfterEndDate);

    const incomes = wallet.getAllIncomes(startDate, endDate);

    expect(incomes.total).toBe(50.31);
    expect(incomes.list).toContain(incomeBeforeEndDate);
    expect(incomes.list).not.toContain(incomeAfterEndDate);
  });

  it("Should get all the expenses", () => {
    wallet.addTransaction(mockExpense);
    wallet.addTransaction(mockExpense);

    const expenses = wallet.getAllExpenses();

    expect(expenses.total).toBe(25.98);
    expect(expenses.list).toContain(mockExpense);
    expect(expenses.list).toContain(mockExpense);
  });

  it("should get the all expenses and no incomes", () => {
    wallet.addTransaction(mockIncome);
    wallet.addTransaction(mockExpense);

    const expenses = wallet.getAllExpenses();

    expect(expenses.total).toBe(12.99);
    expect(expenses.list).toContain(mockExpense);
    expect(expenses.list).not.toContain(mockIncome);
  });

  it("should not include expenses created before start date", () => {
    const startDate = new Date("2022-01-01");
    const expenseBeforeStartDate = {
      value: -3500,
      createdAt: new Date(startDate.getTime() - 1),
      getValue: () => -35,
    };
    const expenseAfterStartDate = {
      value: -1299,
      createdAt: new Date(startDate.getTime() + 1),
      getValue: () => -12.99,
    };
    wallet.addTransaction(expenseBeforeStartDate);
    wallet.addTransaction(expenseAfterStartDate);

    const expenses = wallet.getAllExpenses(startDate);

    expect(expenses.total).toBe(12.99);
    expect(expenses.list).not.toContain(expenseBeforeStartDate);
    expect(expenses.list).toContain(expenseAfterStartDate);
  });

  it("should not include expenses created after end date", () => {
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-01-31");
    const expenseBeforeEndDate = {
      value: -3500,
      createdAt: new Date(endDate.getTime() - 1),
      getValue: () => -35,
    };
    const expenseAfterEndDate = {
      value: -1299,
      createdAt: new Date(endDate.getTime() + 1),
      getValue: () => -12.99,
    };
    wallet.addTransaction(expenseBeforeEndDate);
    wallet.addTransaction(expenseAfterEndDate);

    const expenses = wallet.getAllExpenses(startDate, endDate);

    expect(expenses.total).toBe(35);
    expect(expenses.list).toContain(expenseBeforeEndDate);
    expect(expenses.list).not.toContain(expenseAfterEndDate);
  });
});
