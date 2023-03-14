// January
[
  "{{repeat(35)}}",
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

// February
[
  "{{repeat(35)}}",
  {
    index: "{{index(31)}}",
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
    temp_min: "{{floating(-15,-7,1)}}",
    temp_max: "{{floating(3,10,1)}}",
  },
];
