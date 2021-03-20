import Layout from '../components/layout'
import Link from 'next/link'
import MyImage from '../components/image'

export default function Home() {
  return (
    <div>
      <Layout header="Next.js" title="Top page">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">Welcome to next.js!</h5>
          <MyImage fname="image.jpg" size="300"/>
        </div>
      </Layout>
    </div>
  )
}
