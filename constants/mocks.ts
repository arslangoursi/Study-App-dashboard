import { faker } from "@faker-js/faker";

const padNumber = (num: number, size: number) =>
  String(num).padStart(size, "0");

const getArabicName = () => faker.company.name();

export const customersPlots = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  project: {
    en: faker.company.name(),
    ar: getArabicName()
  },
  map: {
    en: faker.lorem.word(),
    ar: getArabicName()
  },
  properties: faker.number.int(),
  total: faker.finance.amount(),
  remain: faker.finance.amount(),
  status: faker.helpers.arrayElement(["Pending", "Completed"]),
  lastUpdatedBy: faker.person.fullName(),
  lastUpdatedDate: faker.date.recent().toISOString()
}));

export const transactions = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  application: faker.string.uuid(),
  amount: faker.finance.amount(),
  status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
  lastUpdatedBy: faker.person.fullName(),
  lastUpdatedDate: faker.date.recent().toISOString(),
  createdBy: faker.person.fullName(),
  createdDate: faker.date.past().toISOString()
}));

export const customerTransactions = Array.from({ length: 100 }, (_, index) => ({
  id: faker.string.uuid(),
  number: padNumber(index + 1, 4),
  property: faker.company.name(),
  map: faker.lorem.word(),
  amount: faker.finance.amount(),
  status: faker.finance.transactionType()
}));

export const UserLogs = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  user: {
    id: faker.string.uuid(),
    name: faker.person.fullName()
  },
  url: faker.internet.url(),
  description: {
    en: `User ${faker.person.fullName()} ${faker.helpers.arrayElement([
      "updated their profile picture",
      "changed their email address",
      "reset their password",
      "updated contact details",
      "deleted an account",
      "updated their subscription settings"
    ])}`
  },
  createdAt: faker.date.recent().toISOString()
}));

export const invoice = Array.from({ length: 5 }, (_, index) => ({
  id: faker.string.uuid(),
  number: padNumber(index + 1, 4),
  createdAt: faker.date.recent().toISOString(),
  amount: faker.finance.amount(),
  viewedOn: faker.date.recent().toISOString(),
  dueAt: faker.date.recent().toISOString(),
  paidAt: faker.date.recent().toISOString(),
  paidAmount: faker.finance.amount()
}));
