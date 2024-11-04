import { displayAllProducts } from "./categoryView.js";
import { displayProduct } from "./productView.js";
import { loadCartView } from "./cartView.js";

export const navigate = (view, param) => {
    const views = {
        category: () => displayAllProducts(param || "all"), // Kasuta vaikeväärtust "all" kategooriana
        product: () => displayProduct(param), // üks toode
        cart: () => loadCartView(), // Kuvab ostukorvi vaate
    };

    // Vali ja käivita sobiv vaade
    if (views[view]) {
        views[view]();

        // Muuda URL-i ilma lehte uuesti laadimata
        const encodedParam = encodeURIComponent(param);
        const newUrl =
            view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`;
        window.history.pushState({}, "", newUrl);
    }
};

// Sündmuse kuulaja, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauseris
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    const [_, view, param] = path.split("/");
    const decodedParam = decodeURIComponent(param);
    navigate(view || "category", decodedParam);
});