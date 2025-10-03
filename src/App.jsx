import './App.css'
import ProductCard from './components/productCard'

function App() {
  return (
    <>
    <ProductCard name="Laptop" image="https://picsum.photos/id/237/200/300" price="100,000 LKR"/>

    <ProductCard name="Watch" image="https://picsum.photos/id/237/200/300" price="5000 LKR"/>

    <ProductCard name="Mobile" image="https://picsum.photos/id/237/200/300" price="40,000 LKR"/>
    
    </>
  )
}

export default App
