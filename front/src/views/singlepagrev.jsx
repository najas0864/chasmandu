<div className="discReviews">
    <div className="flipButtons">
        <a className={`tabButton ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
        >Description</a>

        <a className={`tabButton ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
        >Reviews(0)</a>
    </div>
    {activeTab === "description" && (
        <div className="descriptions">
            <center><h2>Descriptions</h2></center>
            <p className="descBox">{singleProduct.description}</p>
        </div>
    )}
    {activeTab === "reviews" && (
        <div className="reviews">
            <center><h2>Reviews</h2></center>
            <div className="reviewbox">
                <span>user.email</span>
                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                <span>user.email</span>
                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                <span>user.email</span>
                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                <span>user.email</span>
                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
            </div>
        </div>
    )}
</div>