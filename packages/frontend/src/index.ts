import { Classic } from "@caido/primevue";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "./views/App.vue";

import "./styles/index.css";

import { SDKPlugin } from "./plugins/sdk";
import type { FrontendSDK } from "./types";

const cleanQuery = (query: string) : string => {
  return query.replaceAll(/and row\.id\.gt:\d+/g, "").replaceAll(/row\.id\.gt:\d+/g,"").trim()
}

// This is the entry point for the frontend plugin
export const init = (sdk: FrontendSDK) => {
  const app = createApp(App);

  // Load the PrimeVue component library
  app.use(PrimeVue, {
    unstyled: true,
    pt: Classic,
  });

  // Provide the FrontendSDK
  app.use(SDKPlugin, sdk);

  // Create the root element for the app
  const root = document.createElement("div");
  Object.assign(root.style, {
    height: "100%",
    width: "100%",
  });

  // Set the ID of the root element
  // Replace this with the value of the prefixWrap plugin in caido.config.ts 
  // This is necessary to prevent styling conflicts between plugins
  root.id = `caido-whatsnew--frontend-vue`;

  // Mount the app to the root element
  app.mount(root);


  // init the command
  sdk.commands.register(`newrequests-addfilter`, {
    name: `Insert a HTTPQL filter to only show new requests`,
    run: () => {
      sdk.graphql.interceptEntryCount().then(q => {
        let maxRowId = q.interceptEntries.count.value;
        let currentQuery = cleanQuery(sdk.httpHistory.getQuery())
        let newQuery = `row.id.gt:${maxRowId}`
        if(currentQuery !== "") {
          newQuery = `${currentQuery} and ${newQuery}`
        }
        // console.log(`Setting new Query: ${newQuery}`)
        sdk.httpHistory.setQuery(newQuery);
      })
    },
    group: "NewRequests",
  })
  sdk.commandPalette.register(`newrequests-addfilter`);
  sdk.shortcuts.register(`newrequests-addfilter`, ['cmd', 'n']);

  sdk.commands.register(`newrequests-removefilter`, {
    name: `Removes the NewRequests row filter`,
    run: () => {
      sdk.graphql.interceptEntries().then(q => {
        sdk.httpHistory.setQuery(cleanQuery(sdk.httpHistory.getQuery()));
      });
    },
    group: "NewRequests",
  })
  sdk.commandPalette.register(`newrequests-removefilter`);
  sdk.shortcuts.register(`newrequests-removefilter`, ['cmd', 'shift', 'n']);
};
