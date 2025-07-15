
class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch) {
    if (this.branches.includes(branch)) return false;
    this.branches.push(branch);
    return true;
  }

  addCustomer(branch, customer) {
    if (!this.checkBranch(branch)) return false;
    return branch.addCustomer(customer);
  }

  addCustomerTransaction(branch, customerId, amount) {
    if (!this.checkBranch(branch)) return false;
    return branch.addCustomerTransaction(customerId, amount);
  }

  findBranchByName(branchName) {
    const matches = this.branches.filter(
      (b) => b.name.toLowerCase().includes(branchName.toLowerCase())
    );
    return matches.length ? matches : null;
  }

  checkBranch(branch) {
    return this.branches.includes(branch);
  }

  listCustomers(branch, includeTransactions) {
    if (!this.checkBranch(branch)) return;
    console.log(`Customers of ${branch.getName()}:`);
    branch.getCustomers().forEach((customer) => {
      console.log(`- ${customer.name} (ID: ${customer.id})`);
      if (includeTransactions) {
        console.log(`  Transactions: ${customer.getTransactions().join(", ")}`);
        console.log(`  Balance: ${customer.getBalance()}`);
      }
    });
  }
}


class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  getName() {
    return this.name;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer) {
    if (this.customers.find((c) => c.id === customer.id)) return false;
    this.customers.push(customer);
    return true;
  }

  addCustomerTransaction(customerId, amount) {
    const customer = this.customers.find((c) => c.id === customerId);
    if (!customer) return false;
    customer.addTransaction(amount);
    return true;
  }
}


class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  addTransaction(amount) {
    this.transactions.push(amount);
  }

  getTransactions() {
    return this.transactions;
  }

  getBalance() {
    return this.transactions.reduce((total, t) => total + t, 0);
  }
}

const bank = new Bank("Riyad Bank");
const branch1 = new Branch("Olaya Branch");
const branch2 = new Branch("Malaz Branch");

bank.addBranch(branch1);
bank.addBranch(branch2);

const customer1 = new Customer("Ali", "001");
const customer2 = new Customer("Laila", "002");
const customer3 = new Customer("Khalid", "003");

bank.addCustomer(branch1, customer1);
bank.addCustomer(branch1, customer2);
bank.addCustomer(branch2, customer3);

bank.addCustomerTransaction(branch1, "001", 1000);
bank.addCustomerTransaction(branch1, "001", -200);
bank.addCustomerTransaction(branch1, "002", 1500);
bank.addCustomerTransaction(branch2, "003", 2000);

console.log("\nList of customers in Olaya Branch (with transactions):");
bank.listCustomers(branch1, true);

console.log("\nList of customers in Malaz Branch (without transactions):");
bank.listCustomers(branch2, false);

console.log("\nSearching for branches by name 'malaz':");
const found = bank.findBranchByName("malaz");
console.log(found ? found.map(b => b.getName()) : "No branch found");