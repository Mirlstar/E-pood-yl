import { loadCategoryView } from "./categoryView.js";
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";

export const navigate = (view, param) => {
    const views = {
        category: () => loadCategoryView(param || "all"),
        product: () => loadProductView(param),
        cart: () => loadCartView(),
    };

    // Vali õige vaade
    if (views[view]) {
        views[view]();


        const encodedParam = encodeURIComponent(param);
        const newUrl =
            view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`;
        window.history.pushState({}, "", newUrl);
    }
};

//event listener millega saab edasi v tagasi liikuda
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    const [_, view, param] = path.split("/");
    const decodedParam = decodeURIComponent(param);
    navigate(view || "category", decodedParam);
});
