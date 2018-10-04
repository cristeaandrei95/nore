import window from "@nore/std/global";
import { qs, render } from "@nore/pwa";
import views from "~/views";
import $ from "~/styles";

const container = document.getElementById("application");

const state = {
	title: window.document.head.title || "navaru.com",
	path: window.location.pathname,
	query: qs.parse(window.location.search),
	hash: window.location.hash,
};

render({ state, container, children: views, class: $.application });

// enable HMR (Hot Module Replacement)
if (module.hot) {
	module.hot.accept();
}
