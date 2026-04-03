import { defineStore } from "pinia";

import NavTree from "~~/assets/NavTree";
import useAuth from "~/store/auth";
import { useGlobalConfig } from "~/store/index";

/*
  Overall concept of the application of restrictions has changed,
  A declaration of all accessible links must be placed within this file through the use of NavTree.
  This ensures common dialect with all components concerned with navigation.

  * Named variables are declared
  * Contents of each variables are filtered through their navigability criteria.
  * yay.
  
  All of these declarations are filtered according to the page-resources fetched from the UAC provider.
*/

type NavMap = {
  [key: string]: (NavTree[] | any)
}

const GLOBAL_NAVS: NavMap = {
  administrative_navs: [
    new NavTree("Overview", "admin", "mdi-home"),
    new NavTree("Domain Management", "admin-domain-mgmt", "mdi-domain"),
    new NavTree("Policy Management", "admin-policy", "mdi-account-tie-hat"),
    new NavTree("Registry", "admin-registry", "mdi-folder-wrench"),
  ],

  mgmt_navs: [
    new NavTree("Overview", "admin-domain", "mdi-home"),
    new NavTree("Access Policies", "admin-domain-access-policies", "mdi-key-chain-variant"),
    new NavTree("Security Policies", "admin-domain-security-policies", "mdi-shield-lock"),
    new NavTree("Access Templates", "admin-domain-access-templates", "mdi-form-select"),
    new NavTree("User Management", "admin-domain-user-management", "mdi-account-multiple-outline"),
    new NavTree("Resource Management", "admin-domain-resource-management", "mdi-cube-outline")
  ],

  account_navs: [
    new NavTree("Overview", "account-settings", "mdi-feature-search-outline"),
    new NavTree("Security", "account-security", "mdi-security"),
    new NavTree("Notification", "account-notifications", "mdi-bell-cog"),
    new NavTree("Privacy", "account-privacy", "mdi-badge-account-outline")
  ],


  std_header_navs: [
    new NavTree("Documentation", "documentation", "mdi-book-open"),
    new NavTree("Admin", "admin", "mdi-toolbox")
  ],
    systems_navs: [
    new NavTree("Homepage", "sms-homepage", "mdi-home"),
    // new NavTree("Dashboards", "sms-dashboard", "mdi-view-dashboard"),
    new NavTree("Projects", "project-management", "mdi-folder-wrench"),
    new NavTree("Supplier", "supplier", "mdi-truck"),
    new NavTree("Purchasing", "purchasing", "mdi-cart-variant"),
         new NavTree("Warehouse", "warehouse", "mdi-home"),
        new NavTree("Motorpool", "motorpool", "mdi-car"),

  ],

  // systems_navs: [
  //   new NavTree("Homepage", "sms-homepage", "mdi-home"),
  //   new NavTree("Dashboards", "sms-dashboard", "mdi-view-dashboard"),
  //   new NavTree("Reclassification", "sms-reclassification", "mdi-list-box-outline"),
  //   new NavTree("Endorsement", "sms-endorsement", "mdi-list-box-outline"),
  //   new NavTree("Application Summary", "sms-summary", "mdi-list-box-outline"),
  //   new NavTree("Exam Result", "exam", "mdi-list-box-outline"),
  //   new NavTree("Maintenance Panel", "exam-maintainance", "mdi-list-box-outline"),

  // ],

  dev_navs: [
    new NavTree("Overview", "admin-domain-service", "mdi-home"),
    new NavTree("Resources", "admin-domain-service-resources", "mdi-semantic-web"),
    new NavTree("Schemas", "admin-domain-service-schemas", "mdi-format-list-bulleted-type")
  ],


  /* Service Navs */
  overview_navs: [
    new NavTree("Description", "admin-domain-service"),
    new NavTree("Reports", "admin-domain-service-report"),
    new NavTree("Releases", "admin-domain-service-releases"),
    new NavTree("License", "admin-domain-service-license"),
  ],

  resource_navs: [
  ],

  schema_navs: [

  ]
}

Object.values(GLOBAL_NAVS).forEach((v) => {
  v.forEach((t: any) => t.propagate_path());
})

export default defineStore({
  id: "navtree",
  state: (): NavMap => ({
    ...Object.fromEntries(Object.keys(GLOBAL_NAVS).map((k) => [k, []])),
    paths: {},
    grant_request: null
  }),

  actions: {
    async fetch_resources() {
      const cfg = useRuntimeConfig();
      const gcfg = useGlobalConfig();
      const auth = useAuth();
      const router = useRouter();
      const route = useRoute();
      const { $socket, $rest } = useNuxtApp();
      this.$state.paths = {};

      router.getRoutes();

      this.$state.grant_request = $rest(`${cfg.public.API}/auth/get-page-resources`, {
        method: "GET",
        key: `${Date.now()}`,
        credentials: "include"
      });


      const grant_result = await this.$state.grant_request;
      //Kick-out if session was found to be invalid.
      /*@ts-ignore */
      if (grant_result.error) {
        auth.logged_in = false;
        gcfg.ready = true;
        if ($socket && $socket.is_authorized) $socket.is_authorized.value = false;

        return router.push({ name: "index" })
      }

      if (grant_result.data) {
        /*@ts-ignore */
        let grant_ref = Object.fromEntries(grant_result.data.map((v) => {
          const { name, path } = v;
          return [name, path];
        }));

        this.$state = Object.fromEntries(Object.entries(GLOBAL_NAVS).map(([k, v]) => {

          return [k, v.filter((g: any) => {
            const res = grant_ref[g.path];
            if (res && !this.$state.paths[g.path]) this.$state.paths[g.path] = g;
            return res;
          })];
        }));
        this.$state.grant_request = null;

        if (!gcfg.ready) {
          gcfg.ready = true;

          setTimeout(() => {
            if (gcfg.referrer) console.log(`Referred to ${gcfg.referrer}`);

            const result = ["loading", "index"].filter((v) => gcfg.referrer.includes(v));

            if (gcfg.referrer === "loading") {
              router.push("account-profile");
            } else router.push(gcfg.referrer || "/");
          }, 50);
        }
      }
    },

    is_navigable(path: string) {
      const gcfg = useGlobalConfig();
      //Performs a recursive search against the underlying state for matching path.
      //Once found, it collapses to return a boolean value signifying navigability of said path.      

      //Nevermind, inserted a dict within state for efficient clearance-checks.
      if (gcfg.ready) return Boolean(this.$state.paths[path]);

      return false;
    }
  }
})