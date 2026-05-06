import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Mousewheel, Navigation, Autoplay } from 'swiper/modules';

function Carrousel() {
  const API_KEY = 'N9yAvb0IaZYPHdpKPk52Z1fql7hajk6AsbNdl1f1W4sLHQhPGYsAgCz6';
  const [photosData, setPhotos] = useState([]);

  async function fetchRandomImages() {
    const response = await fetch(
      'https://api.pexels.com/v1/search?query=nature&per_page=20',
      { headers: { Authorization: API_KEY } },
    );
    const data = await response.json();
    setPhotos(data.photos);
  }

  useEffect(() => {
    fetchRandomImages();
  }, []);

  // ✅ Don't render Swiper until photos are loaded
  if (photosData.length === 0) return <p>Loading...</p>;

  return (
    <Swiper
      direction='vertical'
      loop={true}
      slidesPerView={3}
      spaceBetween={4} // ✅ gap between slides in px
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
                height: '100%', // ✅ fill the slide, not overflow it
                objectFit: 'cover',
                display: 'block', // ✅ removes inline image spacing
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carrousel;
