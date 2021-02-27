import Dexie from "dexie";
import { ProntoDB } from "./ProntoDB";

const db = new ProntoDB();

const open_tabs: {
  [tab_id: number]: {
    time_opened: number;
    url: string;
  };
} = {};

chrome.tabs.onCreated.addListener((tab) => {
  if (!tab.id) return;

  const site = tab.url || tab.pendingUrl || "";

  open_tabs[tab.id] = { time_opened: Date.now(), url: site };
});

chrome.tabs.onRemoved.addListener((tabID, removeInfo) => {
  const tab = open_tabs[tabID];
  if (tab) {
    db.tabTimes.add({
      url: tab.url,
      time_spent: Date.now() - tab.time_opened,
      time_start: tab.time_opened,
    });
  }
});
