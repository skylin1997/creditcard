<template>
  <div class="container">
    <div class="card" :class="{'filp': isback}">
      <div class="card--front" :class="{'shadow':isknow ,'card--discover':startcolor=='#fff'}">
        <div
          class="card-background"
          :class="{kown:isknow}"
          :style="{background:'linear-gradient(25deg,'+startcolor+','+endcolor+')'}"
        ></div>
        <div class="card-logo">{{typename}}</div>
        <div class="card-chip"></div>
        <div
          class="card-number"
          :class="{ 'focused': isdata[0],'font_17':fontshrink }"
        >{{cardNumber|filter_num(maxlength)}}</div>
        <div class="card-name" :class="{ 'focused': isdata[1] }">{{cardName|filter_name}}</div>
        <div class="card-valid" :class="{ 'focused': isdata[2] }">
          <div class="card-valid-name">valid thru</div>
          <div class="card-valid-num">{{cardValid|filter_valid}}</div>
        </div>
      </div>
      <div class="card--back" :class="{'shadow':isknow}">
        <div
          class="card-background"
          :class="{kown:isknow}"
          :style="{background:'linear-gradient(25deg,'+startcolor+','+endcolor+')'}"
        ></div>
        <div class="card-logo">{{typename}}</div>
        <div class="card-stripe"></div>
        <div class="card-signnature"></div>
        <div class="card-cvc" v-bind:class="{ focused: isdata[3] }">{{cardCvc|filter_cvc}}</div>
      </div>
    </div>
    <form class="form" action>
      <div class="form-css form-number">
        <input
          class="input-css input-number"
          @focus="onSetdata(0);onSetfilp('front')"
          @keyup="onChange"
          v-model=" cardNumber"
          placeholder="Card Number"
          pattern="[\d| ]{16,22}"
          maxlength="22"
          type="text"
          required
        >
        <p>E.g.: 49..., 51..., 36..., 37...</p>
      </div>
      <div class="form-css form-name">
        <input
          class="input-css input-name"
          @focus="onSetdata(1);onSetfilp('front')"
          v-model="cardName"
          placeholder="Name"
          type="text"
          required
        >
      </div>
      <div class="form-css form-valid-cvc">
        <input
          class="input-css input-valid"
          @focus="onSetdata(2);onSetfilp('front')"
          @keyup="onChangeValid"
          v-model="cardValid"
          placeholder="Valid Thru"
          pattern="\d\d/\d\d"
          maxlength="5"
          type="text"
          required
        >
        <input
          class="input-css input-cvc"
          @focus="onSetdata(3);onSetfilp('back')"
          placeholder="CVC"
          v-model="cardCvc"
          pattern="\d{3,4}"
          maxlength="4"
          type="text"
          required
        >
      </div>
      <button class="btn">PAY</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      isdata: [0, 0, 0, 0],
      isback: false,
      cardNumber: "",
      cardName: "",
      cardValid: "",
      cardCvc: "",
      isknow: false,
      fontshrink: false,
      typename: "",
      maxlength: 19,
      startcolor: "",
      endcolor: "",
      cardType: [
        {
          name: "Visa",
          reg: /^4/,
          max_length: 22,
          start_color: "#0f509e",
          end_color: "#1399cd"
        },
        {
          name: "MasterCard",
          reg: /^2[2-6][2-9][1-9]|27[1-2]0|^5[1-5]/,
          max_length: 22,
          start_color: "#f37b26",
          end_color: "#fdb731"
        },
        {
          name: "JCB",
          reg: /^352[8-9]|^(35[3-8]\d)/,
          max_length: 19,
          start_color: "#939393",
          end_color: "#717171"
        },
        {
          name: "Discover",
          reg: /^6[4-5]|6011/,
          max_length: 19,
          start_color: "#fff",
          end_color: "#eee"
        },
        {
          name: "Diners Club",
          reg: /^3(6|8)|^30[0,5]/,
          max_length: 16,
          start_color: "#fff",
          end_color: "#eee"
        },
        {
          name: "American Express",
          reg: /^3(4|7)/,
          max_length: 17,
          start_color: "#308c67",
          end_color: "#a3f2cf"
        },
        {
          name: "Laser",
          reg: /^67(0|7)(6|1|9)/,
          max_length: 19,
          start_color: "#939393",
          end_color: "#717171"
        },
        {
          name: "HiperCard",
          reg: /^60/,
          max_length: 22,
          start_color: "#8b181b",
          end_color: "#de1f27"
        },
        {
          name: "Dinkort",
          reg: /^5019/,
          max_length: 19,
          start_color: "#ccc",
          end_color: "#999"
        },
        {
          name: "China UnionPay",
          reg: /^62/,
          max_length: 19,
          start_color: "#939393",
          end_color: "#717171"
        }
      ]
    };
  },
  filters: {
    filter_num: function(value, maxlength) {
      if (!value) return "•••• •••• •••• ••••";
      let length = value.length;
      let val = "•••• •••• •••• ••••";
      let addval = "•••";

      if (maxlength == 16) val = "•••• •••••• ••••";
      else if (maxlength == 17) val = "•••• •••••• •••••";
      else val = "•••• •••• •••• ••••";

      if (maxlength == 22 && length > 19) {
        val = val + addval;
      }

      value =
        length > maxlength
          ? value.substring(0, maxlength)
          : value + val.substring(length);
      return value;
    },
    filter_name: function(value) {
      if (!value) return "YOUR NAME HERE";
      return value;
    },
    filter_valid: function(value) {
      let length = value.length;
      let val = "••/••";
      if (!value) return val;
      else {
        if (length < val.length) value = value + val.substring(length);
        return value;
      }
    },
    filter_cvc: function(value) {
      let length = value.length;
      if (length > 4) value = value.substring(0, 4);
      return value;
    }
  },
  methods: {
    onSetdata(index) {
      this.isdata = [0, 0, 0, 0];
      this.isdata[index] = 1;
    },
    onSetfilp(type) {
      //判断是否翻转
      if (type == "back" && !this.isback) {
        this.isback = true;
      } else if (type == "front" && this.isback) {
        this.isback = false;
      }
    },
    onChange() {
      //判断卡号类型
      this.cardNumber = this.cardNumber.replace(/\D/g, ""); //只能输入数字
      let number = this.cardNumber;
      let i = -1;
      i = this.cardType.findIndex(function(item) {
        return item.reg.exec(number.substring(0, 4));
      });
      this.isknow = i > -1 ? true : false;
      this.fontshrink =
        this.cardNumber.length > 16 && this.cardType[i].max_length > 19
          ? true
          : false;
      this.typename = this.isknow ? this.cardType[i].name : " ";
      this.maxlength = this.isknow ? this.cardType[i].max_length : 19;
      this.startcolor = this.isknow ? this.cardType[i].start_color : "";
      this.endcolor = this.isknow ? this.cardType[i].end_color : "";
      this._changeblank(this.maxlength);
    },
    onChangeValid() {
      let length = this.cardValid.length;
      if (this.cardValid.charAt(length - 1) == "/") {
        this.cardValid = this.cardValid.substring(0, length - 1);
      }
      this.cardValid = this.cardValid.replace(/(\d{2})(?=\d)/g, "$1/");
    },
    _changeblank(length) {
      //对输入数字根据不同的类型进行空格处理
      if (length == 16) {
        this.cardNumber = this.cardNumber
          .replace(/\s/g, "")
          .replace(/(\d{4})(?=\d)/, "$1 ")
          .replace(/(\d{6})(?=\d)/, "$1 ")
          .substring(0, 16);
      } else if (length == 17) {
        this.cardNumber = this.cardNumber
          .replace(/\s/g, "")
          .replace(/(\d{4})(?=\d)/, "$1 ")
          .replace(/(\d{6})(?=\d)/, "$1 ")
          .substring(0, 17);
      } else {
        this.cardNumber =
          this.cardNumber
            .substring(0, 16)
            .replace(/\s/g, "")
            .replace(/(\d{4})(?=\d)/g, "$1 ") + this.cardNumber.substring(16);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/index.less";
</style>


