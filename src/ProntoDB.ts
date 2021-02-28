import { Dexie } from "dexie";

interface ITabEntry {
  timeStart: number;
  timeSpent: number;
}

interface ISiteEntry {
  url: string;
  totalTimeSpent: number;
  sessions: ITabEntry[];
}

export class ProntoDB extends Dexie {
  tabTimes: Dexie.Table<ISiteEntry, string>;

  constructor() {
    super("tabs");
    this.version(1).stores({
      tabTimes: "url, totalTimeSpent, sessions",
    });
    this.tabTimes = this.table("tabTimes");
  }

  getTopSpent() {
    return this.tabTimes
      .orderBy("totalTimeSpent")
      .reverse()
      .limit(20)
      .toArray();
  }
}
