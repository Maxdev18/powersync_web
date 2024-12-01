import {Devices} from '../../Types/Devices';
import './PowerUsage.css';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
interface PowerUsageProps {
    devices: Devices[];
  }

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const PowerUsage: React.FC<PowerUsageProps> = ({ devices }) => {
    const topDevices = devices.sort((a, b) => b.wattage - a.wattage).slice(0, 5); // get top 5 devices

    // prep the data for the chart
  const chartData = {
    labels: topDevices.map((device) => device.name), // Device names for X-axis
    datasets: [
      {
        label: "Wattage (W)",
        data: topDevices.map((device) => device.wattage), 
        backgroundColor: "rgba(54, 162, 235, 0.8)", 
        borderColor: "rgba(54, 162, 235, 1)", 
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // disable aspect ratio to allow dynamic resizing
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Wattage (W)",
        },
      },
    },
  };

  return (
    <div className='chartStyles'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );

};

export default PowerUsage;