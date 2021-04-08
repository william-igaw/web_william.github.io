// 상용서버 init
window.adbrix.init({
    appkey: 'RruMWZd2WkOnGtPSltICMw',
    webSecretkey: 'GitraCMvtEKSsAehZzueAw',
    isOptOut: true,
    isExecPageViewEvent: true,
    shareSubdomainCookie: true,
    isIncludeReferrer: true,
    isIncludeUtm: true,
    isincludeGclid: true,
    isIncludeNaver: true
});

//개발서버 init
// window.adbrix.init({
//     appkey: 'cAVuvs0NME6CYykRMb0Ecw',
//     webSecretkey: 'kKtoq4zZME2bcA9Lnreryg',
//     isOptOut: true,
//     isExecPageViewEvent: true,
//     shareSubdomainCookie: true,
//     isIncludeReferrer: true,
//     isIncludeUtm: true,
//     isincludeGclid: true,
//     isIncludeNaver: true
// });

adbrix.onInitialized(() => {
    adbrix.userProperty.getAll(); // Get All UserProperty
    adbrix.userProperty.get('email'); // Get Certian UserProperty
});

var is_android = false,
    is_ios = false;

$(document).ready(function () {
    console.log("ready:::::::");
    if (/Android/i.test(navigator.userAgent)) {
        is_android = true;
        is_ios = false;
        console.log("android device!!!");
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        is_ios = true;
        is_android = false;
        console.log("ios device!!!");
    } else {
        is_android = false;
        is_ios = false;
        console.log("only support mobile devices!!!");
    }
});

$("#main-container").css("margin-left", $("#main-side").width());
$(window).resize(function () {
    //창크기 변화 감지
    $("#main-container").css("margin-left", $("#main-side").width());
    if ($("#main-side").width() <= 95){
        $("#1").text("유저");
        $("#2").text("커스텀");
        $("#3").text("공통");
        $("#4").text("결제");
        $("#5").text("커머스");
        $("#6").text("게임");
    }else{
        $("#1").text("유저 이벤트");
        $("#2").text("커스텀 이벤트");
        $("#3").text("공통(일반) 이벤트");
        $("#4").text("결제하기 이벤트");
        $("#5").text("커머스 이벤트");
        $("#6").text("게임 이벤트");
    }
});

function listButton(e) {
    $("#event-title").css("display","inline");
    if(e.id === "main-side-logo"){
        $(".container-view").css("display","none");
        $("#event-title").css("display","none");
        $("#main-container-title").html("Web_SDK");
        if (is_android) {
            Android.viewHome();
        } else if (is_ios) {

        } else {

        }
    }
    if(e.id === "1") {
        console.log("유저분석");
        $(".container-view").css("display","none");
        $("#container-event1").css("display","inline");
        $("#main-container-title").html("유저분석 이벤트");
    }
    else if(e.id === "2") {
        console.log("커스텀 이벤트");
        $(".container-view").css("display","none");
        $("#container-event2").css("display","inline");
        $("#main-container-title").html("커스텀 이벤트");
    }
    else if(e.id === "3") {
        console.log("공통(일반) 이벤트");
        $(".container-view").css("display","none");
        $("#container-event3").css("display","inline");
        $("#main-container-title").html("공통(일반) 이벤트");
    }
    else if(e.id === "4") {
        console.log("결제하기 이벤트");
        $(".container-view").css("display","none");
        $("#container-event4").css("display","inline");
        $("#main-container-title").html("공통(일반) 이벤트");
    }
    else if(e.id === "5") {
        console.log("커머스 이벤트");
        $(".container-view").css("display","none");
        $("#container-event5").css("display","inline");
        $("#main-container-title").html("커머스 이벤트");
    }
    else if(e.id === "6") {
        console.log("게임 이벤트");
        $(".container-view").css("display","none");
        $("#container-event6").css("display","inline");
        $("#main-container-title").html("게임 이벤트");
    }
};


/** 이벤트 */

var loginid = $('#loginInput').val();
var SignChannel = $("#SignChannel option:selected").val();
var age = $('#userProperty_AgeInput').val();
var gender = $('input[name=userProperty_Gender]:checked').val();
var usernick = $('#userProperty_UsernickInput').val();
var place = $('#userProperty_PlaceInput').val();
var height = $('#userProperty_HeightInput').val();
var married = $('input[name=userProperty_Married]:checked').val();

var customkey = JSON.stringify($('#custom_KeyInput').val());
var customValue = JSON.stringify($('#custom_ValueInput').val());

var credit = Number($('#usingCredit_CreditInput').val());

var orderId = $('#purchase_orderIDInput').val();
var orderSales = $('#purchase_orderSalesInput').val();
var productId = $('#purchase_productIDInput').val();
var productName = $('#purchase_productNameInput').val();
var price = Number($('#purchase_priceInput').val());
var quantity = Number($('#purchase_quantityInput').val());
var discount = Number($('#purchase_discountInput').val());
var currencyEnum = $("#currencyEnum option:selected").val();
var delivery = $('#purchase_deliveryInput').val();
var payment = $("#paymentEnum option:selected").val();
var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };

function login(){
    console.log("loginid ::::: "+loginid);
    if (is_android) {
        Android.login(loginid);
    } else if (is_ios) {

    } else {
        adbrix.login(loginid);
    }
}

function logout(){
    if (is_android) {
        Android.logout();
    } else if (is_ios) {

    } else {
        adbrix.logout();
    }
}

function userProperty(){
    if (is_android) {
        Android.userProperty(age, gender, usernick, place, height, married);
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

function customEvent(){
    adbrix.event.send('customkey', {customkey: customValue});
}

function userRegister(){
    // 애드브릭스 userRegister 이벤트 넣으면 완료
    console.log("userRegister_userID ::::: " + SignChannel);

    if (is_android) {
        Android.signUp(SignChannel, loginid, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.signUp(SignChannel, { "userRegister": "userRegister" });
    }
}

function userInvite(){
    if (is_android) {
        Android.invite(SignChannel, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.invite(SignChannel, "william", { "userInvite": "userInvite" });
    }
}

function usingCredit(){
    if (is_android) {
        Android.useCredit(credit, age, gender, married);
    } else if (is_ios) {

    } else {
        adbrix.common.useCredit(credit, { "usingCredit": "usingCredit" });
    }
}

function purchase(){
    //하이브리드 연결
    console.log("is_android:::::::::" + is_android);
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
        var products = [];
        products.push(product);
        adbrix.common.purchase(
            orderId,                      // 주문번호 order_id
            products,                     // 상품리스트 product[]
            orderSales,                      // 전체 주문 금액 order sales
            discount,                      // 할인 금액 discount
            delivery,                      // 배송비 delivery charge
            payment,                        // 결제 방법 payment
            null              // 결제 프로퍼티 properties
        );
    }
    // event.preventDefault();
}

function addToCart(){
    if (is_android) {
        Android.addToCart(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function viewList(){
    if (is_android) {
        Android.viewList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function addToWishList(){
    if (is_android) {
        Android.addToWishList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (is_ios) {

    } else {

    }
}

function share(){
    if (is_android) {
        Android.share(sharingChannel, productId, productName, price, quantity, currencyEnum, categories);
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