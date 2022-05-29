import React from "react";
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const FutureStockChart = ({ timeStamps, currentClosePrice, futureClosePrice}) => {
  let chartData = {
    labels: timeStamps,
    datasets: [
      {
        id: 1,
        label: 'Current Close Price',
        data: currentClosePrice,
        borderColor: 'rgb(255, 245, 61)',
        backgroundColor: 'rgba(255, 245, 61, 0.5)',
      },
      {
        id: 2,
        label: 'Predicted Close Price',
        data: futureClosePrice,
        borderColor: 'rgb(177, 255, 61)',
        backgroundColor: 'rgba(177, 255, 61, 0.5)',
      },
    ]
};
  return(
    <div className="chart mb4">
      <Line 
        width={300}
        height={300}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                        family: "'KoHo', 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif"
                    },
                    color: "#FFF"
                }
            }
        },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
                color: "#FFF",
              },
              ticks: {
                color: "#00FEDE",
              },
              grid: {
                color: "#15171c",
                tickColor: "#FFF",
                borderColor: "#00FEDE"
              },
              reverse: true
            },
            y: {
              title: {
                display: true,
                text: 'Price (in USD)',
                color: "#FFF",
              },
              ticks: {
                color: "#00FEDE"
              },
              grid: {
                color: "#15171c",
                tickColor: "#FFF",
                borderColor: "#00FEDE"
              }
            }
          }
        }}
      />
    </div>
  );
}

export default FutureStockChart;