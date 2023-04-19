import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// utils
import { AssetProps, HealthHistoryProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';

type StatusMapping = { [key: string]: number };

export default function AssetsView() {
  const { assets } = useDefault();

  const statusMapping: StatusMapping = {
    inOperation: 0,
    plannedStop: 1,
    unplannedStop: 2,
    inDowntime: 3,
    inAlert: 4,
  };

  const options = {
    accessibility: { enabled: false },
    chart: { type: 'area' },
    title: { text: 'Health History' },
    xAxis: { type: 'datetime' },
    yAxis: {
      title: undefined,
      categories: [
        'Operation',
        'Planned Stop',
        'Unplanned Stop',
        'Downtime',
        'Alert',
      ],
    },
    series: assets.map((item: AssetProps) => ({
      name: item.name,
      data: item.healthHistory?.map((history: HealthHistoryProps) => [
        new Date(history.timestamp).getTime(),
        statusMapping[history.status],
      ]),
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
