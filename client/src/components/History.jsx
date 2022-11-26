import React, {useState} from 'react';
import axios from 'axios'
const History = (props) => {
  const [keyWord, setKeyWord] = useState('');
  const hanldeSearch = () => {
    axios.post('/search', {keyWord})
      .then(() => {
        setKeyWord('')
      })
  }
  return (
    <div>
      <h2>History Page</h2>
      <hr/>
      <div>
        <input type="text" value={keyWord} onChange={(e) => setKeyWord(e.target.value)}/>
        <button onClick={hanleSearch}>Search</button>
      </div>
    </div>
  )
}

export default History;