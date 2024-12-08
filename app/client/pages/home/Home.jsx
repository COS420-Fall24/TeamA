import React from 'react';
import Header from '../../components/Header';
import resources from './resources'
import './Home.css';  // Make sure this path is correct

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <Header isLoggedIn={true} />
                
                <div className="hero-section">
                    <h1>Welcome to EmpowerMaine!</h1>
                    <p>Let us help you find mentors and opportunities to help empower you to success</p>
                    <button className="learn-more-btn">Learn More</button>
                </div>

                <div className="resources-section">
                    <div className="section-header">
                        <h2>Helpful Resources</h2>
                        <h2>Events near you</h2>
                    </div>
                    
                    <div className="resources-grid">
                        {resources.map((resource, index) => (
                            <div key={index} className="resource-card">
                                <div className="card-content">
                                    <h3>{resource.title}</h3>
                                    <p>{resource.description}</p>
                                    <div className="image-placeholder"></div>
                                    <button className="read-more-btn">Read more</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="see-more-btn">See More</button>
                </div>
            </div>
        </div>
    );
};

export default Home;