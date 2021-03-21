import React, { useState } from 'react'
import Layout from '../components/layout'
import useSWR from 'swr'

export default function Home() {
  const func = (...args)=> fetch(...args).then(res=>res.text())
  const { data, err } = useSWR('/data.txt', func)

  return (
    <div>
      <Layout header="Next.js" title="Top page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data}
          </h5>
        </div>
      </Layout>
    </div>
  )
}
