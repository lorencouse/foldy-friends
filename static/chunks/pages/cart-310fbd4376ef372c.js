(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[190],{1742:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cart",function(){return r(5478)}])},5478:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var s=r(5893);r(7294);var c=r(7467),l=r(1664),a=r.n(l),n=r(6075),i=r(8672),d=r(4336);let o=()=>{let{allProducts:e,cartItems:t}=(0,c.g)(),r=e.reduce((e,t)=>(e[t.id]=t,e),{});return 0===t.length?(0,s.jsx)(d.Q,{}):(0,s.jsxs)("div",{className:"cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3 max-w-4xl text-left",children:[(0,s.jsx)("h1",{children:"Cart"}),(0,s.jsx)("div",{className:"grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 w-full text-center"}),t.map(e=>{let t=r[e.id];return t?(0,s.jsx)(u,{product:t,cartItem:e},e.id):null}),(0,s.jsx)("div",{className:"flex justify-end",children:(0,s.jsx)(function(){let e=0;return t.forEach(t=>{let s=r[t.id];if(s){var c,l;let r=null!==(l=null!==(c=s.new_price)&&void 0!==c?c:s.new_price)&&void 0!==l?l:0;e+=r*t.quantity}}),(0,s.jsx)("div",{className:"cart-total mt-4",children:(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-semibold",children:"Total: "}),"$".concat(e.toFixed(2))]})})},{})}),(0,s.jsx)("div",{className:"flex justify-end ",children:(0,s.jsx)(a(),{href:"/checkout",children:(0,s.jsx)(n.bH,{label:"Checkout",onClick:()=>window.scrollTo(0,0)})})})]})},u=e=>{var t,r;let{product:c,cartItem:l}=e,n=null!==(r=null!==(t=c.new_price)&&void 0!==t?t:c.old_price)&&void 0!==r?r:1e3;return(0,s.jsxs)("div",{className:"grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200",children:[(0,s.jsx)("div",{className:"cart-item flex items-center justify-center",children:(0,s.jsx)(x,{cartItem:l})}),(0,s.jsx)("div",{className:"cart-item",children:(0,s.jsx)(a(),{href:"/product/".concat(c.id),children:(0,s.jsx)("img",{src:"/Assets/product_".concat(c.id,".png"),alt:c.name,className:"max-h-24"})})}),(0,s.jsx)("div",{className:"cart-item flex flex-col items-start justify-center",children:(0,s.jsx)(a(),{href:"/product/".concat(c.id),children:(0,s.jsxs)("p",{className:"pb-2",children:["".concat(c.name," - ")," ",(0,s.jsx)("span",{className:"font-semibold",children:"Size: ".concat(l.size.toUpperCase())})]})})}),(0,s.jsxs)("div",{className:"cart-item flex flex-col items-center",children:[(0,s.jsx)("p",{children:"$".concat(n.toFixed(2))}),(0,s.jsx)(i.P,{cartItem:l})]})]})},x=e=>{let{cartItem:t}=e,{setCartItems:r,setCartCount:l}=(0,c.g)();return(0,s.jsx)(n.t8,{onClick:function(){l(e=>e-t.quantity),r(e=>e.filter(e=>e!==t))},label:"X"})};var m=r(9834),f=()=>{let{cartCount:e,allProducts:t}=(0,c.g)();return(0,s.jsxs)("div",{className:"cart-page-container max-w-7xl m-auto",children:[e>0?(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(o,{})}):(0,s.jsx)(d.Q,{}),(0,s.jsx)(m.n,{productData:t,header:"You Might Be Interested In..."})]})},j=()=>(0,s.jsx)(f,{})},4336:function(e,t,r){"use strict";r.d(t,{Q:function(){return l}});var s=r(5893);r(7294);var c=r(6075);let l=()=>(0,s.jsxs)("div",{className:"m-8 flex flex-col items-center",children:[(0,s.jsx)("h2",{children:"Looks like your cart is empty...."}),(0,s.jsx)(c.sq,{label:"Go to Shop",url:"/"})]})}},function(e){e.O(0,[834,888,774,179],function(){return e(e.s=1742)}),_N_E=e.O()}]);