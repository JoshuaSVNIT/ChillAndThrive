import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesCard from './MainServicesCard'; // Import component
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';
import styles from './MainServicesPageNew.module.css'; 
import ErrorScreen from '../ErrorScreen/ErrorScreen';


const MainServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 2. Add Error State
  const [refreshKey, setRefreshKey] = useState(0); // 3. Add Refresh Key

  const location = useLocation();

  //url where services wala data stored hai
  const API_URL = 'https://chillandthrive.onrender.com/services';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data);
        console.log(data);
        setLoading(false);

        setTimeout(() => setLoading(false), 800);
      } catch (err) {
        // Fallback data for demonstration if API fails or is not set up
        console.log("couldn't load the data, error: ", err);
        setError(err.message); // Set error message
        setLoading(false);
      }
    };

    fetchServices();
  }, [refreshKey]);

  useEffect(() => {

    if (!loading && location.hash) {

      const id = location.hash.replace('#', '');


      const element = document.getElementById(id);

      if (element) {

        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [loading, location, services]);

  const handleRetry = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (error) {
    return <ErrorScreen message={error} onRetry={handleRetry} />;
  }

  
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles["services-page"]}>
      {/* for test : <LoadingScreen />  */}
      <Header />
      <div className={styles["services-container"]}>

        <header className={styles["services-header-section"]}>
          <h1 className = {styles["page-title"]}>Our Recovery Services</h1>
          <p>Explore our premium treatments designed for your wellness.</p>
        </header>

        {services.length === 0 ? (

         //agr empty array is returned (no services found)
          <div className={styles["no-services-placeholder"]}>
            <div className={styles["icon-circle"]} style={{ margin: '0 auto 20px' }}>🔍</div>
            <h3>No Services Available</h3>
            <p>We are currently updating our treatment menu. Please check back later.</p>
          </div>

        ) : (

          < div className={styles["services-container"]}>

            <div className={styles["services-list"]}>
              {services.map((eachCard) => (
                <ServicesCard
                  key={eachCard._id || eachCard.id}
                  id={eachCard._id}
                  title={eachCard.title}
                  shortDescription={eachCard.shortDescription}
                  benefits ={eachCard.benefits}
                  price={eachCard.price}
                  duration={eachCard.duration}
                  image={eachCard.imageUrl}

                  gallery = {eachCard.gallery}
                 
                />
              ))}
            </div>
            
          </div>
        )
      }
    </div>
    </div >
  );
};


export default MainServicesPage;