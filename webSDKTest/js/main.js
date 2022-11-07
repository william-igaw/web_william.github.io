// (function (window, document) {
//     if (typeof window !== 'undefined' && !window.adbrix) {
//         var adbrix = { queue: [] };
//         var agent = navigator.userAgent.toLowerCase();
//         var scriptEl = document.createElement('script');
//         var sdk = (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf('msie') !== -1) ? 'abx-web-sdk.ie.dev.js' : 'abx-web-sdk.dev.js';
//         scriptEl.type = 'text/javascript';
//         scriptEl.async = true;
//         scriptEl.src = '//s3-ap-northeast-1.amazonaws.com/static.adbrix.io/web-sdk/test/' + sdk;
//         scriptEl.onload = function () {
//             if (!window.adbrix.runQueuedFunctions) {
//                 console.log('[adbrix] Error: could not load SDK');
//             } else {
//                 window.adbrix.runQueuedFunctions();
//             }
//         };
//         var scriptElement = document.getElementsByTagName('script')[0];
//         scriptElement.parentNode.insertBefore(scriptEl, scriptElement);

//         var supportFuns = ['init', 'onInitialized', 'login', 'getUserId', 'logout', 'userProperty.get', 'userProperty.getAll', 'userProperty.addOrUpdate', 'userProperty.remove', 'userProperty.removes', 'common.signUp', 'common.invite', 'common.useCredit', 'common.purchase', 'event.send', 'debug.traceListener', 'commerceAttr.categories', 'commerceAttr.product', 'commerce.viewHome', 'commerce.categoryView', 'commerce.productView', 'commerce.addToCart', 'commerce.addToWishList', 'commerce.reviewOrder', 'commerce.refund', 'commerce.search', 'commerce.share', 'commerce.listView', 'commerce.cartView', 'commerce.paymentInfoAdded', 'game.tutorialComplete', 'game.characterCreated', 'game.stageCleared', 'game.levelAchieved'];
//         supportFuns.forEach(function (fnName) {
//             var fnSplits = fnName.split('.');
//             var fnNameOneLevel = fnSplits.pop();

//             fnSplits.reduce(function (_adbrix, _fnName) {
//                 return (_adbrix[_fnName] = _adbrix[_fnName] || {});
//             }, adbrix)[fnNameOneLevel] = function () {
//                 adbrix.queue.push([fnName, arguments]);
//             };
//         });
//         window.adbrix = adbrix;
//     }
// })(window, document);

// 상용서버 init
// transport: 'BEACON' | 'XHR' | 'IMAGE' // 셋중 하나 사용
window.adbrix.init({
    appkey: 'RruMWZd2WkOnGtPSltICMw',
    webSecretkey: 'GitraCMvtEKSsAehZzueAw',
    isOptOut: false, //json의 optout 상태 확인
    isExecPageViewEvent: false, // pageview 이벤트 호출 확인
    shareSubdomainCookie: false, // ?? 
    isIncludeReferrer: false, // 추가 리퍼러값 확인
    isIncludeUtm: true, // ?? utm 광고를 추적합니다.
    isIncludeGclid: false, // ?? gclid를 추적합니다.
    isIncludeNaver: false, // ?? naver 광고를 추적합니다.
    isIncludeFbclid: false, // ??  페이스북에서 진입시 fbclid 파람 확인
    transport: 'BEACON'
});


// 개발서버 init
// transport: 'BEACON' | 'XHR' | 'IMAGE' // 셋중 하나 사용
// window.adbrix.init({
//     appkey: 'cAVuvs0NME6CYykRMb0Ecw',
//     webSecretkey: 'kKtoq4zZME2bcA9Lnreryg',
//     isOptOut: false, //json의 optout 상태 확인
//     isExecPageViewEvent: false, // pageview 이벤트 호출 확인
//     shareSubdomainCookie: false, // ?? 
//     isIncludeReferrer: false, // 추가 리퍼러값 확인
//     isIncludeUtm: true, // ?? utm 광고를 추적합니다.
//     isIncludeGclid: false, // ?? gclid를 추적합니다.
//     isIncludeNaver: false, // ?? naver 광고를 추적합니다.
//     isIncludeFbclid: false, // ??  페이스북에서 진입시 fbclid 파람 확인
//     transport: 'BEACON'
// });

// adbrix.onInitialized(() => {
//     adbrix.userProperty.getAll(); // Get All UserProperty
//     adbrix.userProperty.get('email'); // Get Certian UserProperty
// });

var is_android = false,
    is_ios = false;

$(document).ready(function () {
    adbrix.commerce.viewHome();
    console.log("ready:::::::");
    if (/Android/i.test(navigator.userAgent)) {
        is_android = true;
        is_ios = false;
        console.log("android device!!!");
        $("#main-container-title").text("Android!!!");
        $("#main-side-logo").css("font-size", "15px");
        $("#1").text("유저");
        $("#2").text("커스텀");
        $("#3").text("공통");
        $("#4").text("결제");
        $("#5").text("커머스");
        $("#6").text("게임");
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        is_ios = true;
        is_android = false;
        console.log("ios device!!!");
        $("#main-container-title").text("ios!!!");
        $("#main-side-logo").css("font-size", "15px");
        $("#1").text("유저");
        $("#2").text("커스텀");
        $("#3").text("공통");
        $("#4").text("결제");
        $("#5").text("커머스");
        $("#6").text("게임");
    } else {
        is_android = false;
        is_ios = false;
        console.log("only support mobile devices!!!");
        $("#main-container-title").text("only support mobile devices!!!!!!");
        $("#main-side-logo").css("font-size", "30px");
        $("#1").text("유저 이벤트");
        $("#2").text("커스텀 이벤트");
        $("#3").text("공통(일반) 이벤트");
        $("#4").text("결제하기 이벤트");
        $("#5").text("커머스 이벤트");
        $("#6").text("게임 이벤트");
    }
    $("#main-container").css("margin-left", $("#main-side").width());
});

$(window).resize(function () {
    $("#main-container").css("margin-left", $("#main-side").width());
    $("#event-title").css("width", $("#main-container").width());
    $(".eventClass").css("width", $("#main-container").width());
});

function listButton(e) {
    $("#event-title").css("display", "inline");
    if (e.id === "main-side-logo") {
        $(".container-view").css("display", "none");
        $("#event-title").css("display", "none");
        $("#main-container-title").html("Web_SDK");
        if (is_android) {
            Android.viewHome();
        } else if (is_ios) {

        } else {

        }
    }
    if (e.id === "1") {
        console.log("유저분석");
        $(".container-view").css("display", "none");
        $("#container-event1").css("display", "inline");
        $("#main-container-title").html("유저분석 이벤트");
    }
    else if (e.id === "2") {
        console.log("커스텀 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event2").css("display", "inline");
        $("#main-container-title").html("커스텀 이벤트");
    }
    else if (e.id === "3") {
        console.log("공통(일반) 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event3").css("display", "inline");
        $("#main-container-title").html("공통(일반) 이벤트");
    }
    else if (e.id === "4") {
        console.log("결제하기 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event4").css("display", "inline");
        $("#main-container-title").html("결제하기 이벤트");
    }
    else if (e.id === "5") {
        console.log("커머스 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event5").css("display", "inline");
        $("#main-container-title").html("커머스 이벤트");
    }
    else if (e.id === "6") {
        console.log("게임 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event6").css("display", "inline");
        $("#main-container-title").html("게임 이벤트");
    }
    else if (e.id === "7") {
        console.log("테스트 페이지");
        $(".container-view").css("display", "none");
        $("#container-event7").css("display", "inline");
        $("#main-container-title").html("테스트페이지");
    }
};


function login(){
    var loginid = $('#loginInput').val();
    console.log("loginid:::" + loginid);
    if (is_android) {
        Android.login(loginid);
    } else if (is_ios) {

    } else {
        adbrix.login(loginid);
    }
}

function logout(){
    console.log("logout:::");
    if (is_android) {
        Android.logout();
    } else if (is_ios) {

    } else {
        adbrix.logout();
    }
}

function userProperty() {
    var age = $('#userProperty_AgeInput').val();
    var gender = $('input[name=userProperty_Gender]:checked').val();
    var usernick = $('#userProperty_UsernickInput').val();
    var place = $('#userProperty_PlaceInput').val();
    var height = $('#userProperty_HeightInput').val();
    var married = $('input[name=userProperty_Married]:checked').val();
    console.log("place:::" + place);
    console.log("usernick:::" + usernick);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("height:::::" + height);
    console.log("married:::::" + married);
    if (is_android) {
        Android.userPropertys(age, gender, usernick, place, height, married);
    } else if (is_ios) {

    } else {
        adbrix.userProperty.addOrUpdate('age', age);
        adbrix.userProperty.addOrUpdate('gender', gender);
        adbrix.userProperty.addOrUpdate('usernick', usernick);
        adbrix.userProperty.addOrUpdate('place', place);
        adbrix.userProperty.addOrUpdate('height', height);
        adbrix.userProperty.addOrUpdate('married', married);
    }
}

function customEvent() {
    var customkey = JSON.stringify($('#custom_KeyInput').val());
    var customValue = JSON.stringify($('#custom_ValueInput').val());
    adbrix.event.send('william', { customkey: customValue })
}

function signUp() {
    var loginid = $('#loginInput').val();
    var SignChannel = $("#SignChannel option:selected").val();
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    console.log("loginid:::" + loginid);
    console.log("SignChannel:::" + SignChannel);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);
    if (is_android) {
        Android.signUp(SignChannel, loginid, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.signUp(SignChannel, { "userRegister": "userRegister", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    }
}

function userInvite() {
    var SignChannel = $("#SignChannel option:selected").val();
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    console.log("SignChannel:::" + SignChannel);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);
    if (is_android) {
        Android.invite(SignChannel, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.invite(SignChannel, "william", { "userInvite": "userInvite", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    }
}

function usingCredit() {
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    var credit = Number($('#usingCredit_CreditInput').val());
    console.log("credit:::" + credit);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);
    if (is_android) {
        Android.useCredit(credit, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.useCredit(credit, { "usingCredit": "usingCredit", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    }
}

function purchase() {
    var orderId = $('#purchase_orderIDInput').val();
    var orderSales = Number($('#purchase_orderSalesInput').val());
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var discount = Number($('#purchase_discountInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    // var delivery = $('#purchase_deliveryInput').val();
    var payment = $("#paymentEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("orderId:::::::::" + orderId);
    console.log("orderSales:::::::::" + orderSales);
    console.log("productId:::::::::" + productId);
    console.log("productName:::::::::" + productName);
    console.log("price:::::::::" + price);
    console.log("quantity:::::::::" + quantity);
    console.log("discount:::::::::" + discount);
    console.log("currencyEnum:::::::::" + currencyEnum);
    // console.log("delivery:::::::::" + delivery);
    console.log("payment:::::::::" + payment);
    //하이브리드 연결
    console.log("is_android:::::::::" + is_android);
    var products = [];
    product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    products.push(product);
    adbrix.common.purchase(
        orderId,                      // 주문번호 order_id
        products,                     // 상품리스트 product[]
        orderSales,                      // 전체 주문 금액 order sales
        discount,                      // 할인 금액 discount
        1000,                      // 배송비 delivery charge
        payment,                        // 결제 방법 payment
        null              // 결제 프로퍼티 properties
    );
    if (is_android) {
        console.log("Android");
        Android.purchase(orderId, productId, productName, price, quantity, currencyEnum, categories);
        Android.productView(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {
        // console.log("IOS");
        // var query_form = "orderId={0}&productId={1}&productName={2}&price={3}&quantity={4}&currencyEnum={5}&categories={6}";
        // window.location.href = "adbrix://purchase?" + String.format(query_form, orderId, productId, productName, price, quantity, currencyEnum, categories);
    } else {
        console.log("please test with webview.");

        var categories = adbrix.commerceAttr.categories(
            "category1",           // 카테고리 1 (필수)
            "category2",           // 카테고리 2
            "category3",           // 카테고리 3
            "category4",           // 카테고리 4
            "category5"            // 카테고리 5
        );

        var product = adbrix.commerceAttr.product(
            productId,            // 상품번호 product_id
            productName,          // 상품이름 product_name
            price,                 // 상품단가 price
            quantity,              // 구매수량 quantity
            discount,              // 할인금액 discount
            currencyEnum,          // 구매화폐 정보 currencyEnum
            categories,           // 카테고리 정보 category
            null        // 구매 프로퍼티 properties
        );

        // 상품정보 리스트
        // var products = [];
        products.push(product);
        adbrix.common.purchase(
            orderId,                      // 주문번호 order_id
            products,                     // 상품리스트 product[]
            orderSales,                      // 전체 주문 금액 order sales
            discount,                      // 할인 금액 discount
            1000,                      // 배송비 delivery charge
            payment,                        // 결제 방법 payment
            null              // 결제 프로퍼티 properties
        );
    }
}

function addToCart() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);

    if (is_android) {
        Android.addToCart(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function viewList() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (is_android) {
        Android.viewList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function addToWishList() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (is_android) {
        Android.addToWishList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function share() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (is_android) {
        Android.share(SignChannel, productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function category() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIDInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    let products = [];

    const categories = adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아');
    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.categoryView();
    // @ts-ignore
    // adbrix.commerce.categoryView('한글');
    // @ts-ignore
    // adbrix.commerce.categoryView(categories);
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, {});
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, product);
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, products, []);

    // adbrix.commerce.categoryView(categories, products);
    // adbrix.commerce.categoryView(categories, products, { 'test': 'root' });

    // console.log(adbrix.commerce.categoryView(categories, products));
    console.log(adbrix.commerce.categoryView(categories, products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.category_event(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function productDetail() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);
    // @ts-ignore
    // adbrix.commerce.productView();
    // @ts-ignore
    // adbrix.commerce.productView('한글');
    // @ts-ignore
    // adbrix.commerce.productView(products);

    // adbrix.commerce.productView(product);
    // adbrix.commerce.productView(product, { 'test': 'root' });

    // console.log(adbrix.commerce.productView(product));
    console.log(adbrix.commerce.productView(product, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.productDetail(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }

}

function commerce_addToCart() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    // const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test' });

    // let products = [];
    // products.push(product);
    let products = [];
    for (var i = 0; i <= 99; i++) {
        console.log(i);
        // const product = adbrix.commerceAttr.product('test_product_id' + i, 'product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5', 30, 30, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root"});

        const product = adbrix.commerceAttr.product('test_product_id' + i, 'product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5', 30, 30, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root", "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
        products.push(product);
    }
    // const product1 = adbrix.commerceAttr.product('product_id_5', 'product5', 30, 30, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });
    // products.push(product1);
    // const product2 = adbrix.commerceAttr.product('product_id_6', 'product6', 50, 50, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product' });
    // products.push(product2);
    // const product3 = adbrix.commerceAttr.product('product_id_7', 'product7', 70, 70, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product' });
    // products.push(product3);
    // const product4 = adbrix.commerceAttr.product('product_id_8', 'product8', 90, 90, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'product' });
    // products.push(product4);

    // @ts-ignore
    // adbrix.commerce.addToCart();
    // @ts-ignore
    // adbrix.commerce.addToCart('한글');
    // @ts-ignore
    // adbrix.commerce.addToCart(product);

    // adbrix.commerce.addToCart(products);
    adbrix.commerce.addToCart(products, { 'test1': null, 'test2': 'root', 'test3': 'root', 'test4': 'root', 'test5': 'root', 'test6': 'root', 'test7': 'root' });
    // adbrix.commerce.addToCart(products, { 'test': 'root' });

    // console.log(adbrix.commerce.addToCart(products));
    // console.log(adbrix.commerce.addToCart(products, { 'test': 'root' }));

    if (is_android) {
        Android.commerce_addToCart(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function commerce_addToWishList() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);
    // @ts-ignore
    // adbrix.commerce.addToWishList();
    // @ts-ignore
    // adbrix.commerce.addToWishList('한글');
    // @ts-ignore
    // adbrix.commerce.addToWishList(products);

    // adbrix.commerce.addToWishList(product);
    // adbrix.commerce.addToWishList(product, { 'test': 'root' });

    // console.log(adbrix.commerce.addToWishList(product));
    console.log(adbrix.commerce.addToWishList(product, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.commerce_addToWishList(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function reviewOrder() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);
    // @ts-ignore
    // adbrix.commerce.reviewOrder();
    // @ts-ignore
    // adbrix.commerce.reviewOrder('한글');
    // @ts-ignore
    // adbrix.commerce.reviewOrder('orderid_1', products, 'test');
    // @ts-ignore
    // adbrix.commerce.reviewOrder(product);

    // adbrix.commerce.reviewOrder('orderid_1', products);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10, 20);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10, 20, { 'test': 'root' });

    // console.log(adbrix.commerce.reviewOrder('orderid_1', products));
    // console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10));
    // console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10, 20));
    console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10, 20, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.reviewOrder(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function refundOrder() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.refund();
    // @ts-ignore
    // adbrix.commerce.refund('한글');
    // @ts-ignore
    // adbrix.commerce.refund('orderid_1', products, 'test');
    // @ts-ignore
    // adbrix.commerce.refund(product);

    // adbrix.commerce.refund('orderid_1', products);
    // adbrix.commerce.refund('orderid_1', products, 10);
    // adbrix.commerce.refund('orderid_1', products, 10);
    // adbrix.commerce.refund('orderid_1', products, 10, { 'test': 'root' });

    // console.log(adbrix.commerce.refund('orderid_1', products));
    // console.log(adbrix.commerce.refund('orderid_1', products, 10));
    // console.log(adbrix.commerce.refund('orderid_1', products, 10));
    adbrix.commerce.refund('orderid_1', products, 10, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });


    if (is_android) {
        Android.refundOrder(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function searchProduct() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.search();
    // @ts-ignore
    // adbrix.commerce.search(null);
    // @ts-ignore
    // adbrix.commerce.search('keyword', products, 'test');
    // @ts-ignore
    // adbrix.commerce.search(product);

    // adbrix.commerce.search('keyword', products);
    // adbrix.commerce.search('keyword', products,);
    // adbrix.commerce.search('keyword', products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    // console.log(adbrix.commerce.search('keyword', products));
    // console.log(adbrix.commerce.search('keyword', products,));
    console.log(adbrix.commerce.search('keyword', products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.searchProduct(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function shareProduct() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    var commerce_signChannel = $("#commerce_signChannel option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);
    console.log("commerce_signChannel:::::" + commerce_signChannel);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.share();
    // @ts-ignore
    // adbrix.commerce.share(null);
    // @ts-ignore
    // adbrix.commerce.share('keyword', products, 'test');
    // @ts-ignore
    // adbrix.commerce.share(product);

    // 확인 필요
    // adbrix.commerce.share(commerce_signChannel, products);
    // adbrix.commerce.share(commerce_signChannel, products,);
    // adbrix.commerce.share(commerce_signChannel, products, { 'test': 'root' });

    // console.log(adbrix.commerce.share(commerce_signChannel, products));
    // console.log(adbrix.commerce.share(commerce_signChannel, products,));
    console.log(adbrix.commerce.share(commerce_signChannel, products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.shareProduct(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function listViewProducts() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.listView();
    // @ts-ignore
    // adbrix.commerce.listView('한글');
    // @ts-ignore
    // adbrix.commerce.listView(product);

    // adbrix.commerce.listView(products);
    // adbrix.commerce.listView(products, { 'test': 'root' });

    // console.log(adbrix.commerce.listView(products));
    console.log(adbrix.commerce.listView(products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.listViewProducts(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function cartViewProducts() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.cartView();
    // @ts-ignore
    // adbrix.commerce.cartView('한글');
    // @ts-ignore
    // adbrix.commerce.cartView(product);

    // adbrix.commerce.cartView(products);
    // adbrix.commerce.cartView(products, { 'test': 'root' });

    // console.log(adbrix.commerce.cartView(products));
    console.log(adbrix.commerce.cartView(products, { 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.cartViewProducts(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function paymentInfoAdded() {
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_discount = Number($('#commerce_discountInput').val());
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_discount:::::" + commerce_discount);

    // @ts-ignore
    // adbrix.commerce.paymentInfoAdded('한글');

    // adbrix.commerce.paymentInfoAdded();
    // adbrix.commerce.paymentInfoAdded({ 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" });

    // console.log(adbrix.commerce.paymentInfoAdded());
    console.log(adbrix.commerce.paymentInfoAdded({ 'test': 'root', "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root" }));

    if (is_android) {
        Android.paymentInfoAdded(commerce_grade, commerce_howmany_buy, commerce_discount);
        showAndroidToast("payment");
    } else if (is_ios) {

    } else {

    }
}

function tutorialComplete() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_tutorial = $('input[name=game_tutorial]:checked').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_tutorial:::::" + game_tutorial);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root",
    };

    // @ts-ignore
    // adbrix.game.tutorialComplete('한글');
    // @ts-ignore
    // adbrix.game.tutorialComplete(true, '테스트');
    // @ts-ignore
    // adbrix.game.tutorialComplete(null, gameAttr);

    adbrix.game.tutorialComplete(true);
    adbrix.game.tutorialComplete(true, gameAttr);

    console.log(adbrix.game.tutorialComplete(true));
    console.log(adbrix.game.tutorialComplete(true, gameAttr));

    if (is_android) {
        Android.tutorialComplete(game_grade, game_howmany_buy, game_discount, game_tutorial);
        showAndroidToast("tutorial");
    } else if (is_ios) {

    } else {

    }
}

function characterCreated() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root",
    };

    // @ts-ignore
    // adbrix.game.characterCreated('한글');
    // @ts-ignore
    // adbrix.game.characterCreated(true, '테스트');

    adbrix.game.characterCreated();
    adbrix.game.characterCreated(gameAttr);

    console.log(adbrix.game.characterCreated());
    console.log(adbrix.game.characterCreated(gameAttr));

    if (is_android) {
        Android.characterCreated(game_grade, game_howmany_buy, game_discount);
        showAndroidToast("character");
    } else if (is_ios) {

    } else {

    }
}

function stageCleared() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    var game_stageCleared = $("#stageCleared option:selected").val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_stageCleared:::::" + game_stageCleared);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "root", "test3": "root", "test4": "root", "test5": "root", "test6": "root", "test7": "root", "test8": "root",
    };

    // @ts-ignore
    // adbrix.game.stageCleared(123213);
    // @ts-ignore
    // adbrix.game.stageCleared(null);
    // @ts-ignore
    // adbrix.game.stageCleared();
    // @ts-ignore
    // adbrix.game.stageCleared(true);
    // @ts-ignore
    // adbrix.game.stageCleared({});
    // @ts-ignore
    // adbrix.game.stageCleared(true, '테스트');

    adbrix.game.stageCleared('1-5');
    adbrix.game.stageCleared('1-5', gameAttr);

    console.log(adbrix.game.stageCleared('1-5'));
    console.log(adbrix.game.stageCleared('1-5', gameAttr));

    if (is_android) {
        Android.stageCleared(game_grade, game_howmany_buy, game_discount, game_stageCleared);
        showAndroidToast("stage");
    } else if (is_ios) {

    } else {

    }
}

function levelAchieved() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    var game_levelAchieved = $('#game_levelAchieved').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_levelAchieved:::::" + game_levelAchieved);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        'event': null,
        'event1': 'test'
    };

    // @ts-ignore
    // adbrix.game.levelAchieved('123213');
    // @ts-ignore
    // adbrix.game.levelAchieved(null);
    // @ts-ignore
    // adbrix.game.levelAchieved();
    // @ts-ignore
    // adbrix.game.levelAchieved(true);
    // @ts-ignore
    // adbrix.game.levelAchieved({});
    // @ts-ignore
    // adbrix.game.levelAchieved(true, '테스트');

    adbrix.game.levelAchieved(1);
    adbrix.game.levelAchieved(1, gameAttr);

    console.log(adbrix.game.levelAchieved(1));
    console.log(adbrix.game.levelAchieved(1, gameAttr));

    if (is_android) {
        Android.levelAchieved(game_grade, game_howmany_buy, game_discount, game_levelAchieved);
        showAndroidToast("level");
    } else if (is_ios) {

    } else {

    }
}

function showAndroidToast(toast) {
    if (is_android) {
        Android.showToast(toast);
    } else if (is_ios) {

    } else {

    }
}
var url = $('#url').val()

function GoogelURL(url) {

}