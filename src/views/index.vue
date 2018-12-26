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
        <div class="card-number" :class="{ 'focused': isdata[0],'font_17':fontshrink }">{{cardNumber|filter_num(maxlength)}}</div>
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
  data() {
    return {
      isdata: [0, 0, 0, 0],
      isback: false,
      cardNumber: "",
      cardName: "",
      cardValid: "",
      cardCvc: "",
      isknow: false,
      fontshrink:false,
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
      ],
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
  
      value = length>maxlength?value.substring(0,maxlength):value + val.substring(length);
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
      this.cardNumber=this.cardNumber.replace(/\D/g,'') ;//只能输入数字
      let number=this.cardNumber;
      let i=-1;
      i = this.cardType.findIndex(function(item){
        return  item.reg.exec(number.substring(0,4));
      })
       this.isknow=i>-1?true:false;
       this.fontshrink =(this.cardNumber.length>16&&this.cardType[i].max_length>19)? true:false;
       this.typename =this.isknow ? this.cardType[i].name:' ';
       this.maxlength =this.isknow ? this.cardType[i].max_length:19;
       this.startcolor =this.isknow ? this.cardType[i].start_color:''; this.endcolor = this.isknow ? this.cardType[i].end_color:'';
       this._changeblank( this.maxlength)
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
        this.cardNumber = this.cardNumber.replace(/\s/g,'').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{6})(?=\d)/,'$1 ').substring(0,16)
      } else if (length == 17) {
        this.cardNumber = this.cardNumber.replace(/\s/g,'').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{6})(?=\d)/,'$1 ').substring(0,17)
      } else {
          this.cardNumber = this.cardNumber.substring(0,16).replace(/\s/g,'').replace(/(\d{4})(?=\d)/g, "$1 ")+this.cardNumber.substring(16)}
   },
      
  }
};
</script>

<style lang="less" scoped>
.font_17{
    font-size: 17px !important;
}
.shadow{
   box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.card--discover > div {
  color: #555;
}
.focused {
  font-weight: 700;
  opacity: 1 !important;
  transition: all 0.6s;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-family: Helvetica, sans-serif;
}
.filp {
  transform: rotateY(180deg);
}
.card {
  height: 183.873px;
  width: 290px;
  color: #fff;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.4s linear;
  .card--front,
  .card--back {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #999;
    border-radius: 10px;
    backface-visibility: hidden;
    perspective: 10000;
    overflow: hidden;
  }
  .card--front {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .card-background {
    height: 200%;
    width: 150%;
    position: absolute;
    left: -170%;
    top: -60%;
    transform: rotate(25deg);
    transition: all 0.5s ease-out;
  }
  .kown {
    left: -22%;
  }
  .card-logo {
    background-position: top right;
    background-repeat: no-repeat;
    background-size: contain;
    height: 23%;
    position: absolute;
    font-size: 20px;
    right: 10%;
    top: 10%;
    width: 40%;
  }
  .card-chip {
    align-items: flex-start;
    height: 26px;
    width: 41px;
    position: relative;
    top: 10%;
    left: 10%;
    background: #2a1d16;
  }
  .card-number {
    position: relative;
    top: 30%;
    left: 10%;
    font-family: Consolas, Courier, monospace;
    opacity: 0.3;
    font-size: 20px;
  }
  .card-name {
    align-items: flex-start;
    width: 60%;
    position: absolute;
    bottom: 15%;
    left: 10%;
    font-family: Consolas, Courier, monospace;
    line-height: 1;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    text-transform: uppercase;
    opacity: 0.3;
  }
  .card-valid {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    bottom: 15%;
    right: 10%;
    opacity: 0.3;
    .card-valid-name {
      font-size: 10px;
      line-height: 1;
    }
    .card-valid-num {
      font-family: Consolas, Courier, monospace;
      font-size: 16px;
    }
  }
  .card--back {
    width: 100%;
    transform: rotateY(180deg);
    .card-background {
      right: -170%;
    }
    .card-logo {
      background-position: bottom center;
      bottom: 5%;
      left: 50%;
      opacity: 0.6;
      right: auto;
      top: auto;
      transform: translateX(-50%);
    }
  }
  .card-stripe {
    width: 100%;
    height: 22%;
    background: #2a1d16;
    position: absolute;
    top: 9%;
  }
  .card-signnature {
    background: repeating-linear-gradient(
      0.1deg,
      #fff 20%,
      #fff 40%,
      #fea 40%,
      #fea 44%,
      #fff 44%
    );
    height: 18%;
    width: 75%;
    position: absolute;
    left: 5%;
    top: 35%;
  }
  .card-cvc {
    color: #222;
    font-family: Consolas, Courier, monospace;
    font-size: 14px;
    left: 67%;
    line-height: 1;
    position: absolute;
    top: 42%;
  }
}
.form {
  margin: 30px auto 0;
  max-width: 400px;
  .form-css {
    margin-bottom: 1rem;
  }
  .input-css {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
  .input-css:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
  }
  .form-number {
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      font-size: 80%;
      align-items: flex-start;
      text-align: left;
    }
  }
  .form-valid-cvc {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .input-valid {
      margin-right: 15px;
    }
  }
  .btn {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
  }
  .btn:hover {
    background-color: #0069d9;
  }
}
</style>


