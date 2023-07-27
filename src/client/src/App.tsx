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
  'Authentic engagement\r\n': string,
  'Engagement avg\r\n': string,
}

function App() {

  const [data, setData] = useState<Array<dataItem>>([]);

  useEffect(() => {
    const url = process.env.REACT_APP_DATA_URL || '';
    console.log(url);

    axios.get(url).then((res: any) => {
      setData(res.data);
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
            <tr>
              <td>{item['Influencer insta name']}</td>
              <td>{item['instagram name']}</td>
              <td>{item.category_1}</td>
              <td>{item.category_2}</td>
              <td>{item.Followers}</td>
              <td>{item['Audience country(mostly)']}</td>
              <td>{item['Authentic engagement\r\n']}</td>
              <td>{item['Engagement avg\r\n']}</td>
            </tr>
          )
        )}
      </table>
    </div>
  )

}

export default App;
