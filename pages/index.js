import React, { useState } from 'react'
import Layout from '../components/layout'

export default function Home() {
  const url = './data.json'
  const [data, setData] = useState({message:'', data:[]})

  fetch(url)
    .then(res=> res.json())
    .then(res=> setData(res))

  return (
    <div>
      <Layout header="Next.js" title="Top page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{data.message}</h5>
          <table className="table bg-white">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
                </tr>
            </thead>
            <tbody>
              {data.data.map((value,key)=>(
                <tr key={key}>
                  <th>{value.name}</th>                  
                  <th>{value.mail}</th>                  
                  <th>{value.age}</th>                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}
