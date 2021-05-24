import './home.css'
import { useQuery } from '@apollo/client'
import { FETCH_ALL_DATA } from '../graphql/query'
import Card from '../components/Card'
import StyledContentLoader from 'styled-content-loader'
import CardDetail from '../components/CardDetail'
import Header from '../components/Header'

export default function Home() {

  const { data, loading, error } = useQuery(FETCH_ALL_DATA)

  if(loading) return <StyledContentLoader />


  return (
    <div>
      <Header></Header>
      <div className="container mt-5">
        <div className="row">
        <h1 className="text-center" ><span>MOVIES</span> LIST</h1>
          {
            data.movies.map(movie => 
                <Card
                key={ movie._id }
                movie={ movie }
                editable={ true }
                inHome={ true }
                loading={ loading }
                />
            )
          }
        </div>
        <h1 className="text-center mt-4" ><span>SERIES</span> LIST</h1>
        <div className="row">
          {
            data.series.map(movie => 
              <Card
              key={ movie._id }
              movie={ movie }
              editable={ false }
              inHome={ true }
              loading={ loading }
              />
            )
          }
        </div>
      </div>

      <CardDetail/>
    </div>
  )
}
