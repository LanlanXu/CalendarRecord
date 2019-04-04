<template>
  <div class="calendar">
    <table>
      <thead>
        <tr>
          <th>day 1</th>
          <th>day 2</th>
          <th>day 3</th>
          <th>day 4</th>
          <th>day 5</th>
          <th>day 6</th>
          <th>day 7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCalendar() {
      var now = new Date(),
        month = now.getMonth(),
        day = now.getDay(),
        date = now.getDate(),
        arr = [],
        lastDate = new Date(now.setDate(0)).getDate();
      // for(var i = 0; lastDate){

      // }
    }
  },
  mounted() {
    this.getCalendar();
  }
};
</script>
<style lang="scss">
.calendar {
  width: 100%;
}
</style>
