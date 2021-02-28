import { Dexie } from "dexie";
import categories from "./categories";

interface ISessionEntry {
  hostname: string;
  timeStart: number;
  timeSpent: number;
}

interface IHostEntry {
  hostname: string;
  totalTimeSpent: number;
}

export class ProntoDB extends Dexie {
  sessions: Dexie.Table<ISessionEntry, string>;
  hosts: Dexie.Table<IHostEntry, string>;

  constructor() {
    super("tabs");
    this.version(1).stores({
      sessions: "++id, hostname, timeStart, timeSpent",
      hosts: "hostname, totalTimeSpent",
    });
    this.sessions = this.table("sessions");
    this.hosts = this.table("hosts");
  }

  getTopSpent() {
    return this.hosts
      .orderBy("totalTimeSpent")
      .reverse()
      .limit(20)
      .toArray();
  }

  async getTopSpentBetween(start: number, end: number) {
    const entries = await this.sessions
      .where("timeStart")
      .between(start, end)
      .sortBy("timeSpent");
    return entries.reduce<{
      [host: string]: number;
    }>((obj, entry) => {
      if (!obj[entry.hostname]) obj[entry.hostname] = 0;
      obj[entry.hostname] += entry.timeSpent;
      return obj;
    }, {});
  }

  async getTopCategories() {
    const categoryTimes: { [keys: string]: number } = {};
    for (const [category, hostnames] of Object.entries(categories)) {
      const eligibleHosts = await this.hosts
        .where("hostname")
        .anyOf(hostnames)
        .toArray();

      let totalCategoryTime = 0;
      eligibleHosts.forEach((sessionEntry) => {
        totalCategoryTime += sessionEntry.totalTimeSpent;
      });

      categoryTimes[category] = totalCategoryTime;
    }

    return categoryTimes;
  }

  async getTopCategoriesBetween(start: number, end: number) {
    const categoryTimes: { [keys: string]: number } = {};
    for (const [category, hostnames] of Object.entries(categories)) {
      const eligibleHosts = await this.sessions
        .where("timeStart")
        .between(start, end)
        .filter((element) => {
          return hostnames.includes(element.hostname);
        })
        .toArray();

      let totalCategoryTime = 0;
      eligibleHosts.forEach((sessionEntry) => {
        totalCategoryTime += sessionEntry.timeSpent;
      });

      categoryTimes[category] = totalCategoryTime;
    }

    return categoryTimes;
  }

  async getAllTimeSpent() {
    const entries = await this.hosts.toArray();
    return entries.reduce((sum, host) => (sum += host.totalTimeSpent), 0);
  }
}
