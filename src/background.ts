import { ProntoDB } from "./ProntoDB";

const db = new ProntoDB();

// const openTabs: {
//   [tabID: number]: {
//     timeOpened: number;
//     timeSpent: number;
//     url: string;
//   };
// } = {};
// let lastTab: number | undefined = undefined;

const openTabs: {
  [tabID: number]: {
    lastActivated: number;
    totalTimeSpent: number;
    hostname: string;
  };
} = {};
let lastTab: number | undefined = undefined;

function ensureTab(tabID: number, hostname: string) {
  if (!openTabs[tabID]) {
    openTabs[tabID] = {
      lastActivated: Date.now(),
      totalTimeSpent: 0,
      hostname,
    };
  }
  return openTabs[tabID];
}

function startTracking(tabID: number, hostname: string) {
  console.log("started tracking");
  ensureTab(tabID, hostname);
  //
}

function resumeTracking(tabID: number) {
  console.log("resume tracking");
  const tab = openTabs[tabID];
  tab.lastActivated = Date.now();
}

function pauseTracking(tabID: number) {
  console.log("pause tracking");
  const tab = openTabs[tabID];
  if (!tab) return;
  tab.totalTimeSpent += Date.now() - tab.lastActivated;
}

async function stopTracking(tabID: number) {
  const tab = openTabs[tabID];
  console.log("stop tracking", tab);

  if (!tab) return;

  tab.totalTimeSpent += Date.now() - tab.lastActivated;

  const hostname = tab.hostname.replace("www.", "");
  const entry = await db.hosts.get(hostname);
  if (entry) {
    db.hosts
      .where("hostname")
      .equals(hostname)
      .modify((e) => {
        e.totalTimeSpent += tab.totalTimeSpent;
      });
  } else {
    db.hosts.put({
      totalTimeSpent: tab.totalTimeSpent,
      hostname: hostname,
    });
  }

  db.sessions.put({
    hostname: hostname,
    timeStart: tab.lastActivated,
    timeSpent: tab.totalTimeSpent,
  });
}

chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
  if (!changeInfo.url) return;
  // start tracking the new hostname
  startTracking(tabID, new URL(changeInfo.url).hostname.replace("www.", ""));
  // if we had an old hostname, stop tracking and commit to DB

  if (!lastTab) lastTab = tabID;
});

chrome.tabs.onRemoved.addListener(async (tabID) => {
  // stop tracking the hostname in the tab
  stopTracking(tabID);

  // remove from openTabs list
  delete openTabs[tabID];
});
//

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!openTabs[activeInfo.tabId]) return;
  // restart tracking of the same hostname
  resumeTracking(activeInfo.tabId);
  // pause tracking of old hostname
  if (lastTab) {
    pauseTracking(lastTab);
  }
  // ONLY RUN AT THE END DONT RUN ANYTHING AFTERWARD PLEASEEEEE OWO
  lastTab = activeInfo.tabId;
});

chrome.tabs.query({}, (tabs) => {
  tabs.forEach((tab) => {
    if ((!tab.url && !tab.pendingUrl) || !tab.id) return;
    startTracking(
      tab.id,
      new URL(tab.url || tab.pendingUrl || "").hostname.replace("www.", "")
    );
  });
});
