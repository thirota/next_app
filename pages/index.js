import Header from './header'

export default function Home() {
  let title = "Next.js Index"
  let message = "React Next.js sample page."

  return (
    <div>
      <Header title={title}/>
      <h1 className="bg-primary px-3 text-white display-4 text-right">React</h1>
      <div className="container">
        <h3 className="my-3 text-primary text-center">{title}</h3>
        <div className="alert alert-primary text-left">
          <p className="h5">{message}</p>
        </div>
      </div>
    </div>
  )
}
