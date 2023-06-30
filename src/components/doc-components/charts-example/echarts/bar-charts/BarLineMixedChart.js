import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { tooltipFormatter } from 'helpers/echart-utils';
import { getColor } from 'helpers/utils';
import React, { useEffect, useState } from 'react';
echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent
]);

import 'echarts/lib/component/dataZoomSlider';
const timestampToDateTime = timestamp => {
  const milliseconds = timestamp * 1000; // 1575909015000

  const dateObject = new Date(milliseconds);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(dateObject);

  return formattedDate;
};

const setChartAxis = data => {
  let axis = {
    x: [],
    y: []
  };

  data.map(item => {
    axis.x.push(timestampToDateTime(item.timestamp));
    axis.y.push(item.data);
  });
  return axis;
};
const getOption = (xAxisData, yAxisData) => ({
  grid: {
    show: true,
    backgroundColor: getColor('gray-100')
  },
  tooltip: {
    trigger: 'axis',

    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#ccc'
      },
      label: {
        show: true,
        backgroundColor: '#c4c4c4',
        color: '#222'
      }
    },
    padding: [7, 10],
    backgroundColor: getColor('gray-100'),
    borderColor: getColor('gray-300'),
    textStyle: { color: getColor('dark') },
    borderWidth: 1,
    transitionDuration: 0,
    formatter: tooltipFormatter
  },

  toolbox: {
    top: 0,
    feature: {
      dataView: { show: false },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: { show: true },
      saveAsImage: { show: true }
    },
    iconStyle: {
      borderColor: getColor('gray-700'),
      borderWidth: 1
    },

    emphasis: {
      iconStyle: {
        textFill: getColor('gray-600')
      }
    }
  },

  legend: {
    top: 40,

    textStyle: {
      color: getColor('gray-600')
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
    axisLabel: {
      rotate: 15,
      color: getColor('gray-900')
    },
    axisPointer: {
      type: 'shadow'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: getColor('gray-300')
      }
    }
  },
  yAxis: {
    type: 'value',

    boundaryGap: [0, '100%'],
    data: yAxisData,
    axisLabel: {
      color: getColor('gray-900'),
      formatter: '{value}ºC'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: getColor('gray-200')
      }
    }
  },
  dataZoom: [
    {
      xAxisIndex: [0],
      filterMode: 'empty',
      start: 0,
      end: 100,
      type: 'slider',
      height: 15,
      bottom: 15
    }

    /*     {
      
      
      
      "borderColor": "rgba(46, 50, 56, 0)",
      "marginTop": '50px',
      "textStyle": {
          "color": "rgba(28, 31, 35, 0.6)",
          "fontFamily": "Inter"
      },
      "dataBackground": {
          "areaStyle": {
              "color": "rgba(46, 50, 56, 0.09)"
          }
      },

  } */
  ],

  series: [
    {
      name: 'Temperatura',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',

      itemStyle: {
        color: '#ff0000',
        borderRadius: [4, 4, 0, 0]
      },

      data: yAxisData
    }
  ]
});

function BarLineMixedChart(data) {
  const [axis, setAxis] = useState({});

  useEffect(() => {
    const xy = setChartAxis(data.data);
    setAxis(() => xy);
  }, [data]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      lazyUpdate={true}
      option={getOption(axis.x, axis.y)}
      style={{ height: '55vh' }}
    />
  );
}

export default BarLineMixedChart;
