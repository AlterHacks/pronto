import { Dexie } from "dexie";

interface ITabTime {
  url: string;
  time_start: number;
  time_spent: number;
}

export class ProntoDB extends Dexie {
  tabTimes: Dexie.Table<ITabTime, string>;

  constructor() {
    super("tabs");
    this.version(1).stores({
      tabTimes: "++url, date, time_spent",
    });
    this.tabTimes = this.table("tabTimes");
  }
}
