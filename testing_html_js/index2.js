// $("#search-criteria").on("keyup", function () {
//     var g = $(this).val().toLowerCase();
//     $(".fbbox .fix label").each(function () {
//         var s = $(this).text().toLowerCase();
//         $(this).closest('.fbbox')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
//     });
// });​

// Get medication list from API

fetch("https://api.fda.gov/drug/drugsfda.json?limit=1000")
    .then(resp => resp.json())
    .then(data => renderAllProducts(data.results))

function renderAllProducts(data) {
    data.forEach(element => {
        getEachProduct(element.products)
    });
}

function getEachProduct(products) {
    products.forEach(product => {
        console.log(product.brand_name)
    });
}