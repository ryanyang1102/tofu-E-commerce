(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2197"],{2355:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"nav_space"},[s("div",{staticClass:"container py-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-8 mb-8 mb-lg-0"},[s("table",{staticClass:"table mb-8"},[s("tbody",{staticClass:"tbody"},t._l(t.cart.carts,(function(a){return s("tr",{key:a.id},[s("td",{staticClass:"align-middle"},[s("button",{staticClass:"btn btn-outline-red d-none d-md-block",attrs:{type:"button"},on:{click:function(s){return t.removeCartItem(a.id)}}},[s("i",{staticClass:"fas fa-trash-alt"})]),s("a",{staticClass:"close_icon d-block d-md-none",on:{click:function(s){return t.removeCartItem(a.id)}}},[s("i",{staticClass:"fas fa-times"})])]),s("td",{staticClass:"d-none d-md-block"},[s("img",{attrs:{src:a.product.imageUrl,width:"120",alt:""}})]),s("td",{staticClass:"align-middle fz-6"},[t._v(" "+t._s(a.product.title)+" ")]),s("td",{staticClass:"align-middle"},[s("div",{staticClass:"btn-group",attrs:{role:"group"}},[s("button",{staticClass:"btn btn-outline-lightGray",attrs:{type:"button"},on:{click:function(s){return t.minusBuyNum(a.id)}}},[t._v("-")]),s("button",{staticClass:"btn btn-outline-lightGray",attrs:{disabled:""}},[t._v(t._s(a.qty))]),s("button",{staticClass:"btn btn-outline-lightGray",attrs:{type:"button"},on:{click:function(s){return t.addBuyNum(a.id)}}},[t._v("+")])])]),a.product.price?s("td",{staticClass:"align-middle fz-4"},[t._v(" NT "+t._s(t.currencyFilter(a.product.price))+" / "+t._s(a.product.unit)+" ")]):s("td",{staticClass:"align-middle fz-4"},[t._v(" NT "+t._s(t.currencyFilter(a.product.origin_price))+" / "+t._s(a.product.unit)+" ")])])})),0)])]),s("div",{staticClass:"col-lg-4"},[s("div",{staticClass:"border p-4 radius-2"},[s("h6",{staticClass:"d-flex justify-content-between fz-5 fw_bold"},[s("span",[t._v("總計金額")]),s("span",[t._v("NT "+t._s(t.currencyFilter(t.total))+" 元")])]),s("button",{staticClass:"btn btn-outline-red w-100 fw_bold fz-5 mt-4",attrs:{type:"button"},on:{click:function(a){return t.addManyToCart(t.$router,"/cart_order")}}},[t._v("確認結帳")])])])])])])},c=[],n=s("5530"),r=(s("a9e3"),s("ac1f"),s("5319"),s("b680"),s("159b"),s("2f62")),e={methods:Object(n["a"])({removeCartItem:function(t){this.$store.dispatch("removeCartItem",t)},minusBuyNum:function(t){this.$store.dispatch("minusBuyNum",t)},addBuyNum:function(t){this.$store.dispatch("addBuyNum",t)},addManyToCart:function(t,a){this.$store.dispatch("addManyToCart",{router:t,path:a})},currencyFilter:function(t){var a=Number(t);return"$".concat(a.toFixed(0).replace(/./g,(function(t,a,s){var i=a&&"."!==t&&(s.length-a)%3===0?", ".concat(t).replace(/\s/g,""):t;return i})))}},Object(r["b"])(["getCart"])),computed:Object(n["a"])({total:function(){var t=this,a=0;return t.cart.carts&&t.cart.carts.forEach((function(t){a+=t.qty*t.product.price})),a}},Object(r["c"])(["cart","tempCart"])),created:function(){this.getCart(),this.$store.dispatch("checkoutCartPage",!1)}},o=e,l=s("2877"),u=Object(l["a"])(o,i,c,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b2197.984fc161.js.map