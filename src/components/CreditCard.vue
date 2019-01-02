<template>
  <div class="container">
    <div class="card" :class="[cardBackground,{'card--filp': isFilp}]">
      <div class="card--front" >
        <div
          class="card_background"></div>
        <div class="card_logo">{{typeName}}</div>
        <div class="card_chip"></div>
        <div
          class="card_number"
          :class="{ 'card--focused ': isData[0],'card--font17':isShrink }"
        >{{cardNumber|filter_num(maxLength)}}</div>
        <div class="card_name" :class="{ 'card--focused ': isData[1] }">{{cardName|filter_name}}</div>
        <div class="card_valid" :class="{ 'card--focused ': isData[2] }">
          <div class="card_valid_name">valid thru</div>
          <div class="card_valid_num">{{cardValid|filter_valid}}</div>
        </div>
      </div>
      <div class="card--back" >
        <div class="card_background"></div>
        <div class="card_logo">{{typeName}}</div>
        <div class="card_stripe"></div>
        <div class="card_signnature"></div>
        <div class="card_cvc" :class="{ focused: isData[3] }">{{cardCvc|filter_cvc}}</div>
      </div>
    </div>
    <form class="form" action>
      <div class="form-css form-number">
        <input
          class="input-css input-number"
          @focus="onSetdata(0);onSetfilp('front')"
          @keyup="onChangeNumber()"
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
          @keyup="onChangeValid()"
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
          v-model="cardCvc"
          placeholder="CVC"
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
      isData: [0, 0, 0, 0],
      isFilp: false,
      isGetType: false,
      isShrink: false,
      cardNumber: "",
      cardName: "",
      cardValid: "",
      cardCvc: "",
      typeName: "",
      maxLength: 19,
      cardType: [
        {
          name: "visa_electron",
          reg: /^4026|^417500|^4508|^4844|^4913|^4917/,
          max_length: 19,
          start_color: "#0f509e",
          end_color: "#1399cd"
        },
        {
          name: "visa",
          reg: /^4/,
          max_length: 19,
        },
        {
          name: "mastercard",
          reg: /^2[2-6][2-9][1-9]|27[1-2]0|^5[1-5]/,
          max_length: 19,
        },
        {
          name: "jcb",
          reg: /^352[8-9]|^(35[3-8]\d)/,
          max_length: 16,
        },
        {
          name: "discover",
          reg: /^6[4-5]|^6011/,
          max_length: 16,
        },
        {
          name: "dinersclub",
          reg: /^3(6|8)|^30[0,5]/,
          max_length: 14,
        },
        {
          name: "amex",
          reg: /^3(4|7)/,
          max_length: 15,
        },
        {
          name: "laser",
          reg: /^67(0|7)(6|1|9)/,
          max_length: 16,
        },
        {
          name: "hipercard",
          reg: /^60/,
          max_length: 19,
        },
        {
          name: "dinkort",
          reg: /^5019/,
          max_length: 19,
        },
        {
          name: "unionpay",
          reg: /^62/,
          max_length: 16,
        }
      ],
    };
  },
  computed:{
     cardBackground(){
       return this.isGetType?'card--'+this.typeName.split('_')[0]:'card--unkown';
     }
  },
  filters: {
    filter_num: function(value, maxlength) {
      if (!value) return "•••• •••• •••• ••••";
      let length = value.length;
      let val = "•••• •••• •••• ••••";
      let addval = "•••";
      let blank = maxlength == 14 || maxlength == 15 ? 2 : 3;

      if (maxlength == 14) val = "•••• •••••• ••••";
      else if (maxlength == 15) val = "•••• •••••• •••••";
      else val = "•••• •••• •••• ••••";

      if (maxlength == 19 && length > 19) {
        val = val + addval;
      }

      value =length > maxlength + blank? value.substring(0, maxlength + blank)
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
      this.isData = [0, 0, 0, 0];
      this.isData[index] = 1;
    },
    onSetfilp(type) {
      //前后翻转
      if (type == "back" && !this.isFilp) {
        this.isFilp = true;
      } else if (type == "front" && this.isFilp) {
        this.isFilp = false;
      }
    },
    onChangeNumber() {
      //监控卡号实时输入
      this.cardNumber = this.cardNumber.replace(/\D/g, ""); //只能输入数字
      let i = this._getType();//判断卡号类型
      this.typeName = this.isGetType ? this.cardType[i].name : " ";
      this.maxLength = this.isGetType ? this.cardType[i].max_length : 16;
      this.isShrink = this.cardNumber.length > 16 && this.maxLength > 16 ? true : false;
     this._changeblank(this.maxLength);//对空格进行处理
    },
    onChangeValid() {
      let length = this.cardValid.length;
      if (this.cardValid.charAt(length - 1) == "/") {
        this.cardValid = this.cardValid.substring(0, length - 1);
      }
      this.cardValid = this.cardValid
        .replace(/\s/g, "")
        .replace(/(\d{2})(?=\d)/g, "$1/");
    },
    _getType() {
      //判断是否得到卡号类型
      let number = this.cardNumber;
      let i = -1;
      i = this.cardType.findIndex(function(item) {
        return item.reg.exec(number.substring(0, 4));
      });
      this.isGetType = i > -1 ? true : false;
      return i;
    },
    _changeblank(length) {
      //对输入数字根据不同的类型进行空格处理
      if (length == 14) {
        this.cardNumber = this.cardNumber
        .replace(/\s/g, "") 
        .replace(/(\d{4})(?=\d)/, "$1 ") 
        .replace(/(\d{6})(?=\d)/, "$1 ")
        .substring(0, 16);
      } else if (length == 15) {
        this.cardNumber = this.cardNumber
        .replace(/\s/g, "")
        .replace(/(\d{4})(?=\d)/, "$1 ")
        .replace(/(\d{6})(?=\d)/, "$1 ")
        .substring(0, 17);
      } else {
        this.cardNumber = this.cardNumber
            .substring(0, 16)
            .replace(/\s/g, "")
            .replace(/(\d{4})(?=\d)/g, "$1 ") + this.cardNumber.substring(16);
      }
    }
  }
};
</script>

<style lang="less">
@import "../less/app.less";
</style>


