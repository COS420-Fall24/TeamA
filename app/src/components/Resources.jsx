const Resources = () => {
  return (
    <section className="resources-section">
      <div className="section-headers">
        <h2>Helpful Resources</h2>
        <h2>Events near you</h2>
      </div>
      
      <div className="resources-grid">
        {/* Repeat this card structure 6 times */}
        <div className="resource-card">
          <h3>Interview Guide</h3>
          <p>A guide to succeeding in technical interviews with practice questions</p>
          <div className="card-image">
            <img src="/placeholder-image.svg" alt="Resource illustration" />
          </div>
          <button className="btn-secondary">Read more</button>
        </div>
      </div>
      
      <button className="btn-primary see-more">See More</button>
    </section>
  );
}; 