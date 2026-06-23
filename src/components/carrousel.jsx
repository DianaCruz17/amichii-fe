import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Mousewheel, Navigation, Autoplay } from 'swiper/modules';

function Carrousel() {
  const [photosData, setPhotos] = useState([]);

  // async function fetchRandomImages() {
  //   const response = await fetch(
  //     'https://api.pexels.com/v1/search?query=nature&per_page=20',
  //     { headers: { Authorization: API_KEY } },
  //   );
  //   const data = await response.json();
  //   setPhotos(data.photos);
  // }
  async function fetchDataBaseImages() {
    const response = await fetch('http://localhost:3000/api/carrousel');
    const data = await response.json();
    setPhotos(data.photos);
    console.log(response, 'response', data);
  }

  useEffect(() => {
    fetchDataBaseImages();
  }, []);

  if (photosData.length === 0) return <p>Loading...</p>;

  return (
    <Swiper
      direction='vertical'
      loop={true}
      slidesPerView={3}
      spaceBetween={4}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      navigation={false}
      mousewheel={true}
      modules={[Mousewheel, Navigation, Autoplay]}
      style={{ height: '600px' }}
    >
      {photosData.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className='w-55 h-auto'>
            <img
              src={photo.src.large}
              alt={photo.alt}
              style={{
                width: 'auto',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carrousel;
