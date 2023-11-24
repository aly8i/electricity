import styles from "./Chart.module.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ aspect, title, months }) => {
  //blue color
  const color1 = "#007bff";

  const getYear = (m, y) => {
    if (m < 0) return y - 1;
    else return y;
  };

  const getMonthName = (x) => {
    var m = x;
    if (x < 0) m += 12;
    if (m == 1) return "january";
    else if (m == 2) return "february";
    else if (m == 3) return "march";
    else if (m == 4) return "april";
    else if (m == 5) return "may";
    else if (m == 6) return "june";
    else if (m == 7) return "july";
    else if (m == 8) return "august";
    else if (m == 9) return "september";
    else if (m == 10) return "october";
    else if (m == 11) return "november";
    else if (m == 12 || m == 0) return "december";
  };

  const getTotalByDate = (m) => {
    var month = m;
    if (m < 0) {
      month += 12;
      return months[month + 12];
    } else {
      return months[month];
    }
  };

  const getData = () => {
    let newDate = new Date();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    const data = [];
    for (var i = month - 5; i <= month; i++) {
      const obj = {
        month: getMonthName(i + 1),
        year: getYear(i, year),
        total: getTotalByDate(i),
      };
      data.push(obj);
    }
    return data;
  };
  return (
    <div className={styles.chart}>
      <div className={styles.title}>{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={getData()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color1} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color1} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke={color1} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke={color1}
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
