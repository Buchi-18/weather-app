
■JSONジェネレーター
https://json-generator.com/api/json/get/bQIUnAqOKW?indent=2


■アイコン出典
https://www.ac-illust.com/main/detail.php?id=23460744&word=%E5%A4%A9%E6%B0%97%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E3%81%A8%E3%82%A4%E3%83%B3%E3%83%95%E3%82%A9%E3%82%B0%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E9%9B%86


■JSONジェネレータースクリプト
// January
[
  "{{repeat(31)}}",
  {
    index: "{{index()}}",
    observationDate: function (tags) {
      var date = new Date();
      var today = new Date();

      date.setFullYear(2100);
      date.setMonth(0);
      date.setDate(1 + this.index);

      var formatday =
        date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();

      return formatday;
    },
    weather:
      '{{random("01d", "02d","03d","04d","09d","10d","11d","13d","50d")}}',
    temp: "{{floating(-7,3,1)}}",
    temp_min: "{{floating(-13,-7,1)}}",
    temp_max: "{{floating(3,7,1)}}",
  },
];


