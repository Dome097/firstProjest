<template>
  <div id="coupon">
    <h4>Q1: 商家代金券说明?</h4>
    <p>商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。</p>
    <h4>Q2: 怎么获得商家代金券?</h4>
    <p>进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</p>
    <h4>Q3: 商家代金券使用条件？</h4>
    <p>商家代金券仅限在指定商家使用,商家代金券仅限在线支付使用,每个订单只能使用一张商家代金券，不可与其他代金券叠加使用</p>
  </div>
</template>

<script>
// 代金券说明
export default {
  name: "coupon"
}
</script>

<style scoped>
#coupon{
  margin-top: 0.1rem;
}
#coupon>h4{
  margin: 0.1rem !important;
}
#coupon>p {
  margin: 0.1rem !important;
}
</style>
