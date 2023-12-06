/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import { ContextProvider } from "context/ContextProvider";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import SuratLayout from "layouts/Surat.js";

ReactDOM.render(
    <ContextProvider>
        <HashRouter>
            <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/surat`} component={SuratLayout} />
                <Redirect from={`/`} to="/admin/dashboard" />
            </Switch>
        </HashRouter>
    </ContextProvider>,
    document.getElementById("root")
);
