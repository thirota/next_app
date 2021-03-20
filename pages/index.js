import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  let title = "Next.js page"
  let message = "React Next.js sample page."

  const h1 = {
    textAlign:'right',
    padding:'5px 15px'
  }

  const p = {
    textAlign:'left',
    margin:'0px 5px',
    color:'#669',
    fontSize:'18pt'
  }

  const subtitle = {
    textAlign:'center',
    margin:'#99d',
    fontSize:'24pt',
    fontWeight:'bold'
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossOrigin="anonymous"></link>
      </Head>

      <h1 className="bg-primary text-white display-4" style={h1}>React</h1>
      <div className="container">
        <p className="my-3" style={subtitle} id="subtitle">{title}</p>
        <div className="alert alert-primary text-center">
          <p className="h5" style={p}>{message}</p>
        </div>
      </div>
    </div>
  )
}
