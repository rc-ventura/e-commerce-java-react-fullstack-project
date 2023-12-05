import React from 'react'
import CardCategory from '../../Components/CardCategory/CardCategory'
import Footer from '../../Components/Footer/Footer'
import HeaderCarousel from '../../Components/HeaderCarousel/HeaderCarousel'
import MultiCarousel from '../../Components/MultiCarousel/MultiCarousel'
import Banner from '../../Banner/Banner'

function Home() {
  return (
    <>
    <header>
         <HeaderCarousel />  
    </header>
    
    <main>

    <section >
    <h3>Ventura's creek Friday </h3>

        {/* Map para cada card */}
          <CardCategory />

    </section>
    
    <section>     
    <h3>Off Sale</h3>
      <MultiCarousel />
      
      <section >
            <Banner/>

            
      </section>
      {/* d-flex justify-content-between */}
    
    </section>

     </main>
     <footer>
          <Footer/>

     </footer>
     
     </>
     
  )
}

export default Home