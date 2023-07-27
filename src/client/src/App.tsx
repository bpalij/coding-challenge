import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface dataItem {
  'Influencer insta name': string,
  'instagram name': string,
  category_1: string,
  category_2: string,
  Followers: string,
  'Audience country(mostly)': string,
  'Authentic engagement\r\n'?: string,
  'Authentic engagement\r'?: string,
  'Authentic engagement\n'?: string,
  'Engagement avg\r\n'?: string,
  'Engagement avg\r'?: string,
  'Engagement avg\n'?: string,
}

interface groupedDataItem {
  number: number;
  item: dataItem;
}

interface groupedData {
  [key: string]: groupedDataItem;
}

const convertStringToNumber = (str: string) => {
  if (str[str.length - 1] === 'M') {
    return parseFloat(str) * 1000 * 1000;
  }
  if (str[str.length - 1] === 'K') {
    return parseFloat(str) * 1000;
  }
  return parseInt(str);
}

function App() {

  const [data, setData] = useState<Array<dataItem>>([]);
  const [topPerCategoryByFollowers, setTopPerCategoryByFollowers] = useState<groupedData>({});
  const [topPerCountryByEngagementAvg, setTopPerCountryByEngagementAvg] = useState<groupedData>({});


  useEffect(() => {
    const url = process.env.REACT_APP_DATA_URL || '';

    axios.get(url).then((res: any) => {
      const data = res.data as Array<dataItem>;
      setData(data);
      const topPerCategoryByFollowersLocal: groupedData = {};
      const topPerCountryByEngagementAvgLocal: groupedData = {};

      data.forEach((item) => {
        const {category_1, category_2, Followers} = item;
        const followersNumber = convertStringToNumber(Followers);
        if (!topPerCategoryByFollowersLocal[category_1]) {
          topPerCategoryByFollowersLocal[category_1] = {
            number: followersNumber,
            item,
          }
        } else {
          if (topPerCategoryByFollowersLocal[category_1].number < followersNumber) {
            topPerCategoryByFollowersLocal[category_1] = {
              number: followersNumber,
              item,
            }
          }
        };
        if (category_2) {
          if (!topPerCategoryByFollowersLocal[category_2]) {
            topPerCategoryByFollowersLocal[category_2] = {
              number: followersNumber,
              item,
            }
          } else {
            if (topPerCategoryByFollowersLocal[category_2].number < followersNumber) {
              topPerCategoryByFollowersLocal[category_2] = {
                number: followersNumber,
                item,
              }
            }
          };
        }
      });

      setTopPerCategoryByFollowers(topPerCategoryByFollowersLocal);

      data.forEach((item) => {
        const country = item['Audience country(mostly)'];
        const engagementAvg = item['Engagement avg\r\n'] || item['Engagement avg\r'] || item['Engagement avg\n'] || '0';
        const engagementAvgNumber = convertStringToNumber(engagementAvg);
        if (!topPerCountryByEngagementAvgLocal[country]) {
          topPerCountryByEngagementAvgLocal[country] = {
            number: engagementAvgNumber,
            item,
          }
        } else {
          if (topPerCountryByEngagementAvgLocal[country].number < engagementAvgNumber) {
            topPerCountryByEngagementAvgLocal[country] = {
              number: engagementAvgNumber,
              item,
            }
          }
        }
      });

      setTopPerCountryByEngagementAvg(topPerCountryByEngagementAvgLocal);
    });
  }, []);

  return (
    <div>
      <h1>Data</h1>
      <table>
        <tr>
          <th>Influencer insta name</th>
          <th>Instagram name</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Followers</th>
          <th>Audience country(mostly)</th>
          <th>Authentic engagement</th>
          <th>Engagement avg</th>
        </tr>
        {
          data.map(item => (
            <tr key={JSON.stringify(item)}>
              <td>{item['Influencer insta name']}</td>
              <td>{item['instagram name']}</td>
              <td>{item.category_1}</td>
              <td>{item.category_2}</td>
              <td>{item.Followers}</td>
              <td>{item['Audience country(mostly)']}</td>
              <td>{item['Authentic engagement\r\n'] || item['Authentic engagement\r'] || item['Authentic engagement\n']}</td>
              <td>{item['Engagement avg\r\n'] || item['Engagement avg\r'] || item['Engagement avg\n']}</td>
            </tr>
          )
        )}
      </table>

      <h1>Top per category by followers</h1>
      <table>
        <tr>
          <th>Leader per category</th>
          <th>Influencer insta name</th>
          <th>Instagram name</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Followers</th>
          <th>Audience country(mostly)</th>
          <th>Authentic engagement</th>
          <th>Engagement avg</th>
        </tr>
        {
          Object.keys(topPerCategoryByFollowers).map(key => {
            const item = topPerCategoryByFollowers[key].item;
            return (
              <tr key={JSON.stringify(item) + key}>
                <td>{key}</td>
                <td>{item['Influencer insta name']}</td>
                <td>{item['instagram name']}</td>
                <td>{item.category_1}</td>
                <td>{item.category_2}</td>
                <td>{item.Followers}</td>
                <td>{item['Audience country(mostly)']}</td>
                <td>{item['Authentic engagement\r\n'] || item['Authentic engagement\r'] || item['Authentic engagement\n']}</td>
                <td>{item['Engagement avg\r\n'] || item['Engagement avg\r'] || item['Engagement avg\n']}</td>
              </tr>
            )
          }
        )}
      </table>

      <h1>Top per country by engagement avg</h1>
      <table>
        <tr>
          <th>Leader per country</th>
          <th>Influencer insta name</th>
          <th>Instagram name</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Followers</th>
          <th>Audience country(mostly)</th>
          <th>Authentic engagement</th>
          <th>Engagement avg</th>
        </tr>
        {
          Object.keys(topPerCountryByEngagementAvg).map(key => {
            const item = topPerCountryByEngagementAvg[key].item;
            return (
              <tr key={JSON.stringify(item) + key}>
                <td>{key}</td>
                <td>{item['Influencer insta name']}</td>
                <td>{item['instagram name']}</td>
                <td>{item.category_1}</td>
                <td>{item.category_2}</td>
                <td>{item.Followers}</td>
                <td>{item['Audience country(mostly)']}</td>
                <td>{item['Authentic engagement\r\n'] || item['Authentic engagement\r'] || item['Authentic engagement\n']}</td>
                <td>{item['Engagement avg\r\n'] || item['Engagement avg\r'] || item['Engagement avg\n']}</td>
              </tr>
            )
          }
        )}
      </table>
    </div>
  )

}

export default App;
