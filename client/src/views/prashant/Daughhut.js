import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    // ArgumentAxis,
    // ValueAxis,
    PieSeries,
    Title,
    Legend,
  } from '@devexpress/dx-react-chart-material-ui';
  import classNames from 'clsx';
  import { withStyles } from '@material-ui/core/styles';
import { Animation,Stack } from '@devexpress/dx-react-chart';
const setStyle = (style) => {
    const wrap = withStyles({ root: style });
    return Target => wrap(({ classes, className, ...restProps }) => (
      <Target className={classNames(classes.root, className)} {...restProps} />
    ));
  };
  
  const LegendRoot = setStyle({
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  })(Legend.Root);
  
  const LegendLabel = setStyle({
    whiteSpace: 'nowrap',
  })(Legend.Label);
  

  // const format = () => tick => tick;
  const stacks = [{
    series: ["Asia","Africa","Europe","Oceania"],
  }];
const data = [
    { region: 'Asia', val: 4119626293 },
    { region: 'Africa', val: 1012956064 },
   
    { region: 'Europe', val: 727082222 },
    { region: 'Oceania', val: 35104756 },
];

export default class Daughhut extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        //   rotated
        >
          {/* <ArgumentAxis /> */}
          {/* <ValueAxis max={7} /> */}

          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          
          <Animation />
          <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
          <Title text="Week wise Data" />
          <Stack stacks={stacks} />
        </Chart>
        
      </Paper>
    );
  }
}