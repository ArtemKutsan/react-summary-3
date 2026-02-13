// src/components/DogsGallery/index.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './DogsGallery.module.css';

const BASE_URL = 'https://dog.ceo/api/breeds/image';

function DogsGallery() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const urlRandomDog = `${BASE_URL}/random`;

  const fetchDog = async () => {
    const response = await axios.get(urlRandomDog);
    return response.data.message;
  };

  const fetchDogs = async (quantity) => {
    setIsLoading(true);
    try {
      let requests = [];
      for (let i = 0; i < quantity; i++) {
        requests.push(fetchDog());
      }
      const dogsImages = await Promise.all(requests);
      console.log(dogsImages);
      setDogs(dogsImages);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs(3);
  }, []);

  const addDog = async () => {
    const newDogImage = await fetchDog();
    setDogs((prev) => [...prev, newDogImage]);
  };

  return (
    <div>
      <p>Загружено собак: {dogs.length}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={addDog}>Добавить собаку</button>
        <button onClick={() => fetchDogs(dogs.length)}>Обновить всех собак</button>
      </div>
      <div className={styles.dogs}>
        {isLoading && <p>Загрузка...</p>}

        {!isLoading &&
          dogs.map((dogImageSrc) => <img key={Math.random()} src={dogImageSrc} alt="" />)}
      </div>
    </div>
  );
}

export default DogsGallery;
