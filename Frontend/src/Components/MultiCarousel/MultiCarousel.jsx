import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiCarousel = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


  return (

<Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  // autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  // deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
> 
    
  <section >
    <img  width='350' height='350' src="https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <h4>item 1</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
  </section>
  <section>

  <img  width='350' height='350' src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  <h4>item 2</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
  </section>
  <section>

  <img  width='350' height='350' src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  <h4>item 3</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
    </section>
  <section>

  <img width='350' height='350' src="https://plus.unsplash.com/premium_photo-1664201890402-6886a989796f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
  <h4>item 4</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
    </section>

    <section>

  <img width='350' height='350' src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  <h4>item 5</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
    </section>

    <section>

  <img width='350' height='350' src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  <h4>item 6</h4>

    <p>Descrição curta</p>
    <p>Preço</p>
    <button>Ver </button>
    </section>
  
</Carousel>
  )
}

export default MultiCarousel