<template>
  <div class="calendar">
    <div class="title">
      <i class="el-icon-arrow-left btn prev" @click="getPrevMon()"></i>
      {{year}}年{{month}}月
      <i class="el-icon-arrow-right btn next" @click="getNextMon()"></i>
    </div>
    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
          <th>周天</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="arr1 in data">
          <template v-for="item in arr1">
            <td :class="{'big': item && item.edit, 'cur': item && item.cur}">
              <template v-if="item">
                <h1>{{item.date}}</h1>
                <textarea v-model="item.content" @blur="hideEdit($event, item)" v-show="item.edit"></textarea>
                <p v-show="!item.edit" @click="showEdit($event, item)" v-html="showContent(item.content)"></p>
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      curDay: new Date().getDate(),
      data: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      conData: []
    };
  },
  methods: {
    getData(year, month) {
      var _this = this;
      this.$XHRpost(
        "api/content/all",
        {
          userId: localStorage.getItem("userId"),
          year: year,
          month: month
        },
        function(data) {
          _this.conData = data.data;
          _this.getCalendar(
            new Date(_this.year, _this.month - 1, 1),
            _this.handleData(data.data)
          );
          _this.errorMsg(data.msg);
          if (data.success) {
          }
        }
      );
    },
    handleData(data) {
      var obj = {};
      for (var i = 0; i < data.length; i++) {
        obj[data[i].time] = data[i].content;
      }
      return obj;
    },
    showContent(value) {
      return value.replace(/\n/g, "<br>");
    },
    hideEdit(e, item) {
      var arr = this.conData.filter(function(obj) {
        return item.time === obj.time;
      });
      item.edit = false;
      if (!arr.length && !item.content) return;
      this.$XHRpost(
        "api/content/save",
        {
          userId: localStorage.getItem("userId"),
          time: `${item.year}${this.handleNum(item.month)}${this.handleNum(
            item.date
          )}`,
          value: e.target.value
        },
        function(data) {
          _this.errorMsg(data.msg);
          if (data.success) {
          }
        }
      );
    },
    showEdit(e, item) {
      item.edit = true;
      this.$nextTick(() => {
        e.target.previousElementSibling.focus();
      });
    },
    getPrevMon() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.getData(this.year, this.month);
    },
    getNextMon() {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.getData(this.year, this.month);
    },
    getCalendar(now, data) {
      now.setDate(1);
      var year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDay(), // 周几
        date = now.getDate(), // 几号
        arr = [],
        preMonLastDate = new Date(now.setDate(0)).getDate(),
        curMonLastDate = (month === 12
          ? new Date(year + 1, 1, 0)
          : new Date(year, month, 0)
        ).getDate();

      // 补充当日之后的内容
      for (var i = date, temp = day; i <= curMonLastDate; i++ , temp++) {
        var j = Math.floor((temp - 1) / 7),
          time = `${year}${this.handleNum(month)}${this.handleNum(i)}`,
          content = data && data[time] ? data[time] : "";
        if (!arr[j]) arr[j] = [];
        var obj = {
          time: time,
          year: year,
          month: month,
          date: i,
          content: content,
          edit: false
        };
        obj.cur = time === this.curDay;
        arr[j][(temp - 1) % 7] = obj;
      }
      // 补充当日之前的内容
      /* for(var i = date, temp = day; i >= 1; i--, temp--){
				var j = Math.floor((temp -1) / 7);
				if(j < 0 && arr[0][0]){
					arr.unshift([]);
				}
				var index = (temp - 1)%7;
				if(index < 0 ) index += 7;
				var obj = {
					day: i,
					content: '',
					edit: false
				};
				if(temp === this.curDay) obj.cur = true;
				arr[0][index] = obj;
			} */
      this.data = arr;
    },
    handleNum(val) {
      return ("00" + val).substr(-2);
    }
  },
  mounted() {
    this.curDay = `${this.year}${this.handleNum(this.month)}${this.handleNum(
      this.curDay
    )}`;
    this.getData(this.year, this.month);
  }
};
</script>
<style lang="scss">
@import "@/assets/base.scss";
.calendar {
  width: 100%;
  position: relative;

  .title {
    text-align: center;
    font-size: 24px;
    line-height: 1.6;
    position: relative;
    background: #e09c9c;
  }

  .btn {
    padding: 12px 5px;
    line-height: 16px;
    border-radius: 0;
    vertical-align: top;
    cursor: pointer;

    &.prev {
      left: 0;
    }

    &.next {
      right: 0;
    }
  }
  table {
    width: 100%;
    td,
    th {
      text-align: center;
      height: 100px;
      border-bottom: 1px dashed #ccc;
      border-right: 1px dashed #ccc;
    }
    th {
      height: 40px;
      line-height: 40px;
      background: $h-color;
      color: #000;
    }
    td {
      width: 100px;
      min-width: 100px;
      height: 100px;
      position: relative;
      transition: all 0.3s ease-in;
      -moz-transition: all 0.3s ease-in;
      /* Firefox 4 */
      -webkit-transition: all 0.3s ease-in;
      /* Safari 和 Chrome */
      -o-transition: all 0.3s ease-in;
      /* Opera */
      &.big {
        width: 400px;
        height: 200px;
      }

      &.cur {
        h1 {
          color: #000;
        }
        p,
        textarea {
          background: rgba(255, 206, 85, 0.9);
          color: #000;
        }
      }

      h1 {
        position: absolute;
        z-index: 1;
        width: 100%;
        bottom: 0;
        font-size: 32px;
        color: black;
        font-family: "Arial";
        text-align: right;
      }

      textarea,
      p {
        width: 100%;
        height: 100%;
        padding: 5px;
        background: rgba(255, 255, 255, 0.9);
        position: relative;
        z-index: 2;
        box-sizing: border-box;
        display: block;
        font-size: 12px;
        font-family: "微软雅黑";
        resize: none;
        text-align: left; // transition: all 2s;
        // -moz-transition: all 2s;
        // /* Firefox 4 */
        // -webkit-transition: all 2s;
        // /* Safari 和 Chrome */
        // -o-transition: all 2s;
        /* Opera */
        word-break: break-all;
        outline: none;
      }
    }
  }
}
</style>
